// @ts-expect-error no webpack dep
import wonderful  from  'wonderful'
// @ts-expect-error no relative dep
import { formatAge }   from  '../formats'
// @ts-expect-error no react dep
import * as React from    'react'

interface Props
{

  name: string
  age: number
}

const Foo:React.FC<Props> =
  ({ name, age }) => {return (
    <div><h1>My name is {wonderful(name)}.</h1>
      <h2>I am {formatAge(age)}.</h2>
          </div>
  )


}

export default Foo
