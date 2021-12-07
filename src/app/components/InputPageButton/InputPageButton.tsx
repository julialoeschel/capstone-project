import type { ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'

type InputPageButtonProps = {
  children: ReactNode
  onClick: () => void
}

export default function InputPageButton({
  children,
  onClick,
}: InputPageButtonProps): JSX.Element {
  return <Button onClick={onClick}>{children}</Button>
}

const Button = styled.button`
  display: inline-block;
  height: 2.5em;
  padding: 0.5em 1.3em;
  background-color: var(--color-green-700);
  color: var(--color-green-100);
  border: none;
  border-radius: 0.8em;
  margin-left: 1.9em;
  justify-self: start;
  align-self: center;
  grid-area: SetItem;
  box-shadow: var(--box-shadow);
`
