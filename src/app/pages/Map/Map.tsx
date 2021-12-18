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
import * as turf from '@turf/turf'
import NavigationButtonMoreIcon from '../../Icons/NavigationButtonMoreIcon'
import { useNavigate } from 'react-router'
import ClearAllButton from '../../components/ClearAllButton/ClearAllButton'
import DeletX from '../../Icons/DeleteX'
import NavigationButtonInputIcon from '../../Icons/NavigationButtonInputIcon'

if (typeof import.meta.env.VITE_MAPBOX_ACCESSKEY === 'string') {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSKEY
} else {
  throw new Error('no KEY provided')
}

export default function MapBox(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<null | Map>(null)
  //const [distance, setDistance] = useState<number>(0)
  const [location, setLocation] = useState<GeoJSON.Position | null>(null)
  const [locationName, setLocationName] = useState<string>('')
  const [locationName1, setLocationName1] = useState<string>('')
  const [locationName2, setLocationName2] = useState<string>('')
  const [location1, setLocation1] = useState<GeoJSON.Position | null>(null)
  const [location2, setLocation2] = useState<GeoJSON.Position | null>(null)
  const [showMapPage, setShowMapPage] = useState<boolean>(true)

  // initialize map only once
  useEffect(() => {
    //if comin from details page, initilize with choosen locations
    if (localStorage.getItem('CominFromDetailsPage') === 'true') {
      setLocation1(
        JSON.parse(localStorage.getItem('Location1Coords') as string)
      )
      setLocation2(
        JSON.parse(localStorage.getItem('Location2Coords') as string)
      )
      localStorage.setItem('CominFromDetailsPage', 'false')
    }

    if (map && map.current) return
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [10, 51],
      zoom: 4.5,
    })

    map.current.once('load', () => {
      map.current?.resize()
    })

    //add MapControl
    const mapControl = new mapboxgl.NavigationControl()
    map.current.addControl(mapControl)

    //initiallize Geocoder and set to Div
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: 'find location',
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

    //setDistance(data.distance)
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
          'line-color': '#2b5113',
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
          'circle-color': '#ceb372',
          'circle-blur': 0.5,
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
          'circle-color': '#ceb372',
          'circle-blur': 0.5,
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

  //set marker
  map.current && midpoint
    ? new mapboxgl.Marker({ color: '#2b5113' })
        .setLngLat(midpoint)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<p>Center</p>`))
        .addTo(map.current)
    : null
  const middle: number[] = midpoint as number[]

  //get POI / hotels und  Unterkünfte 25 stk
  async function getPOI(
    lat: number,
    long: number,
    radius: number,
    categorie: number
  ) {
    const response = await fetch(
      `/api/places/${lat}/${long}/${radius}/${categorie}`
    )
    const body = await response.json()
    const POIs = body.results

    //Map POIs
    POIs.map(
      (POI: {
        geocodes: { main: { latitude: number; longitude: number } }
        name: string
        categories: [{ name: string }]
      }) =>
        map.current
          ? new mapboxgl.Marker({ color: 'var(--color-gold)', scale: 0.7 })
              .setLngLat([
                POI.geocodes.main.longitude,
                POI.geocodes.main.latitude,
              ])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `
                  <h3>${POI.name}</h3><br/>
                  <p>Type: ${POI.categories.map((type) => type.name)}</p>`
                )
              )
              .addTo(map.current)
          : null
    )

    //searchRadius Layer
    map.current?.addLayer({
      id: 'search-radius',
      source: {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      },
      type: 'fill',
      paint: {
        'fill-color': '#e03030',
        'fill-opacity': 0.1,
      },
    })

    function makeRadius(latitude: number, longitude: number, radius: number) {
      let Buffer
      if (radius < 5000) Buffer = 100
      else if (radius < 1500) Buffer = 1000
      else Buffer = 4000

      const radiusBuffer = radius + Buffer

      console.log(radiusBuffer)
      const point = turf.point([latitude, longitude])
      const buffered = turf.buffer(point, radiusBuffer, { units: 'meters' })
      return buffered
    }

    const searchRadius = makeRadius(long, lat, radius)
    const SearchRadiusSource = map.current?.getSource('search-radius')

    if (SearchRadiusSource?.type === 'geojson') {
      SearchRadiusSource?.setData(searchRadius)
    }
  }

  const radius = parseInt(localStorage.getItem('Radius') as string)
  const categorie = parseInt(localStorage.getItem('ActiveSearchTag') as string)

  if (midpoint) {
    const LongCoords = middle[0] as number
    const LatCoords = middle[1] as number
    getPOI(LatCoords, LongCoords, radius, categorie)
  }

  // if locations are set do
  function onSet() {
    if (!location1) {
      setLocation1(location)
      setLocationName1(locationName)
      localStorage.setItem('Location1', JSON.stringify(locationName))
      localStorage.setItem('Location1Coords', JSON.stringify(location))
      localStorage.setItem('Radius', '')
      localStorage.setItem('ActiveSearchTag', '')
    } else if (!location2) {
      setLocation2(location)
      setLocationName2(locationName)
      localStorage.setItem('Location2', JSON.stringify(locationName))
      localStorage.setItem('Location2Coords', JSON.stringify(location))
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
    if (
      (!showMapPage && locationName1 && locationName2) ||
      (!showMapPage && !locationName1 && !locationName2)
    ) {
      setShowMapPage(!showMapPage)
      localStorage.setItem('Radius', '0')
      localStorage.setItem('ActiveSearchTag', '')
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

  middle ? localStorage.setItem('middleLng', JSON.stringify(middle[0])) : null
  middle ? localStorage.setItem('middleLat', JSON.stringify(middle[1])) : null
  location1 && location2 ? getRoute(location1, location2) : null

  const navigate = useNavigate()

  //navigate to Deatils page
  function switchToMore() {
    navigate('/Details')
  }

  return (
    <>
      <InputPage hidden={showMapPage}>
        <AppName>MidWay</AppName>
        <InputContainer>
          <GeocoderBox>
            <LocationInput id="locationInput"></LocationInput>
            <InputPageButton onClick={() => onSet()}>
              set location
            </InputPageButton>
            <ClearAllButton onClick={() => onClear()}>
              <DeletX />
            </ClearAllButton>
          </GeocoderBox>
          <YourLocationInput
            locationName1={locationName1}
            locationName2={locationName2}
          />
          <NavigationContainerMap>
            <NavigationButton onClick={() => showMap()}>
              <NavigationButtonMapIcon />
            </NavigationButton>
          </NavigationContainerMap>
        </InputContainer>
      </InputPage>
      <MapPage hidden={showMapPage}>
        <MapContainer ref={mapContainer} className="map-container" />
        <div id="map-popups"></div>

        <NavigationContainer>
          <NavigationButton onClick={() => showMap()}>
            <NavigationButtonInputIcon />
          </NavigationButton>

          <NavigationButton onClick={switchToMore}>
            <NavigationButtonMoreIcon />
          </NavigationButton>
        </NavigationContainer>
      </MapPage>
    </>
  )
}

// inputPage
const InputPage = styled.div`
  display: ${(props) => (props.hidden ? 'none' : 'block')};
`

const InputContainer = styled.section`
  display: grid;
  gap: 1em;
  padding: 0 1.7em;
  margin-top: -2em;
`
// inputPage upper Box
const LocationInput = styled.div`
  height: 2em;
  padding: 1em;
  margin: 0 0 2.2em -2em;
  grid-area: Query;

  & .mapboxgl-ctrl-geocoder--icon-search {
    margin-top: -0.3em;
    margin-right: 15em;
    right: 2px;
    margin-right: 1em;
    left: auto;
  }

  & .mapboxgl-ctrl-geocoder--icon-close {
    margin-top: 0;
    margin-right: 2.7em;
  }
`

const AppName = styled.h1`
  font-size: 4em;
  margin-top: 0;
  font-weight: lighter;
  text-align: center;
`
const GeocoderBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 5em;
  grid-template-rows: 1fr 3em;
  background-color: var(--color-green-500);
  border: solid var(--color-gold) 3px;
  border-radius: 0.7em;
  grid-template-areas:
    'Query Query'
    'SetItem clear';
  padding-bottom: 1em;
  box-shadow: var(--box-shadow);
`
const NavigationContainerMap = styled.div`
  position: absolute;
  display: block;
  bottom: 0.5em;
  justify-self: center;
`

//MapPage
const MapPage = styled.div`
  display: ${(props) => (props.hidden ? 'block' : 'none')};
  height: 100vh;
  margin-top: -1.9em;
  position: relative;
`

const MapContainer = styled.div`
  height: 100%;
  position: relative;
  margin: auto;
  margin-top: 30px;
`

const NavigationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7em;
  position: relative;
  bottom: 6em;
  right: -1em;
`
