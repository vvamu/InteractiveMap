import { Marker, Popup } from "react-leaflet";

function MarkerLabel({ position, label, eventHandlers }) {
  const getIcon = () => {
    const options = { className: "label" };

    options.html = label;

    return L.divIcon(options);
  };

  return (
    <Marker position={position} icon={getIcon()} eventHandlers={eventHandlers}>
      <Popup>{label}</Popup>
    </Marker>
  );
}

export default MarkerLabel;
