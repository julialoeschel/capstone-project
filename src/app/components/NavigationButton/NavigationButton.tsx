import type { ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'

type NavigationButtonProps = {
  children: ReactNode
  onClick: () => void
}
export default function NavigationButton({
  children,
  onClick,
}: NavigationButtonProps): JSX.Element {
  return (
    <NavigationButtonContainer onClick={onClick}>
      {children}
    </NavigationButtonContainer>
  )
}
const NavigationButtonContainer = styled.div`
  height: 4.4em;
  width: 4.5em;
  background-color: var(--color-dark-green);
  border-radius: 3em;
  display: grid;
  bottom: 0.5em;
`
