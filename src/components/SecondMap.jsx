import { APIProvider, InfoWindow, Map, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PropTypes from 'prop-types';


const SecondMap = ({ places }) => {
    // const center = [36.8403, 10.2732] 
    const [markerRef, marker] = useMarkerRef();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const handleMarkerClick = (place) => {
        console.log("🚀 ~ file: SecondMap.jsx:10 ~ SecondMap ~ marker:", marker)
        console.log("🚀 ~ file: SecondMap.jsx:10 ~ SecondMap ~ markerRef:", markerRef.current)
        setSelectedPlace(place);
    };
    // console.log("🚀 ~ file: SecondMap.jsx:11 ~ SecondMap ~ selectedPlace:", selectedPlace)

    const center = { lat: 36.8403, lng: 10.2732 }
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className='w-full h-[400px]'>
                <Map
                    center={center}
                    zoom={13}
                // id={import.meta.ev.VITE.GOOGLE_MAPS_MAP_ID}
                // gestureHandling={'greedy'}
                // disableDefaultUI={true}
                >
                    {places.map((place) => (
                        <Marker
                            className='Hello'
                            ref={markerRef}

                            key={place.id}
                            position={{
                                lat: place.location.coordinates[1],
                                lng: place.location.coordinates[0]
                            }}
                            onClick={() => handleMarkerClick(place)}
                        />
                    ))}
                    {/* <Marker
                        ref={markerRef}
                        position={center}
                        onClick={() => handleMarkerClick(place)}
                    /> */}


                    {selectedPlace && (
                        <InfoWindow
                            anchor={marker.current}
                            // position={{
                            //     lat: selectedPlace.location.coordinates[1] + 0.001,
                            //     lng: selectedPlace.location.coordinates[0]
                            // }}
                            onCloseClick={() => setSelectedPlace(null)}>
                            <div>
                                <h2>{selectedPlace.name}</h2>
                                <p>{selectedPlace.description}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>

    )

}

SecondMap.propTypes = {
    places: PropTypes.array.isRequired,
};

export default SecondMap;
