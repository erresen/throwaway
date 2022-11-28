#!/usr/bin/env sh

# abort on errors
set -e

NODE_OPTIONS=--openssl-legacy-provider npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:erresen/throwaway.git master:gh-pages

cd -