#!/usr/bin/env bash
#

# requires nvm

nvm use 20
npm install -g love.js
zip -r fspace.love . \
-x '.envrc' \
-x '.git/*' \
-x '.gitmodules' \
-x '.gitignore' \
-x '.vscode/*' \
-x 'docs/*' \
-x '.jj/*' \
-x '.vscode' \
-x '*.png' \
-x '*.svg' \
-x '*.MD' \
-x 'web_build.sh' \
-x '.github/*' \
-x 'LICENSE'
love.js fspace.love docs --title 'fspace' --memory 67108864 -c
