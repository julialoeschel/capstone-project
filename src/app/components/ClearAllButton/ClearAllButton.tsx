import type { ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'

type ClearAllButtonProps = {
  children: ReactNode
  onClick: () => void
}

export default function ClearAllButton({
  children,
  onClick,
}: ClearAllButtonProps): JSX.Element {
  return <Button onClick={onClick}>{children}</Button>
}

const Button = styled.button`
  padding: 0.8em;
  justify-self: center;
  background-color: var(--color-choral);
  border: none;
  border-radius: 3em;
  color: var(--color-background-light);
  grid-area: clear;
`
