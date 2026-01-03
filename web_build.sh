#!/usr/bin/env bash
#

# requires nvm

nvm use 20
npm install -g love.js
love.js . docs -c --title 'fspace'
