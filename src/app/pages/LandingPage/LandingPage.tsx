import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

export default function LandingPage(): JSX.Element {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/MapPage')
    localStorage.clear()
  }
  return (
    <>
      <Container>
        <AppName>MidWay</AppName>
        <Image src="https://images.unsplash.com/photo-1532154066703-3973764c81fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"></Image>
        <LetsGoButton onClick={() => handleClick()}>lets Go!</LetsGoButton>
      </Container>
    </>
  )
}

const AppName = styled.h1`
  font-size: 4em;
  margin-top: 0;
  font-weight: lighter;
  text-align: center;
  margin-bottom: 0.2em;
  position: absolute;
`
const LetsGoButton = styled.button`
  padding: 2em 4em;
  position: absolute;
  bottom: 2em;
  left: 4em;
`
const Image = styled.img`
  opacity: 0.5;
  height: 100vh;
`
const Container = styled.div`
  height: 100vh;
  position: relative;
`
