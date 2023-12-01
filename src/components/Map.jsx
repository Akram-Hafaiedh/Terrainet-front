import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// const provider = new OpenStreetMapProvider();


const Map = () => {
    const center = [36.8403, 10.2732]  // Replace with your desired initial coordinates
    return (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Add Markers for places */}
            <Marker position={center}>
                <Popup>
                    Place name
                </Popup>
            </Marker>
            {/* Add more markers for other places as needed */}
        </MapContainer>
    );
};


export default Map;
