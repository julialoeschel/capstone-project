import React, { useState } from 'react'
import styled from 'styled-components'

type InRadiusProps = {
  getRadius: (radius: number) => void
}

export default function InRadius({ getRadius }: InRadiusProps): JSX.Element {
  const [radius, setRadius] = useState(0)

  getRadius(radius)

  return (
    <>
      <RadiusText>
        Search Radius{' '}
        <RadiusInput
          type="range"
          min="0"
          max="50"
          onChange={(event) => setRadius(parseInt(event.target.value) * 1000)}
        />{' '}
        {radius / 1000} km
      </RadiusText>
    </>
  )
}

const RadiusText = styled.label`
  font-weight: lighter;
  padding: 0 0.5em;
  margin-top: 0.5em;
`

const RadiusInput = styled.input`
  width: 100%;
`
