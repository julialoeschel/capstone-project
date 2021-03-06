import React, { useState } from 'react'
import styled from 'styled-components'

type InRadiusProps = {
  getRadius: (radius: number) => void
}

export default function InRadius({ getRadius }: InRadiusProps): JSX.Element {
  const [radius, setRadius] = useState(
    JSON.parse(localStorage.getItem('Radius') as string)
  )

  getRadius(radius)

  if (radius != 0) {
    return (
      <>
        <RadiusText>
          Search Radius{' '}
          <RadiusInput
            type="range"
            defaultValue="localStorage.getItem('Radius')"
            min="0"
            max="50"
            onChange={(event) => setRadius(parseInt(event.target.value) * 1000)}
          />
          {radius / 1000} km
        </RadiusText>{' '}
      </>
    )
  } else {
    return (
      <>
        <RadiusText>
          Search Radius{' '}
          <RadiusInput
            type="range"
            defaultValue="localStorage.getItem('Radius')"
            min="0"
            max="50"
            onChange={(event) => setRadius(parseInt(event.target.value) * 1000)}
          />
          ..km
        </RadiusText>{' '}
      </>
    )
  }
}

const RadiusText = styled.label`
  font-weight: lighter;
  padding: 0 0.5em;
  margin-top: 0.5em;
`

const RadiusInput = styled.input`
  width: 100%;
`
