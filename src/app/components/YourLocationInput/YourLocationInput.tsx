import React from 'react'
import styled from 'styled-components'
import ArrowYellow from '../ArrowYellow/ArrowYellow'

type YourLocationInputProps = {
  locationName1: string
  locationName2: string
}

export default function YourLocationInput({
  locationName1,
  locationName2,
}: YourLocationInputProps): JSX.Element {
  return (
    <Container>
      <Text>Your locations are set to:</Text>
      <ArrowYellow />
      <Location1>{locationName1}</Location1>
      <ArrowYellow />
      <Location2>{locationName2}</Location2>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 4em 1fr;
  grid-template-rows: 3fr;
  background-color: var(--color-green-500);
  border: solid var(--color-gold) 3px;
  border-radius: 0.7em;
  padding: 1em 1.9em;
  overflow: hidden;
  grid-template-areas:
    'text text'
    '. location1'
    '. location2';
  @media only screen and (min-width: 640px) {
    grid-template-columns: 20% 80%;
  }
`
const Location1 = styled.span`
  padding: 10px;
  min-height: 2.9em;
  width: 13em;
  text-align: center;
  border: solid 3px var(--color-gold);
  background-color: var(--color-green-100);
  margin: 15px 0;
  border-radius: 0.4em;
  grid-area: location1;
  box-shadow: var(--box-shadow);
  @media only screen and (min-width: 640px) {
    justify-self: center;
  }
`
const Location2 = styled.span`
  padding: 10px;
  width: 13em;
  min-height: 2.9em;
  text-align: center;
  border: solid 3px var(--color-gold);
  background-color: var(--color-green-100);
  margin: 15px 0;
  border-radius: 0.4em;
  grid-area: location2;
  box-shadow: var(--box-shadow);
  @media only screen and (min-width: 640px) {
    justify-self: center;
  }
`
const Text = styled.span`
  grid-area: text;
  font-weight: lighter;
  @media only screen and (min-width: 640px) {
    text-align: center;
  }
`
