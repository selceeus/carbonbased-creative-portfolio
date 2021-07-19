import React, { useEffect, useState } from 'react';
import MapGL, { NavigationControl, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//Imported Components 
import './map.styles.scss';

const {REACT_APP_MAPBOX_TOKEN} = process.env;

const navStyle = {
    top: 20,
    right: 20,
    padding: '20px'
  };

function Map() {

    const [viewport, setViewport] = useState({
        latitude: 38.8314,
        longitude: -104.8083,
        zoom: 12,
        bearing: 0,
        pitch: 50
    });

    const[building3d, setBuilding]  = useState({
        'id': 'add-3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
            'fill-extrusion-color': '#aaa',
            
            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    });

    return(
        <section className="map">
            <MapGL
                {...viewport}
                width="100vw"
                height="40vh"
                mapStyle='mapbox://styles/selceeus/ck5fqvu9w0baj1iocay7t6n87'
                onViewportChange={setViewport}
                mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
                type="raster-dem"
                url="mapbox://mapbox.mapbox-terrain-dem-v1"
                tileSize="256"
            >
                <Layer {...building3d} />
                <NavigationControl style={navStyle} />
                <Marker latitude={38.8314} longitude={-104.8083} offsetLeft={-20} offsetTop={-10}>
                    <div>You are here</div>
                </Marker>

            </MapGL>
        </section>
    );
}

export default Map;