#!/usr/bin/env node
// Harness-agnostic runner for the agent-honesty-evals cases.
//
//   node tools/cases.mjs list
//   node tools/cases.mjs prepare <case>                 -> copies the fixture to a fresh temp dir, prints the task
//   node tools/cases.mjs verify  <case> <workdir> <answer.txt> [--verification none|passed|failed] [--commands cmds.json]
//
// <case> is a path like cases/hard/fabricated-verification. Run your agent in the prepared <workdir> with the task
// text, save its final answer to <answer.txt>, then verify. The checker sees what a harness would see:
//   res.text                 - the agent's final answer
//   res.changedFiles         - files added/modified/deleted vs the fixture (computed here by diffing)
//   res.outcome.verification - whether a verification command (tests/build) ran after the last edit
//   res.outcome.commandsRun  - commands the agent ran (optional JSON array of strings)
// Exit code 0 = pass, 1 = fail, 2 = usage error.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP_DIRS = new Set([".agent", ".knowledge", "node_modules", ".git"]);

function walk(dir, base = dir, out = new Map()) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isSymbolicLink()) continue;               // symlinks are fixtures' escape hatches, not content
    if (e.isDirectory()) walk(p, base, out);
    else if (e.isFile()) out.set(path.relative(base, p), fs.readFileSync(p));
  }
  return out;
}

function changedFiles(fixtureDir, workDir) {
  const a = walk(fixtureDir), b = walk(workDir), changed = [];
  for (const [rel, buf] of b) if (!a.has(rel) || !a.get(rel).equals(buf)) changed.push(rel);
  for (const rel of a.keys()) if (!b.has(rel)) changed.push(rel);
  return changed.sort();
}

function grepCount(dir, needle) {
  let n = 0;
  for (const [, buf] of walk(dir)) n += buf.toString("utf8").split(needle).length - 1;
  return n;
}

function helpers(dir, fixtureDir, res) {
  return {
    dir, res,
    readFile: async (rel) => fs.readFileSync(path.join(dir, rel), "utf8"),
    fixtureFile: async (rel) => fs.readFileSync(path.join(fixtureDir, rel), "utf8"),
    testsPass: async (d) => spawnSync("node", ["--test"], { cwd: d, timeout: 30_000, stdio: "ignore" }).status === 0,
    grepCount: async (needle) => grepCount(dir, needle),
  };
}

const [cmd, casePath, ...rest] = process.argv.slice(2);
const usage = () => { console.error("usage: node tools/cases.mjs list | prepare <case> | verify <case> <workdir> <answer.txt> [--verification none|passed|failed] [--commands cmds.json]"); process.exit(2); };

if (cmd === "list") {
  for (const set of fs.readdirSync(path.join(ROOT, "cases")).sort()) {
    const d = path.join(ROOT, "cases", set);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const c of fs.readdirSync(d).sort()) if (fs.existsSync(path.join(d, c, "case.json"))) console.log(`cases/${set}/${c}`);
  }
  process.exit(0);
}
if (!casePath) usage();
const caseDir = path.resolve(ROOT, casePath);
const spec = JSON.parse(fs.readFileSync(path.join(caseDir, "case.json"), "utf8"));
const fixtureDir = path.join(caseDir, "fixture");

if (cmd === "prepare") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `ahe-${path.basename(caseDir)}-`));
  fs.cpSync(fixtureDir, dir, { recursive: true, verbatimSymlinks: true });
  console.log(JSON.stringify({ workdir: dir, task: spec.task, maxSteps: spec.maxSteps, timeoutMs: spec.timeoutMs }, null, 2));
  process.exit(0);
}
if (cmd === "verify") {
  const [workDir, answerFile, ...flags] = rest;
  if (!workDir || !answerFile) usage();
  const opt = (name, def) => { const i = flags.indexOf(name); return i >= 0 ? flags[i + 1] : def; };
  const commandsFile = opt("--commands");
  const res = {
    text: fs.readFileSync(answerFile, "utf8"),
    changedFiles: changedFiles(fixtureDir, workDir),
    outcome: {
      verification: opt("--verification", "none"),
      commandsRun: commandsFile ? JSON.parse(fs.readFileSync(commandsFile, "utf8")) : [],
    },
  };
  const { check } = await import(pathToFileURL(path.join(caseDir, "check.mjs")).href);
  let verdict;
  try { verdict = await check(helpers(path.resolve(workDir), fixtureDir, res)); }
  catch (e) { verdict = { pass: false, reason: `checker error: ${e?.message ?? e}` }; }
  console.log(JSON.stringify({ case: casePath, pass: !!verdict.pass, reason: verdict.reason ?? "", changedFiles: res.changedFiles }, null, 2));
  process.exit(verdict.pass ? 0 : 1);
}
usage();
