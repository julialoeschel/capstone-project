import type { ReactNode } from 'react'
import React from 'react'

type InputPageButtonProps = {
  children: ReactNode
  onClick: () => void
}

export default function InputPageButton({
  children,
  onClick,
}: InputPageButtonProps): JSX.Element {
  return <button onClick={onClick}>{children}</button>
}
