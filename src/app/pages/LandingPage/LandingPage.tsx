import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import Instructions from '../../components/Instructions/Instructions'

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate()
  const [showInstruction, setShowInstruction] = useState<boolean>(false)

  function showInstructions() {
    setShowInstruction(!showInstruction)
  }

  function handleClick() {
    navigate('/MapPage')
    localStorage.clear()
  }
  return (
    <>
      <Container>
        <AppName>MidWay</AppName>
        <InstructionsButton onClick={showInstructions}>
          show instructions
        </InstructionsButton>
        <InstructionsContainer hidden={showInstruction}>
          <Instructions></Instructions>
        </InstructionsContainer>
        <Image
          onClick={() => setShowInstruction(false)}
          src="https://images.unsplash.com/photo-1532154066703-3973764c81fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        ></Image>
        <LetsGoButton onClick={() => setTimeout(handleClick, 800)}>
          lets Go!
        </LetsGoButton>
      </Container>
    </>
  )
}

const AppName = styled.h1`
  display: block;
  font-size: 4em;
  margin-top: 0;
  font-weight: lighter;
  margin-bottom: 0.2em;
  position: absolute;
  top: 0.4em;
  left: 1.5em;
`
const InstructionsButton = styled.button`
  position: absolute;
  z-index: 21;
  bottom: 12em;
  left: 10.5em;
  border: none;
  background-color: #d1d0d1;
  padding: 0.2em 0.4em;
  font-weight: lighter;
  border-radius: 0.8em;
  box-shadow: var(--box-shadow);
`

const LetsGoButton = styled.button`
  position: absolute;
  bottom: 4em;
  left: 5.6em;
  padding: 1.5em 5em;
  text-align: center;
  border: solid 3px var(--color-gold);
  background-color: var(--color-green-100);
  border-radius: 0.4em;
  box-shadow: var(--box-shadow);
  font-weight: lighter;
  font-size: 1em;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: '';
    background: var(--color-green-700);
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -83px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 3s;
  }

  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s;
  }
`
const Image = styled.img`
  opacity: 0.4;
  height: 100vh;
  width: 100%;
`
const Container = styled.div`
  height: 100vh;
  position: relative;
  z-index: 14;
`
const InstructionsContainer = styled.div`
  display: ${(props) => (props.hidden ? 'block' : 'none')};
  position: absolute;
  background-color: hotpink;
  z-index: 2;
  top: 8em;
  height: 21em;
  width: 20.5em;
  left: 2em;
  border-radius: 3em;
  border: solid 3px var(--color-gold);
  background-color: transparent;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  padding: 0 2em;
`
