import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef, useState } from 'react'
import type { Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import styled from 'styled-components'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

if (process.env.MAPBOX_ACCESKEY) {
  mapboxgl.accessToken = process.env.MAPBOX_ACCESKEY
}

export default function MapBox(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [lng, setLng] = useState<number>(9.96)
  const [lat, setLat] = useState<number>(53.55)
  const [zoom, setZoom] = useState<number>(8)

  const testMarker = new mapboxgl.Marker({ color: 'hotpink' })

  useEffect(() => {
    if (map && map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: testMarker,
      mapboxgl: map.current,
    })

    map.current.addControl(geocoder)
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
      <SidebarContainer className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </SidebarContainer>
      <MapContainer ref={mapContainer} className="map-container" />
    </div>
  )
}

const MapContainer = styled.div`
  height: 200px;
  width: 100%;
  position: relative;
`
const SidebarContainer = styled.div`
  background-color: rgba(35, 55, 75, 0.9);
  color: #fff;
  padding: 6px 12px;
  font-family: monospace;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 12px;
  border-radius: 4px;
`
