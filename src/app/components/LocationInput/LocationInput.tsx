import React from 'react'
import styled from 'styled-components'

export default function LocationInput(): JSX.Element {
  return (
    <>
      <Container>
        <Form>
          <Label>
            Location 1
            <input type="text" />
          </Label>

          <Label>
            Location 2
            <input type="text" />
          </Label>
        </Form>
        <Button>find middle</Button>
      </Container>
    </>
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
const Button = styled.button`
  padding: 10px 20px;
  max-width: 170px;
  justify-self: center;
`
