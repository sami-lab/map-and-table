import React,{useMemo,useState} from 'react'

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import data from '../data/sample_location.json'

import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
  } from 'react-map-gl';


  import "mapbox-gl/dist/mapbox-gl.css";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

function Pin({size = 20}) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

export default function index(props) {
    const [popupInfo, setPopupInfo] = useState(null);

    const pins = useMemo(
        () =>
          data.locations.map((city, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={city.longitude}
              latitude={city.latitude}
              anchor="bottom"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(city);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
      );


    return (
      <>
      <Map
   initialViewState={{
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  }}

        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={publicRuntimeConfig.MAPBOX_ACCESS_TOKEN}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
            {pins}

        <ScaleControl />
            {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}

            </div>
            <img width="100%" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/San_Francisco_skyline_from_Coit_Tower.jpg/240px-San_Francisco_skyline_from_Coit_Tower.jpg"} />
          </Popup>
        )} 
        </Map>

    <style>
        {`
        .mapboxgl-canvas, .mapboxgl-map{
            height: 500px !important;
        }
        `}
    </style>
      </>
    );
}
