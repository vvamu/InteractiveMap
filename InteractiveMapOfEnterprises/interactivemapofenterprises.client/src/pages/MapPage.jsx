import { useRef, useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import Map from "../components/MapPage/Map/Map";
import ButtonIcon from "../components/Common/Buttons/ButtonIcon";
import { backIconSrc } from "./../../config";
import CountCompaniesByRegion from "../components/MapPage/CountCompaniesByRegion";

function MapPage() {
  const mapRef = useRef();
  const [isRender, setIsRender] = useState(false);

  return (
      <ContentWithPaddings >
          <div>
              <CountCompaniesByRegion  />
          </div>
        <Map
              ref={mapRef}
              onRenderStart={() => setIsRender(true)}
              onRenderEnd={() => setIsRender(false)}
              style={{ border: "1px solid black", borderRadius: "10px" }}
              isVisibleRegionBorders={ true}
          />
          <div style={{ display: "flex", alignItems: "center",gridGap :"20px", position:"absolute"  }}>
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
                          <h1>{mapRef.current.current.crs.properties.title
                              ? mapRef.current.current.crs.properties.title : ""}
                          </h1>

                </>
              ) : (
                ""
                          )}
          </div>
      </ContentWithPaddings>
  );
}

export default MapPage;
