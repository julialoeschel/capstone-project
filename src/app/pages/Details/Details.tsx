import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import InRadius from '../../components/InRadius/InRadius'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import SearchTags from '../../components/SearchTags/SearchTags'
import NavigationButtonMapIcon from '../../Icons/NavigationButtonMapIcon'

export default function Details(): JSX.Element {
  const navigate = useNavigate()
  const middleLng = JSON.parse(localStorage.getItem('middleLng') as string)
  const middleLat = JSON.parse(localStorage.getItem('middleLat') as string)
  const locationName1 = JSON.parse(localStorage.getItem('Location1') as string)
  const locationName2 = JSON.parse(localStorage.getItem('Location2') as string)

  localStorage.setItem('CominFromDetailsPage', 'true')

  function getRadius(radius: number) {
    localStorage.setItem('Radius', radius.toString())
  }

  function getTag(search: string) {
    localStorage.setItem('ActiveSearchTag', search)
  }

  return (
    <Page>
      <AppName>MidWay</AppName>
      <MyLocationsContainer>
        <BoxHeading>My locations</BoxHeading>
        <Location>{locationName1}</Location>
        <Location>{locationName2}</Location>
      </MyLocationsContainer>
      <PlaceContainer>
        <BoxHeading>meet you here</BoxHeading>
        <Location>
          {' '}
          Lat: {parseFloat(middleLat).toFixed(4)} / Lng:{' '}
          {parseFloat(middleLng).toFixed(4)}
        </Location>
        <SearchTags getTag={getTag} />
        <InRadius getRadius={getRadius} />
      </PlaceContainer>
      <NavigationContainerMap>
        <NavigationButton
          onClick={() => {
            navigate('/')
          }}
        >
          <NavigationButtonMapIcon />
        </NavigationButton>
      </NavigationContainerMap>
    </Page>
  )
}

const Page = styled.article`
  display: grid;
`
const AppName = styled.h1`
  font-size: 4em;
  margin-top: 0;
  font-weight: lighter;
  text-align: center;
  margin-bottom: 0.2em;
`
const MyLocationsContainer = styled.section`
  display: grid;
  background-color: var(--color-green-500);
  border: solid var(--color-gold) 3px;
  border-radius: 0.7em;
  margin: 0 1.7em;
  padding: 0 1em 1em 1em;
  box-shadow: var(--box-shadow);
`
const BoxHeading = styled.h2`
  font-weight: lighter;
  margin: 0.2em 0 0.2em 0.3em;
`

const Location = styled.dl`
  padding: 10px;
  min-height: 2.9em;
  text-align: center;
  border: solid 3px var(--color-gold);
  background-color: var(--color-green-100);
  border-radius: 0.4em;
  margin: 0.3em;
  box-shadow: var(--box-shadow);
`
//Middle Place
const PlaceContainer = styled.section`
  display: grid;
  background-color: var(--color-green-500);
  border: solid var(--color-gold) 3px;
  border-radius: 0.7em;
  margin: 2em 1.7em 0 1.7em;
  padding: 0 1em 1em 1em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`
const NavigationContainerMap = styled.div`
  position: absolute;
  display: block;
  bottom: 0.5em;
  justify-self: center;
`
