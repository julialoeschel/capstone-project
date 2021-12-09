import React from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

type TagProps = {
  children: ReactNode
}
export default function Tag({ children }: TagProps): JSX.Element {
  return (
    <>
      <Tags onClick={() => console.log({ children })}>{children}</Tags>
    </>
  )
}

const Tags = styled.span`
  background-color: var(--color-green-100);
  padding: 0.3em 1em;
  border: solid 3px var(--color-green-700);
  border-radius: 1.2em;
  margin: 0.1em;
  font-size: 0.9em;
`
