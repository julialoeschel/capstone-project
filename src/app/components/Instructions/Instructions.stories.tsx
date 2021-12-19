import React from 'react'
import Instructions from './Instructions'

// test if storybook works
export default {
  title: 'Component/Instructions',
  component: 'Instructions',
  parameters: { layout: 'fullscreen' },
}

export const setLocation = (): JSX.Element => <Instructions></Instructions>
