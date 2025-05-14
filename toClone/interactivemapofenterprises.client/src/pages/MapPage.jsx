import { useRef, useState } from "react";

import Map from "../components/MapPage/Map/Map";
import ButtonIcon from "../components/Common/Buttons/ButtonIcon";
import { backIconSrc } from "./../../config";


function MapPage() {
  const mapRef = useRef();
  const [isRender, setIsRender] = useState(false);

  return (
    <>
      <header></header>
      <main>
        <Map
          ref={mapRef}
          onRenderStart={() => setIsRender(true)}
          onRenderEnd={() => setIsRender(false)}
        />
        <section className="map-header" style={{ display: "flex",  alignItems:"flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column",gridGap :"20px" }}>
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
                <h1 className="map-title" style={{ writingMode: "vertical-rl", whiteSpace: "nowrap" }}>
                    {mapRef.current.current.crs.properties.title ? mapRef.current.current.crs.properties.title : ""}
                                  </h1>

                </>
              ) : (
                ""
                          )}
          </div>
        </section>
        
      </main>
      <footer></footer>
    </>
  );
}

export default MapPage;
