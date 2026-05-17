#!/bin/sh
set -e

START_DIR=$(pwd)
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(dirname "$SCRIPT_DIR")

cd "$SCRIPT_DIR"
npm run build

if [ "$START_DIR" != "$SCRIPT_DIR" ]; then
  mkdir -p "$START_DIR/dist"
  cp -R dist/. "$START_DIR/dist/"
fi

mkdir -p "$ROOT_DIR/dist"
cp -R dist/. "$ROOT_DIR/dist/"
