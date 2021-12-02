import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Details from './pages/Details'
import MapBox from './pages/Map'

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MapBox />} />
      <Route path="/details" element={<Details />}></Route>
    </Routes>
  )
}
