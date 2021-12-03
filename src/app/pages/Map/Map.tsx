import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef, useState } from 'react'
import type { LngLatLike, Map } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import styled from 'styled-components'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import YourLocationInput from '../../components/YourLocationInput/YourLocationInput'
import InputPageButton from '../../components/InputPageButton/InputPageButton'
import NavigationButton from '../../components/NavigationButton/NavigationButton'
import NavigationButtonMapIcon from '../../Icons/NavigationButtonMapIcon'
import NavigationButtonBackIcon from '../../Icons/NavigationButtonBackIcon'
import * as turf from '@turf/turf'
import NavigationButtonMoreIcon from '../../Icons/NavigationButtonMoreIcon'
import { useNavigate } from 'react-router'

if (typeof import.meta.env.VITE_MAPBOX_ACCESSKEY === 'string') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSKEY
} else {
  throw new Error('no KEY provided')
}

export default function MapBox(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  const [distance, setDistance] = useState<number>(0)
  const [location, setLocation] = useState<GeoJSON.Position | null>(null)
  const [locationName, setLocationName] = useState<string>('')
  const [locationName1, setLocationName1] = useState<string>('')
  const [locationName2, setLocationName2] = useState<string>('')
  const [location1, setLocation1] = useState<GeoJSON.Position | null>(null)
  const [location2, setLocation2] = useState<GeoJSON.Position | null>(null)
  const [showMapPage, setShowMapPage] = useState<boolean>(false)

  // initialize map only once
  useEffect(() => {
    if (map && map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [10, 53.55],
      zoom: 7,
    })

    if (map.current) {
      map.current.on('load', function () {
        map.current?.resize()
      })
    }

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
      const locationName = results.result.text
      setLocation(location)
      setLocationName(locationName)
    })
  }, [])

  // get Distance from API
  async function getRoute(start: GeoJSON.Position, end: GeoJSON.Position) {
    const startPointLng = start[0]
    const startPointLat = start[1]
    const endPointLng = end[0]
    const endPointLat = end[1]

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startPointLng},${startPointLat};${endPointLng},${endPointLat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    )
    const json = await query.json()
    const data = json.routes[0]

    setDistance(data.distance)
    const route = data.geometry.coordinates

    const geojson: GeoJSON.Feature<GeoJSON.Geometry> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    }

    const pointData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: location1 as GeoJSON.Position,
          },
        },
      ],
    }

    const endData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: location2 as GeoJSON.Position,
          },
        },
      ],
    }
    //center map over route
    if (map.current && location1 && location2) {
      map.current.fitBounds(
        new mapboxgl.LngLatBounds(
          location1 as LngLatLike,
          location2 as LngLatLike
        ),
        {
          padding: { top: 100, bottom: 100, left: 100, right: 100 },
        }
      )
    }
    //make route
    const mapRouteSource = map.current?.getSource('route')

    if (mapRouteSource?.type === 'geojson') {
      mapRouteSource.setData(geojson)
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
    //draw point on location 1
    const mapPointSource = map.current?.getSource('point')
    if (mapPointSource?.type === 'geojson') {
      mapPointSource.setData(pointData)
    } else if (location1) {
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
    //draw point on location 2 (endpoint)
    const mapEndSource = map.current?.getSource('end')
    if (mapEndSource?.type === 'geojson') {
      mapEndSource.setData(endData)
    } else if (location2) {
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

  // get middle point between location1 and location2 (strait line)
  let midpoint: LngLatLike | undefined = undefined
  if (location1 && location2) {
    const point1 = turf.point(location1)
    const point2 = turf.point(location2)
    const point1Coords: turf.Coord = point1.geometry.coordinates
    const point2Coords: turf.Coord = point2?.geometry.coordinates

    midpoint = turf.midpoint(point1Coords, point2Coords).geometry
      .coordinates as LngLatLike
  }
  const marker =
    map.current && midpoint
      ? new mapboxgl.Marker().setLngLat(midpoint).addTo(map.current)
      : null

  // if locations are set
  function onSet() {
    if (!location1) {
      setLocation1(location)
      setLocationName1(locationName)
      localStorage.setItem('Location1', JSON.stringify(locationName))
    } else if (!location2) {
      setLocation2(location)
      setLocationName2(locationName)
      localStorage.setItem('Location2', JSON.stringify(locationName))
    } else {
      alert('both locations are set')
    }
  }
  // if click on clear
  function onClear() {
    setLocation1(null)
    setLocation2(null)
    setLocationName1('')
    setLocationName2('')
  }
  // switch to the other page
  function showMap() {
    if (!showMapPage && locationName1 && locationName2) {
      setShowMapPage(!showMapPage)
    } else if (showMapPage) {
      setShowMapPage(!showMapPage)
      setLocation1(null)
      setLocation2(null)
      setLocationName1('')
      setLocationName2('')
    } else {
      alert('please set both inputs')
    }
  }
  const middle: number[] = midpoint as number[]
  localStorage.setItem('middle', JSON.stringify(middle))

  location1 && location2 ? getRoute(location1, location2) : null

  const navigate = useNavigate()

  function switchToMore() {
    navigate('/Details')
  }

  return (
    <>
      <InputPage hidden={showMapPage}>
        <InputContainer>
          <h1>See U There</h1>

          <InputPageButton onClick={() => onSet()}>
            set location
          </InputPageButton>
          <LocationInput id="locationInput"></LocationInput>
          <YourLocationInput
            locationName1={locationName1}
            locationName2={locationName2}
          />
          <InputPageButton onClick={() => onClear()}>
            clear all locations
          </InputPageButton>
          <NavigationButton onClick={() => showMap()}>
            <NavigationButtonMapIcon />
          </NavigationButton>
        </InputContainer>
      </InputPage>
      <MapPage hidden={showMapPage}>
        <span>Drivingdistance: {distance} m</span>
        <br />
        <span>MiddleLng : {midpoint ? middle[0] : null},</span>
        <br />
        <span>MiddleLat : {midpoint ? middle[1] : null},</span>
        <MapContainer ref={mapContainer} className="map-container" />
        <NavigationButton onClick={() => showMap()}>
          <NavigationButtonBackIcon />
        </NavigationButton>
        <NavigationButton onClick={switchToMore}>
          <NavigationButtonMoreIcon />
        </NavigationButton>
      </MapPage>
    </>
  )
}

const InputPage = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`
const MapPage = styled.div`
  display: ${(props) => (props.hidden ? 'block' : 'none')};
  height: 100vh;

  position: relative;
`

const InputContainer = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
`

const MapContainer = styled.div`
  height: 80vh;

  position: relative;
  margin: auto;
  margin-top: 30px;
`

const LocationInput = styled.span`
  background-color: #e6e4e4;
  padding: 10px;
  border-radius: 0.4em;
`
