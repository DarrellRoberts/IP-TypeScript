import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface Map {
  latitude: number;
  longitude: number;
}

const MapCard: React.FC<Map> = ({latitude, longitude}) => {
  const customMarkerIcon = L.icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/800px-Map_pin_icon.svg.png",
    iconSize: [32, 40],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
return (
<>
<MapContainer 
center={[latitude, longitude]} 
zoom={13} 
className="map"
scrollWheelZoom={false} 
style={{height: "400px",width: "25%", borderStyle: "solid", borderColor: "black", margin: "5%", borderRadius: "20px"}}
>
    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    <Marker 
    position={[latitude, longitude]}
    icon={customMarkerIcon}
    >
        <Popup>
          What are you doing here??? 
        </Popup>
    </Marker>
</MapContainer>
</>
)
}

export default MapCard;