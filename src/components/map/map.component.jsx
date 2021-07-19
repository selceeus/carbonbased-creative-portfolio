import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MapGL, { GeolocateControl, NavigationControl, Layer, Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//Imported Components 
import './map.styles.scss';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

function Map() {

    
    
    useEffect(() => {
       
    }, []);

    return(
        <section className="map">
            <h1>Map</h1>
        </section>
    );
}

export default Map;