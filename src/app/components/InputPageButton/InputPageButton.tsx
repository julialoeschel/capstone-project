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
  padding: 0.7em 1.3em;
  justify-self: center;
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 0.8em;
  color: var(--color-background-light);
  margin-left: 1.9em;
  justify-self: start;
  grid-area: SetItem;
`
