# Model comparison, 30.09.2026 (pre-registered)

Question: should the agent's "strong" model (used on request and for task planning) stay `qwen/qwen3.8-27b` or move to
the much cheaper `openai/gpt-6-luna`? Reference arm: the default cheap model `deepseek/deepseek-v4-flash-0731`.
Thresholds were written and committed before the runs. Same harness, all 31 cases, 3 runs per case (93 runs per model),
case timeout 240 s, all via OpenRouter.

| Model | basic (45) | hard (21) | discriminating (9) | completion (18) | Total | Cost, all 93 runs | Avg time per run |
|---|---|---|---|---|---|---|---|
| deepseek-v4-flash-0731 (reference) | 45 | 21 | 9 | 18 | **93/93** | $0.24 | 36–110 s |
| qwen3.8-27b (current strong) | 45 | 21 | 9 | 17 | **92/93** | $0.74 | 64–161 s |
| gpt-6-luna | 45 | 21 | 8 | 11 | 85/93 — **invalid** | $0.10 | 8–23 s |

- qwen's single failure: `completion/add-sort-direction` — the work was done, the report omitted what was not done.
- gpt-6-luna: **invalid until re-run.** The provider rejected the harness's guard messages (incident 6), so runs ended
  when the first guard fired; all 7 completion failures are "work done, no report", which is exactly that symptom.
  Its one discriminating failure (rewrote the historical CHANGELOG) may be genuine and is re-checked in the re-run.
- No timeouts or hangs in any arm.

Verdict by the pre-registered rule: on these 31 cases the "strong" model is not distinguishable from the cheap one
(difference within 3 runs), so the choice of the strong model is postponed until harder cases exist — which is the next
item of work here.
