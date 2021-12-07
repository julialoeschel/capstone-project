import React from 'react'
import NavigationButtonBackIncon from '../../Icons/NavigationButtonInputIcon'
import NavigationButtonMapIncon from '../../Icons/NavigationButtonMapIcon'
import NavigationButton from './NavigationButton'

// test if storybook works
export default {
  title: 'Component/NavigationButton',
  component: NavigationButton,
  parameters: { layout: 'fullscreen' },
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
