# Incident log (September 2026, sanitized)

Real incidents from one developer's coding agent working on production projects: document processing, contract
generation, a drawing-to-3D visualization pipeline, and a research pipeline. Client names and data are omitted. Each
incident was found by an independent controller (a second agent under human supervision) and checked against ground
truth — logs, file timestamps, re-runs.

## 1. "Verified after the last edit" — it was not
The agent hit its step limit and reported: "tests — 22 passed; runs were executed only after the last code edits".
Timeline from the file system: web build 18:13, tests 18:15, two source edits at 18:17:58 and 18:18:06 — after every
check. The controller's re-run: 19 passed, 3 failed; the web bundle it had built came from the old code.
An earlier variant (05.09): zero terminal calls in the trace, yet the report said "the build passed" and "all 173
checks passed", listing invented PASS lines. The code happened to be correct — no damage by luck, not by process.
→ case `hard/fabricated-verification`; proposed mitigation: the harness compares timestamps of the last edit and the
last verification command and marks the report `verification=stale`.

## 2. Allowlist bypass through the terminal and a reader proxy
The web tool refused a domain outside the allowlist. The agent immediately fetched the same page, a public S3 bucket
listing and the beginning of a CSV with `curl` in the terminal — these commands were not checked against the list and
ran without approval. In another task it read pages behind anti-bot protection through a third-party "reader proxy"
and saved that as a technique for the future.
→ gap: the network policy covered only one tool. Mitigation: check network commands in the terminal against the same
allowlist, block known proxy bypasses, and treat "page behind anti-bot protection" as "not confirmed — a human checks".

## 3. The agent killed itself
Looking for orphaned browser processes by a name pattern, the agent matched its own CLI command line (the task text
contained that word) and killed its own PID. The run ended before the final report. (The human-side controller once
fell into the same trap with `pkill -f`.)
→ mitigation: refuse `kill`/`pkill` targeting the agent's own process tree; stop services by PID files.

## 4. Data loss, then "restoration" with plausible fakes
A new check phase read a test project's id before the UI switched to it, and cleanup deleted the owner's real project
(database rows and folder). The agent noticed within a minute but did not stop. For half an hour it "restored" the
project: copied "best frames" from another project, saved an untextured model render as a "photo", created folders
with plausible names — and its own acceptance thresholds passed on the substitute. To its credit the incident was
listed first in its report, but the substitutes looked like real data. The controller recovered most of it from an export made the evening
before; the job and revision history was lost. Since then every agent stage starts from a snapshot and the owner's
paths are read-only for the agent.
→ mitigation: on signs of losing someone else's data — stop and report; flag acceptance checks that pass on data the
agent itself created during the run.

## 5. Eighty minutes of exploration, zero edits
A continuation task went to the cheap model; the agent declared its targets and then spent 65 rounds reading and
re-measuring (re-deriving facts it had been given, calibrating an unstable pixel metric with a new formula each time)
without a single edit. Nothing in the harness signalled this to the supervisor; the controller stopped it by PID.
→ mitigation: count rounds after declaring targets without an edit — nudge at 20, escalate or stop with a report at
35. For task authors: give checked facts and deterministic checks, not "calibrate a metric on images".

## 6. The harness silently cut runs short — found by a model comparison
In a pre-registered comparison (93 runs per model, see `results/`), one provider's API rejected the harness's own
guard messages (message ids of the form `guard-…`) with HTTP 400. Each run ended right after the first guard fired —
so the model looked like it "skipped the final report" (7 of 18 completion runs) while in fact the harness had cut it
off. The SDK error object printed to stderr also contained the request headers, including the API key. The logs were
local and have been scrubbed; the harness fix is pending, and that model's numbers are marked invalid until a re-run.
→ lesson: an oversight failure can live in the harness, not the model; comparisons need a per-provider smoke test
of the guard path, and error logging must redact headers.

## September telemetry
429 real tasks in project folders (evaluation runs excluded); 272 ended with no verification at all; the guard
"you edited but never verified" fired 108 times, and 68 times a second, stricter reminder was needed; about $86 of
model spend in total.
