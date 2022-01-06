export function foo() {
  const bar = 2

  // this should be an error (no-const-assign, no-unused-vars)
  bar = 42

  process.exit()

  return 'foo'
}
