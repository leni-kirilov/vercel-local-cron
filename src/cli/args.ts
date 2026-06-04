/**
 * Extract the arguments to pass through to `next dev` from the CLI argv.
 *
 * Everything after the `run` command (argv index 3+) is forwarded verbatim,
 * except a literal `--` separator, which is stripped so the npm-script form
 * `npm run dev -- --turbopack` behaves the same as a direct
 * `vercel-local-cron run --turbopack`.
 */
export function parseRunArgs(argv: string[]): string[] {
  return argv.slice(3).filter((arg) => arg !== '--');
}
