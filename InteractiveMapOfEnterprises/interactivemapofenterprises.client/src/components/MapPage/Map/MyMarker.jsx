import { useState } from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import ApplicationUrl from "../../../models/ApplicationUrl";

function MarkerCompany({ marker}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const icon = new Icon({
    className: "marker",
      iconUrl: marker.icon ?? "/marker-icon.png", //marker-icon 3:5
      iconSize: !marker.icon ? [30, 50] : [50, 50], 
    iconAnchor: [25, 50],
      popupAnchor: [0, -20],
  });


  const getEventHandlers = () => {
      const newEventHandlers = {
          click: (e) => { document.location = ApplicationUrl.Company.app.get + marker.companyId },
      mouseover: (e) => {
        setIsPopupOpen(true);
        e.target.openPopup();
        e.mouseover && e.mouseover(e);
      },
      mouseout: (e) => {
        setIsPopupOpen(false);
        e.target.closePopup();
        e.mouseout && e.mouseout(e);
      },
    };

    return newEventHandlers;
  };

  return (
    <Marker
          position={{
              "lat": marker.latitude == undefined ? marker.position.lat : marker.latitude,
              "lng": marker.altitude == undefined ? marker.position.lng : marker.altitude,
          }}
        
          icon={icon}
          eventHandlers={getEventHandlers()}
      >
          <Popup isPopupOpen={isPopupOpen}>{marker.name ?? "empty pop"}</Popup>
    </Marker>
  );
}

export default MarkerCompany;
