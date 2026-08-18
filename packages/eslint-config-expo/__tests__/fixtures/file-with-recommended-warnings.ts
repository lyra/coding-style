// Exercises rules from the @typescript-eslint "recommended" preset (as warnings).

// warning expected (@typescript-eslint/no-explicit-any)
export function identity(value: any): unknown {
  return value
}

export function two(): number {
  // warning expected (@typescript-eslint/prefer-as-const)
  const value: 2 = 2

  return value
}
