import { useState } from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

function MarkerCompany({ position, hint, eventHandlers }) {
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
      position={position}
      icon={icon}
      eventHandlers={getEventHandlers()}
    >
      <Popup isPopupOpen={isPopupOpen}>{hint}</Popup>
    </Marker>
  );
}

export default MarkerCompany;
