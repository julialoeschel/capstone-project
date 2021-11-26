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
            coordinates: location,
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
                  coordinates: location,
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
      map.current.getSource('end').setData(end)
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
                  coordinates: [8.80889, 53.07694],
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

  getRoute(location, [8.80889, 53.07694])

  return (
    <Container>
      <span>Distance: {distance} m</span>
      <span>Location: {location} </span>
      <LocationInput id="locationInput" />
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
