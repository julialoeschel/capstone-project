import React from 'react'
import InputPageButton from './InputPageButton'

// test if storybook works
export default {
  title: 'Component/InputPageButton',
  component: 'InputPageButton',
  parameters: { layout: 'fullscreen' },
}

export const setLocation = (): JSX.Element => (
  <InputPageButton
    onClick={function (): void {
      throw new Error('Function not implemented.')
    }}
  >
    set location
  </InputPageButton>
)

export const clear = (): JSX.Element => (
  <InputPageButton
    onClick={function (): void {
      throw new Error('Function not implemented.')
    }}
  >
    clear all inputs
  </InputPageButton>
)
