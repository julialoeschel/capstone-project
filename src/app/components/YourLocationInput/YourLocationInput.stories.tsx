import React from 'react'
import YourLocationInput from './YourLocationInput'

export default {
  title: 'Component/YourLocationInput',
  component: YourLocationInput,
  parameters: { layout: 'fullscreen' },
}

export const FullInputs = (): JSX.Element => (
  <YourLocationInput locationName1={'Berlin'} locationName2={'Hannover'} />
)

export const EmptyInputs = (): JSX.Element => (
  <YourLocationInput locationName1={''} locationName2={''} />
)
