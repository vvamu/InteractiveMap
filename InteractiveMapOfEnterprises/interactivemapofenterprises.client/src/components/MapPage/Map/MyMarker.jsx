import { useState,useEffect } from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import ApplicationUrl from "../../../models/ApplicationUrl";

function MarkerCompany({ marker}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [iconSize, setIconSize] = useState([50, 50]);

    const calculateAspectRatio = (imageSrc) => {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const newWidth = 50; // Set a default width
            const newHeight = newWidth / aspectRatio;
            setIconSize([newWidth, newHeight]);
        };

        img.onerror = (error) => {
            console.error("Error loading image:", error);
        };
    };

    useEffect(() => {
        if (marker.icon) {
            let url = marker.icon.replace("data:image/jpeg;base64,", "").replace("data:image/png;base64,", "").replace("data:image/jpg;base64,", "") 
            calculateAspectRatio(`data:image/png;base64,${url}`);
        }
    }, [marker.icon]);



  const icon = new Icon({
    className: "marker",
      iconUrl: marker.icon ?? "/marker-icon.png", //marker-icon 3:5
      iconSize: iconSize, 
      
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
          style={{ objectFit:"contain"}}
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
