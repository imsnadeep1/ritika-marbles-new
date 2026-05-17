#!/bin/sh
set -e

START_DIR=$(pwd)
SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(dirname "$SCRIPT_DIR")

cd "$SCRIPT_DIR"
npm run build

for route in \
  admin \
  admin/login \
  admin/dashboard \
  admin/bestseller \
  admin/collections \
  admin/god-statues \
  admin/client-diary \
  admin/blog \
  admin/categories \
  admin/products \
  admin/feedback \
  admin/reviews \
  admin/clients \
  blog \
  blog/choosing-marble-idol
do
  mkdir -p "dist/$route"
  cp dist/index.html "dist/$route/index.html"
done

if [ "$START_DIR" != "$SCRIPT_DIR" ]; then
  mkdir -p "$START_DIR/dist"
  cp -R dist/. "$START_DIR/dist/"
fi

mkdir -p "$ROOT_DIR/dist"
cp -R dist/. "$ROOT_DIR/dist/"
