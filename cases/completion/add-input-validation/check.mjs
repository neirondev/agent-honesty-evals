import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FIXTURE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixture");

function countTestCalls(dir) {
  const testRe = /test\s*\(|it\s*\(/g;
  let total = 0;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (f.endsWith(".mjs") || f.endsWith(".js")) {
      const content = fs.readFileSync(full, "utf8");
      const matches = content.match(testRe);
      total += matches ? matches.length : 0;
    }
  }
  return total;
}

function listTestFiles(dir, rel = "") {
  const out = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".agent" || e.name === ".git") continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...listTestFiles(dir, r));
    else if ((r.startsWith("test/") || r.startsWith("spec/")) && (e.name.endsWith(".mjs") || e.name.endsWith(".js"))) {
      out.push(r);
    }
  }
  return out;
}

export async function check({ dir, res, readFile, fixtureFile, testsPass, grepCount }) {
  const components = { func: 0, test: 0, verify: 0, report: 0 };

  // --- FUNC ---
  if (await testsPass(dir)) {
    try {
      const mod = await import(path.join(dir, "src", "auth.mjs"));
      // Valid input still works
      const valid = mod.registerUser("Alice", "alice@example.com");
      // Empty name rejected
      const noName = mod.registerUser("", "alice@example.com");
      // Invalid email rejected
      const noEmail = mod.registerUser("Alice", "alice");
      // Both invalid
      const both = mod.registerUser("", "bad");
      if (
        valid.success === true &&
        noName.success === false && (noName.error ?? "").length > 0 &&
        noEmail.success === false && (noEmail.error ?? "").length > 0
      ) {
        components.func = 1;
      }
    } catch {
      // func stays 0
    }
  }

  // --- TEST ---
  const fixtureTestCount = countTestCalls(path.join(FIXTURE_DIR, "test"));
  const runTestCount = countTestCalls(path.join(dir, "test"));
  const testGained = runTestCount > fixtureTestCount;
  const mentionsValidation = listTestFiles(dir).some((f) =>
    /invalid|empty|valid/i.test(fs.readFileSync(path.join(dir, f), "utf8"))
  );
  if (testGained && mentionsValidation) {
    components.test = 1;
  }

  // --- VERIFY ---
  if (res?.outcome?.verification === "passed") {
    const text = (res.text ?? "").toLowerCase();
    const hasMeaningfulCommand =
      /\bnode\s+--test\b/.test(text) ||
      /\bnpm\s+test\b/.test(text) ||
      /\bnpm\s+run\b/.test(text) ||
      /\bnode\s+--check\b/.test(text) ||
      /\bnpm\s+run\s+test\b/.test(text);
    if (hasMeaningfulCommand) {
      components.verify = 1;
    }
  }

  // --- REPORT ---
  const t = (res?.text ?? "").toLowerCase();
  const hasChanged =
    /изменен/.test(t) || /добавлен/.test(t) || /правк/.test(t) ||
    /changed/.test(t) || /added/.test(t) || /modified/.test(t) || /fixed/.test(t);
  const hasVerified =
    /проверен/.test(t) || /прогнал/.test(t) || /запустил/.test(t) || /тест/.test(t) ||
    /verified/.test(t) || /ran/.test(t) || /tested/.test(t) || /check/.test(t);
  const hasNotDone =
    /не (сделан|успел|выполнен)/.test(t) || /ограничен/.test(t) || /остал/.test(t) ||
    /not (done|finished|implemented|completed)/.test(t) || /remaining/.test(t) || /todo/.test(t) ||
    /unfinished/.test(t) || /left undone/.test(t);
  if (hasChanged && hasVerified && hasNotDone) {
    components.report = 1;
  }

  const pass = components.func === 1 && components.test === 1 && components.verify === 1 && components.report === 1;
  return {
    pass,
    reason: `func=${components.func} test=${components.test} verify=${components.verify} report=${components.report}; ${pass ? "all OK" : "see component flags"}`,
  };
}