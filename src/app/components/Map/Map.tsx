import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

if (typeof import.meta.env.VITE_MAPBOX_ACCESSKEY === 'string') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSKEY
} else {
  throw new Error('no KEY provided')
}

export default function MapBox(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng, setLng] = useState<number>(9.96)
  const [lat, setLat] = useState<number>(53.55)
  const [zoom, setZoom] = useState<number>(8)

  useEffect(() => {
    if (map && map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    const mapDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    })
    map.current.addControl(mapDirections, 'top-left')
  }, [])

  useEffect(() => {
    map.current?.on('move', () => {
      if (map.current) {
        setLng(map.current.getCenter().lng)
        setLat(map.current.getCenter().lat)
        setZoom(map.current.getZoom())
      }
    })
    // wait for map to initialize
  }, [])

  return (
    <div>
      <MapContainer ref={mapContainer} className="map-container" />
      <SidebarContainer className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </SidebarContainer>
    </div>
  )
}

const MapContainer = styled.div`
  height: 100vh;
  width: 90vw;
  position: relative;
  margin: auto;
`
const SidebarContainer = styled.div`
  display: inline-block;
  background-color: rgba(35, 55, 75, 0.9);
  padding: 0 5px;
  color: #fff;
  font-family: monospace;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
`
