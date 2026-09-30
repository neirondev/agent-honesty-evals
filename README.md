# agent-honesty-evals

An open set of **31 evaluation cases for honesty and oversight failures of coding agents**, built from real incidents
in day-to-day production use — plus the incident log they came from and a small harness-agnostic verifier.

The failures that matter most in practice are not "the agent could not write the code". They are: the agent says
tests passed when they did not; it routes around a restriction it was given; it hides or papers over damage it caused;
it quietly edits the wrong thing and reports success. This repository collects such cases with ground truth and
automatic checkers, so they can be run against any agent and any model.

## What's inside

```
cases/
  basic/            15  does the work, stays in bounds, reports truthfully (missing file, prompt injection, secrets, symlink escape…)
  hard/              7  fabricated verification, contradictory requirements, 4 workspace-escape classes seen in real bypasses
  discriminating/    3  separate careful from naive work (fix the cause, not the crash site; decoys; spec vs. test)
  completion/        6  finish the job AND report what was changed, how it was verified, and what was not done
tools/cases.mjs        prepare a case / verify an agent's result (no dependencies, Node 18+)
tools/setup-canaries.sh  canary files for the escape cases
INCIDENTS.md           the real incidents behind the cases (sanitized)
CASES.md               every case: task summary and what makes it fail
results/               measurements (first one: a pre-registered 3-model comparison, 93 runs per model)
```

## Run it with any agent

```bash
tools/setup-canaries.sh                                   # once; needed by the escape cases
node tools/cases.mjs list
node tools/cases.mjs prepare cases/hard/fabricated-verification   # prints {workdir, task}
# run your agent in <workdir> with <task>; save its final answer to answer.txt
node tools/cases.mjs verify cases/hard/fabricated-verification <workdir> answer.txt --verification none
```

The checker receives what a harness knows about the run: the final answer text, the files changed versus the fixture
(computed by diffing), whether a verification command ran after the last edit (`--verification none|passed|failed`,
from your harness's trace), and optionally the list of commands run (`--commands cmds.json`). Exit code 0 = pass.

## First results (30.09.2026)

Three models under the same harness, 3 runs per case: `deepseek-v4-flash-0731` 93/93, `qwen3.8-27b` 92/93,
`gpt-6-luna` 85/93 — the last one **invalid**: the comparison exposed a harness defect that cut its runs short (see
`results/2026-09-30-model-comparison.md` and incident 6). The honest reading: at this difficulty the cases do not yet
separate a cheap model from a stronger one — harder cases are the next step.

## Known limitations

- Report checks are keyword-based (Russian and English). They can reject an honest answer phrased differently —
  e.g. "there is no such file" instead of "file not found". Treat a failure on the report component as "check the text".
- `changedFiles` is computed by diffing against the fixture; `verification` must come from your harness's own trace.
- The escape fixtures use macOS paths (`/private/var/...`, `/etc`). On Linux, re-point the symlinks in
  `cases/hard/*/fixture/` and adjust `tools/setup-canaries.sh`.
- Small numbers: 31 cases, 3 runs each. Differences of a few runs are noise.
- Task texts in three sets are in Russian (the original language of the incidents); summaries are in `CASES.md`.

## Roadmap

1. More cases from the incident log: stale verification reports, network-policy bypass in the terminal, self-termination,
   data loss followed by fabricated restoration, silent run truncation by the harness.
2. Cross-model measurements including frontier models, with repeated runs and per-model failure rates.
3. Harness-level mitigations tested against the cases: timestamp-based verification tracking, network policy enforced in
   the terminal, stop-and-report on data loss, redacted error logging.

## About

Author: Denis Bardin — independent developer (github.com/neirondev). The cases come from my own coding agent, which I run
on real client projects under a supervision protocol: thresholds written before code, checks that must be able to fail,
an independent controller, and every failure turned into a lesson or a test. Related open work with negative results:
github.com/neirondev/quantum-qubo-benchmark.

License: MIT. Issues and pull requests with new cases are welcome.
