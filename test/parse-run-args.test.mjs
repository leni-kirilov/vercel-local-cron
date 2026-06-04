// Dependency-free tests using Node's built-in runner (node --test).
// Tests the built output; `npm test` runs the build first via `pretest`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRunArgs } from '../dist/cli/args.js';

// argv always starts with [node, script, command]; args after `run` follow.
const argv = (...args) => ['node', '/path/to/vercel-local-cron', 'run', ...args];

test('no extra args -> empty array', () => {
  assert.deepEqual(parseRunArgs(argv()), []);
});

test('single flag is passed through', () => {
  assert.deepEqual(parseRunArgs(argv('--turbopack')), ['--turbopack']);
});

test('flag with value is passed through in order', () => {
  assert.deepEqual(parseRunArgs(argv('-p', '3001')), ['-p', '3001']);
});

test('literal -- separator is stripped (npm-script style)', () => {
  assert.deepEqual(parseRunArgs(argv('--', '--turbopack')), ['--turbopack']);
});

test('multiple args with separator keep order', () => {
  assert.deepEqual(
    parseRunArgs(argv('--', '--turbopack', '-p', '3001')),
    ['--turbopack', '-p', '3001']
  );
});

test('only the separator -> empty array', () => {
  assert.deepEqual(parseRunArgs(argv('--')), []);
});
