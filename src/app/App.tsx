import React from 'react'
import LocationInput from './components/LocationInput/LocationInput'
import Map from './components/Map/Map'

//import { BrowserRouter } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <>
      <LocationInput />
      <Map />
    </>
  )
}

export default App
