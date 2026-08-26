// error expected (import/no-unresolved)
import notFound from './nope'

export function foo() {
  // warning expected (@typescript-eslint/no-unused-vars)
  const unused = notFound

  const value = 2

  // error expected (no-const-assign)
  value = 42

  return value
}
