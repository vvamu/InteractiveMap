import { useRef, useState } from "react";

import Map from "./../components/Map/Map";
import Button from "../components/Buttons/Button";
import ButtonIcon from "./../components/Buttons/ButtonIcon";
import Link from "./../components/Links/Link";
import BackIcon from "./../assets/icons/back.svg";

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
        <section className="map-header">
          {mapRef.current ? (
            <>
              {mapRef.current.path.length === 0 ? (
                ""
              ) : (
                <ButtonIcon
                  src={BackIcon}
                  alt={"Назад"}
                  disabled={isRender}
                  onClick={() => mapRef.current.back()}
                ></ButtonIcon>
              )}
              <h1 className="map-title">
                {mapRef.current.current.crs.properties.title
                  ? mapRef.current.current.crs.properties.title
                  : ""}
              </h1>
            </>
          ) : (
            ""
          )}
        </section>
        <section className="map-footer">
          <Link href={"/"}>ГЛАВНАЯ</Link>
          <Link href="catalog">АДМИН ПАЛЕНЬ</Link>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default MapPage;
