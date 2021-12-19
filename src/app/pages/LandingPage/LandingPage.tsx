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
