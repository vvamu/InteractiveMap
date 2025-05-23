import { useEffect, useRef, useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import Map from "../components/MapPage/Map/Map";
import ButtonIcon from "../components/Common/Buttons/ButtonIcon";
import { backIconSrc } from "./../../config";
import companiesService from "../services/companiesService";

function MapPage() {
  const mapRef = useRef();
    const [isRender, setIsRender] = useState(false);

    const [markersLocal, setMarkersLocal] = useState([]);
    useEffect(() => {
        console.log("hello")
        companiesService.getAll().then((data) => {
            if (!data) return;
            const newMarkers = data.map((item) => {
                let image = !item.iconBytes ? "/qualityMark.png" : `data:image/jpeg;base64,${item.iconBytes}`;

                return {
                    //position: {
                    //    lng: item.altitude,
                    //    lat: item.latitude
                    //},
                    latitude: item.latitude,
                    altitude: item.altitude,
                    name: item.name,
                    icon: image,
                    companyId: item.id
                    
                };
            });
            //console.log(newMarkers)
            //setMarkersLocal(newMarkers);
            setMarkersLocal(newMarkers)
        })

    }, [])

  return (
      <ContentWithPaddings >
       <div style={{ display: "flex", alignItems: "center",gridGap :"20px",   }}>
              {mapRef.current ? (
                <>
                  {mapRef.current.path.length === 0 ? (
                    ""
                      ) : (
                          
                     <ButtonIcon 
                      src={backIconSrc}
                      alt={"Назад"}
                      disabled={isRender}
                      onClick={() => mapRef.current.back()}
                    ></ButtonIcon>
                  )}
                          <h3>{mapRef.current.current.crs.properties.title
                              ? mapRef.current.current.crs.properties.title : ""}
                          </h3>

                </>
              ) : (
                ""
                          )}
          </div>
          <div>Созданных компаний :{markersLocal.length}</div>
        <Map
              ref={mapRef}
              onRenderStart={() => setIsRender(true)}
              onRenderEnd={() => setIsRender(false)}
              style={{ border: "1px solid black", borderRadius: "10px" }}
              isVisibleRegionBorders={true}
              markers={markersLocal}
          />



         
      </ContentWithPaddings>
  );
}

export default MapPage;
