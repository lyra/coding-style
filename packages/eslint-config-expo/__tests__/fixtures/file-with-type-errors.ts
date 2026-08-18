/** @deprecated use `renamed` instead */
function legacy(): string {
  return 'legacy'
}

async function work(): Promise<void> {
  // no-op
}

export function run(): string {
  // warning expected (@typescript-eslint/no-deprecated)
  const value = legacy()

  // Intentionally unawaited: promise safety rules are explicitly disabled.
  work()

  return value
}
