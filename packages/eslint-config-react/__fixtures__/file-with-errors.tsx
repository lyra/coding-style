// @ts-expect-error no react dep
import * as React from 'react'

interface Props {
  name: string
  age: number
}

const Foo: React.FC<Props> = ({ name, age }) => {
  // this should be a warning (@typescript-eslint/no-unused-vars)
  const foo = `Hello ${name}`

  // this should be an error (@typescript-eslint/prefer-as-const)
  const bar: 2 = 2;

  return (
    <div>
      <h1>My name is {name}.</h1>
      <h2>I am {age}.</h2>
    </div>
  )
}

export default Foo
