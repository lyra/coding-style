import { foo } from './file-without-error'

export function bar() {
  return foo()
}
