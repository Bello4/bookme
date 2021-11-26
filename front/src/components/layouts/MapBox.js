import React, { useRef, useState, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 import '../../App.css'
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVsbG80IiwiYSI6ImNrcDhlZzNocTA5bmMybnA3cHB3OXB0YWcifQ.F3cJ7gCN_ga3XNZB61QI8g';
 



const MapBox = ({ hotel }) => {
  
  //JSON.stringify(hotel.location)-70.9, 42.35
  
  const mapContainer = useRef(null);
  const map = useRef(null);

  
  const [lng, setLng] = useState(hotel.coordinates);
  //const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(13);

  // const marker = new mapboxgl.Marker({
  //   color: "#ff1500",
  //   draggable: false,
  // }).setLngLat(hotel.coordinates.split());

  
  useEffect(() => {
  if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/bello4/ckp878vbq4uyl18mknnpntmp4',
    pitch: 45,
    bearing: -17.6,
    center: lng,
    zoom: zoom,
    antialias: true
    });

  });

  useEffect(() => {
  if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    //setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
  });
 



    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default MapBox
