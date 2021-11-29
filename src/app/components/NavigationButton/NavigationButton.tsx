import type { ReactNode } from 'react'
import React from 'react'
import styled from 'styled-components'

type NavigationButtonProps = {
  children: ReactNode
}
export default function NavigationButton({
  children,
}: NavigationButtonProps): JSX.Element {
  return <NavigationButtonContainer>{children}</NavigationButtonContainer>
}
const NavigationButtonContainer = styled.div`
  height: 70px;
  width: 70px;
  background-color: #d9d9f3;
  border-radius: 3em;
  justify-self: center;
  display: grid;
`
