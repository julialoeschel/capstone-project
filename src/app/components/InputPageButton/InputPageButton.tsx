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
  padding: 0.4em 1em;
  justify-self: center;
`
