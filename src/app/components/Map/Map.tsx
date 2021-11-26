import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

if (typeof import.meta.env.VITE_MAPBOX_ACCESSKEY === 'string') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSKEY
} else {
  throw new Error('no KEY provided')
}

export default function MapBox(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [distance, setDistance] = useState<number>(0)
  const [location, setLocation] = useState([])
  //const [geocoder, setGeocoder] = useState<MapboxGeocoder>()

  // initialize map only once
  useEffect(() => {
    if (map && map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [10, 53.55],
      zoom: 8,
    })
    //add MapControl
    const mapControl = new mapboxgl.NavigationControl()
    map.current.addControl(mapControl)

    //initiallize Geocoder and set to Div
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
    })
    geocoder.addTo('#locationInput')
    geocoder.on('result', function (results) {
      setLocation(results.result.center)
      console.log('newest location = ', results.result.center)
    })
  }, [])

  // get Distance from API to [7.43861, 46.95083] (its Bremen)
  async function getRoute(start: number[], end: number[]) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    )
    const json = await query.json()
    const data = json.routes[0]
    console.log(data.distance)
    setDistance(data.distance)
  }

  function handleclick() {
    getRoute(location, [7.43861, 46.95083])
  }

  return (
    <Container>
      <span>Distance: {distance} m </span>
      <LocationInput id="locationInput" />
      <Button
        onClick={() => {
          handleclick()
        }}
      >
        Get Distance to Bremen
      </Button>
      <MapContainer ref={mapContainer} className="map-container" />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  gap: 5px;
`

const MapContainer = styled.div`
  height: 100vh;
  width: 90vw;
  position: relative;
  margin: auto;
  margin-top: 30px;
`

const LocationInput = styled.div`
  background-color: #e6e4e4;
  padding: 20px;
  height: 80px;
`
const Button = styled.button`
  padding: 10px;
`
