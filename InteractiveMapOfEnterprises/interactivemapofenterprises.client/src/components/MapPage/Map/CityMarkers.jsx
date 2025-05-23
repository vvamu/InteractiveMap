export default function CityMarkers({ position, label, eventHandlers }) {

    return (
        <Marker position={position} icon={icon} eventHandlers={eventHandlers}>
            <Popup>{label}</Popup>
        </Marker>
    );