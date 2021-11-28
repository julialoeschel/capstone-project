import React from 'react'
import styled from 'styled-components'

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
      <span>Your locations are set to:</span>
      <br />
      <Location1>{locationName1}</Location1>
      <br />

      <Location2>{locationName2}</Location2>
    </Container>
  )
}

const Container = styled.div`
  border: solid 2px green;
  display: grid;
  width: 70%;
  justify-self: center;
  padding: 20px;
  border-radius: 0.4em;
`
const Location1 = styled.span`
  padding: 10px;
  width: 200px;
  text-align: center;
  border: solid 3px blue;
  margin: 15px 0;
  border-radius: 0.4em;
`
const Location2 = styled.span`
  padding: 10px;
  width: 200px;
  text-align: center;
  border: solid 3px red;
  margin: 15px 0;
  border-radius: 0.4em;
`
