import { Marker, Popup } from "react-leaflet";
import { Icon } from 'leaflet'

const icon = new Icon({ iconUrl: "/capital.svg", iconSize: [25, 41], iconAnchor: [12, 41] })

function MarkerLabel({ position, label, eventHandlers }) {
  const getIcon = () => {
    const options = { className: "label" };
    options.html = label;

    return L.divIcon(options);
  };

  return (
    <Marker position={position} icon={icon} eventHandlers={eventHandlers}>
      <Popup>{label}</Popup>
    </Marker>
  );
}

export default MarkerLabel;
