import React, { useState } from 'react'
import styled from 'styled-components'

export default function LocationInput(): JSX.Element {
  const [location1, setLocation1] = useState('')
  const [location2, setLocation2] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!location1 || !location2) {
      console.log('Warning')
    } else {
      setLocation1('')
      setLocation2('')
      console.log(location1, location2)
    }
  }

  return (
    <Container>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Label>
          Location 1
          <Input
            type="text"
            placeholder="your first location"
            value={location1}
            onChange={(event) => setLocation1(event.target.value)}
          />
          {!location1 ? <Warning>please enter a location</Warning> : ''}
        </Label>

        <Label>
          Location 2
          <Input
            type="text"
            placeholder="your second location"
            value={location2}
            onChange={(event) => setLocation2(event.target.value)}
          />
          {!location2 ? <Warning>please enter a location</Warning> : ''}
        </Label>
        <Button type="submit">find middle</Button>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  padding: 50px 20px 20px 20px;
  gap: 20px;
`

const Form = styled.form`
  display: grid;
  gap: 20px;
`
const Label = styled.label`
  display: grid;
  gap: 5px;
`
const Input = styled.input`
  max-width: 40em;
`
const Button = styled.button`
  padding: 10px 20px;
  max-width: 170px;
  justify-self: center;
`
const Warning = styled.span`
  color: #d86d6d;
`
