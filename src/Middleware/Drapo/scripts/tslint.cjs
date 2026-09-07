// TSLint entry point for TypeScript 7.
//
// TypeScript 7 (the native compiler) no longer ships the JavaScript compiler API that
// TSLint depends on, so `require('typescript')` from inside TSLint (and its `tsutils`
// dependency) would resolve to an API-less package and crash. Microsoft publishes the
// last JavaScript-based compiler as `@typescript/typescript6` exactly for tools in this
// situation. This script redirects every `require('typescript')` made by TSLint to that
// package and then runs the regular TSLint CLI with the original arguments.
//
// Usage (from src/Middleware/Drapo): node scripts/tslint.cjs --project tsconfig/production/
'use strict';

const Module = require('node:module');

const typescript6 = require.resolve('@typescript/typescript6');
const resolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request === 'typescript')
    return typescript6;
  return resolveFilename.call(this, request, ...rest);
};

require('tslint/lib/tslintCli');
