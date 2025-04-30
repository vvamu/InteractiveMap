import { useEffect, useRef, useState } from "react";
import Map from "../Map/Map";
import Button from "./../Buttons/Button";
import ButtonIcon from "./../Buttons/ButtonIcon";

import BackIcon from "./../../assets/icons/back.svg";

import classes from "./Input.module.css";

function InputPosition({ idRegion, position, onCancel, onConfirm }) {
  const mapRef = useRef();
  const markerRef = useRef();
  const [isRender, setIsRender] = useState(false);
  const [isDisabledConfirm, setIsDisabledConfirm] = useState(
    position === undefined
  );

  const [newIdRegion, setNewIdRegion] = useState(idRegion);
  const [newPosition, setNewPosition] = useState(position);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(newPosition);
      setIsDisabledConfirm(newPosition === undefined);
    }
  }, [newPosition]);

  const handleRenderEnd = () => {
    setIsRender(false);

    if (!markerRef.current && position) {
      const mapInstance = mapRef.current.map;
      const marker = L.marker(newPosition).addTo(mapInstance);

      markerRef.current = marker;
    }
  };

  const handleChange = (id, value) => {
    setNewPosition(value);
    setNewIdRegion(id);
  };

  return (
    <section className={classes.inputPosition}>
      <div className={classes.map}>
        <Map
          ref={mapRef}
          onRenderStart={() => setIsRender(true)}
          onRenderEnd={handleRenderEnd}
          onSetNewPositionMouse={(id, value) => {
            if (!markerRef.current) {
              const mapInstance = mapRef.current.map;
              const marker = L.marker(value).addTo(mapInstance);

              markerRef.current = marker;
            }

            handleChange(id, value);
          }}
        ></Map>
      </div>
      <div className="map-header">
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
      </div>
      <div className="map-footer">
        <Button
          onClick={() => {
            setNewIdRegion(idRegion);
            setNewPosition(position);
            onCancel();
          }}
        >
          Отмена
        </Button>
        <Button
          onClick={() => onConfirm(newIdRegion, newPosition)}
          disabled={isDisabledConfirm}
        >
          Подтвердить
        </Button>
      </div>
    </section>
  );
}

export default InputPosition;
