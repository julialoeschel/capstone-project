import React from 'react'
import Map from './Map'

// test if storybook works
export default {
  title: 'Component/Map',
  component: 'Map',
  parameters: { layout: 'fullscreen' },
}

export const Regular = (): JSX.Element => <Map />
