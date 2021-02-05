export function foo() {
  // this should be a warning (@typescript-eslint/no-unused-vars)
  const foo = `Hello ${name}`

  // this should be an error (@typescript-eslint/prefer-as-const)
  const bar: 2 = 2
  
  return 'foo'
}
