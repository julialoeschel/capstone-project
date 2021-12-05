import React from 'react'
import { useNavigate } from 'react-router'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import NavigationButtonMapIcon from '../../Icons/NavigationButtonMapIcon'

export default function Details(): JSX.Element {
  const navigate = useNavigate()
  const middleLng = JSON.parse(localStorage.getItem('middleLng') as string)
  const middleLat = JSON.parse(localStorage.getItem('middleLat') as string)
  const locationName1 = JSON.parse(localStorage.getItem('Location1') as string)
  const locationName2 = JSON.parse(localStorage.getItem('Location2') as string)

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
        <dt>
          {parseFloat(middleLng).toFixed(4)} and{' '}
          {parseFloat(middleLat).toFixed(4)}
        </dt>
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
