import { useState } from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

function MarkerCompany({ eventHandlers,marker }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const icon = new Icon({
    className: "marker",
    iconUrl:  "/marker-icon.png",
    //iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -20],
  });


  const getEventHandlers = () => {
    const newEventHandlers = {
      click: (e) => eventHandlers.click(),
      mouseover: (e) => {
        setIsPopupOpen(true);

        e.target.openPopup();

        eventHandlers.mouseover && eventHandlers.mouseover(e);
      },
      mouseout: (e) => {
        setIsPopupOpen(false);

        e.target.closePopup();

        eventHandlers.mouseout && eventHandlers.mouseout(e);
      },
    };

    return newEventHandlers;
  };

  return (
    <Marker
          position={{
              "lat": marker.latitude,
              "lng": marker.altitude
          }}
      icon={icon}
      eventHandlers={getEventHandlers()}
      >
          <Popup isPopupOpen={isPopupOpen}>{marker.name}</Popup>
    </Marker>
  );
}

export default MarkerCompany;
