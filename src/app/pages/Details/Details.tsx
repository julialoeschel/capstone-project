import React from 'react'
import { useNavigate } from 'react-router'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import NavigationButtonMapIcon from '../../Icons/NavigationButtonMapIcon'

export default function Details(): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <h1>See U There</h1>
      <section>
        <dl>my locations</dl>
        <dt>locationName1</dt>
        <dt>locationName2</dt>
      </section>
      <section>
        <dl>meet you here</dl>
        <dt>midpoint</dt>
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
