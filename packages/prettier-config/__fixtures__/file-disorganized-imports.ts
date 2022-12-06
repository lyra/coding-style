import b     from './b'
import {foo, bar} from './a'
import c from './c'
import * as SortImports from '@trivago/prettier-plugin-sort-imports'

console.log(foo, b, c, Object.keys(SortImports))
