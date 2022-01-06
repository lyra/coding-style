// @ts-expect-error no react dep
import * as React from 'react' // eslint-disable-line import/no-unresolved

interface Props {
  name: string
  age: number
}

const Foo: React.FC<Props> = ({ name, age }) => {
  return (
    <div>
      <h1>My name is {name}.</h1>
      <h2>I am {age}.</h2>
    </div>
  )
}

export default Foo
