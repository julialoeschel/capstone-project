import React from 'react'
import NavigationButtonBackIncon from '../../Incons/NavigationButtonBackIcon'
import NavigationButtonMapIncon from '../../Incons/NavigationButtonMapIcon'
import NavigationButton from './NavigationButton'

// test if storybook works
export default {
  title: 'Component/NavigationButton',
  component: NavigationButton,
}

export const Map = (): JSX.Element => (
  <NavigationButton
    onClick={function (): void {
      throw new Error('Function not implemented.')
    }}
  >
    <NavigationButtonMapIncon />
  </NavigationButton>
)

export const Back = (): JSX.Element => (
  <NavigationButton
    onClick={function (): void {
      throw new Error('Function not implemented.')
    }}
  >
    <NavigationButtonBackIncon />
  </NavigationButton>
)
