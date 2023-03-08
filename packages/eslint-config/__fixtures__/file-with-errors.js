// error expected (import/no-unresolved)
import notFound from './nope'

export function foo() {
  const bar = 2

  // error expected (no-const-assign, no-unused-vars)
  bar = 42

  return 'foo'
}
