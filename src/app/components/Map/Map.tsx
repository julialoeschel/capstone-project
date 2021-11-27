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
  const [location, setLocation] = useState<number[]>([])
  const [locationName, setLocationName] = useState<string>('')
  const [location1, setLocation1] = useState<number[]>([])
  const [location2, setLocation2] = useState<number[]>([])

  // initialize map only once
  useEffect(() => {
    if (map && map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [10, 53.55],
      zoom: 7,
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
      const location = results.result.center
      setLocation(location)
      setLocationName(results.result.text)
    })
  }, [])

  // get Distance from API to [7.43861, 46.95083] (its Bremen) and draw route
  async function getRoute(start: number[], end: number[]) {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    )
    const json = await query.json()
    const data = json.routes[0]
    setDistance(data.distance)
    const route = data.geometry.coordinates

    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    }

    const pointData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: location1,
          },
        },
      ],
    }
    map.current
      ? map.current.fitBounds(
          [
            location1, // southwestern corner of the bounds
            location2, // northeastern corner of the bounds
          ],
          { padding: { top: 100, bottom: 100, left: 100, right: 100 } }
        )
      : null

    const endData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: location2,
          },
        },
      ],
    }

    if (map.current?.getSource('route')) {
      map.current.getSource('route').setData(geojson)
    } else {
      map.current?.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson,
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#2d8f43',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      })
    }
    if (map.current?.getSource('point')) {
      map.current.getSource('point').setData(pointData)
    } else {
      map.current?.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: location1,
                },
              },
            ],
          },
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be',
        },
      })
    }

    if (map.current?.getLayer('end')) {
      map.current.getSource('end').setData(endData)
    } else {
      map.current?.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: location2,
                },
              },
            ],
          },
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#f30',
        },
      })
    }
  }

  getRoute(location1, location2)

  return (
    <Container>
      <span>Distance: {distance} m</span>
      <p>
        HowTo: set a location by clicking the button once you searched a
        location in the input field
      </p>

      <LocationInput id="locationInput">
        <ButtonContainer>
          <button
            onClick={() => {
              setLocation1(location)
            }}
          >
            Location 1: {location1}
          </button>
          <button
            onClick={() => {
              setLocation2(location)
            }}
          >
            Location 2: {location2}
          </button>
          <span>location set to: {locationName}</span>
        </ButtonContainer>
      </LocationInput>

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
  padding: 10px;
  height: 100px;
  display: grid;
  gap: 5px;
  grid-template-columns: 200px 1fr;
`
const ButtonContainer = styled.div`
  display: grid;
  gap: 5px;
`
