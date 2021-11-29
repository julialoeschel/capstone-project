import React from 'react'
import NavigationButtonBackIncon from '../../Incons/NavigationButtonBackIcon'
import NavigationButtonMapIncon from '../../Incons/NavigationButtonMapIncon'
import NavigationButton from './NavigationButton'

// test if storybook works
export default {
  title: 'Component/NavigationButton',
  component: NavigationButton,
}

export const Map = (): JSX.Element => (
  <NavigationButton>
    <NavigationButtonMapIncon />
  </NavigationButton>
)

export const Back = (): JSX.Element => (
  <NavigationButton>
    <NavigationButtonBackIncon />
  </NavigationButton>
)
