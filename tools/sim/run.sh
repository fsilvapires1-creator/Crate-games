#!/usr/bin/env bash
# Runs the simulator against the rules engine of another branch or commit.
# Usage: tools/sim/run.sh [engine-ref] [extra args for main.ts]
# The engine is checked out read-only into tools/sim/.engine (git worktree).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
ref="${1:-e56251f}"
shift || true
if [ ! -d "$here/.engine/src/engine" ]; then
  git -C "$here" worktree add --detach "$here/.engine" "$ref"
else
  git -C "$here/.engine" checkout --detach "$ref"
fi
cd "$here"
[ -d node_modules ] || npm install --no-audit --no-fund
ENGINE_DIR="$here/.engine" npx tsx src/main.ts "$@"
