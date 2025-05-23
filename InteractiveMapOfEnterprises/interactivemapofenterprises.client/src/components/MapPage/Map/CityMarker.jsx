import { Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet'

const icon = new Icon({ iconUrl: "/capital.svg", iconSize: [25, 41], iconAnchor: [12, 41] })

export default function CityMarker({ position, label, eventHandlers }) {

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers}>
      <Popup>{label}</Popup>
    </Marker>
  );
}
