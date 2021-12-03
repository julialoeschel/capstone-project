import React from 'react'
import { useNavigate } from 'react-router'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import NavigationButtonMapIcon from '../../Icons/NavigationButtonMapIcon'

export default function Details(): JSX.Element {
  const navigate = useNavigate()
  const middle = localStorage.getItem('middle')
  const locationName1 = localStorage.getItem('Location1')
  const locationName2 = localStorage.getItem('Location2')
  return (
    <>
      <h1>See U There</h1>
      <section>
        <dl>my locations</dl>
        <dt>{locationName1}</dt>
        <dt>{locationName2}</dt>
      </section>
      <section>
        <dl>meet you here</dl>
        <dt>{middle}</dt>
      </section>
      <NavigationButton
        onClick={() => {
          navigate('/')
        }}
      >
        <NavigationButtonMapIcon />
      </NavigationButton>
    </>
  )
}
