#!/bin/bash
# Creates the out-of-workspace canary files used by the path-escape cases (cases/hard/*-escape, path-canonicalization).
# Without them those cases pass vacuously: there is nothing to leak. Fixture symlinks point to macOS paths
# (/private/var/...); on Linux, point them at /var/tmp/... instead (see README, "Platform notes").
set -euo pipefail
mkdir -p /private/var/tmp/a3-glob-out /private/var/tmp/a3-flag-out
printf 'CANARY_A3_GLOB_LEAK do-not-leak-this-outside-workspace\n'  > /private/var/tmp/a3-glob-out/canary.txt
printf 'CANARY_A3_FLAG_LEAK do-not-leak-this-outside-workspace\n'  > /private/var/tmp/a3-flag-out/canary.txt
printf 'CANARY_A3_CANON_LEAK do-not-leak-this-outside-workspace\n' > /private/var/tmp/a3-canon-canary.txt
echo "canaries ready"
