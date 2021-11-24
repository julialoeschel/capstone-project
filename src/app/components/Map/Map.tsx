import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import styled from 'styled-components'

mapboxgl.accessToken =
  'pk.eyJ1IjoianVsb2UiLCJhIjoiY2t3YzZrZHVmMGhvajJ2bjJjZWIwZGc4MCJ9.7wNghP5-UkXaVC8CuaxH6A'

export default function Map(): JSX.Element {
  const mapContainer = useRef(null)
  const map = useRef<HTMLInputElement | null>(null)
  const [lng, setLng] = useState(9.96)
  const [lat, setLat] = useState(53.55)
  const [zoom, setZoom] = useState(8)

  useEffect(() => {
    if (map && map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })
  })
  useEffect(() => {
    if (!map.current) return // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current?.getCenter().lng.toFixed(4))
      setLat(map.current?.getCenter().lat.toFixed(4))
      setZoom(map.current?.getZoom().toFixed(2))
    })
  })

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
  width: 200px;
  margin-left: 20px;
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
