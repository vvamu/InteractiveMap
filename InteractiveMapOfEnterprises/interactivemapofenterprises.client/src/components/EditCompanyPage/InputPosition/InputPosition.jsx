import { useEffect, useRef, useState } from "react";
import Map from "../../MapPage/Map/Map";
import Button from "../../common/Buttons/Button";
import ButtonIcon from "../../common/Buttons/ButtonIcon";
import { Icon } from "leaflet";
import MyMarker from "../../MapPage/Map/MyMarker"

const BackIcon = "/back.png";

import classes from "./Input.module.css";

function InputPosition({ idRegion, position, onCancel, onConfirm, onClick }) {
    const mapRef = useRef();
    const markerRef = useRef();
    const [isRender, setIsRender] = useState(false);
    const [isDisabledConfirm, setIsDisabledConfirm] = useState(position === undefined);

    const [newIdRegion, setNewIdRegion] = useState(idRegion);
    const [newPosition, setNewPosition] = useState(position);

    useEffect(() => {


        if (markerRef.current) {
            
            markerRef.current.setLatLng(newPosition);
            markerRef.current.setIcon(new Icon({ className: "marker", iconUrl: "/marker-icon.png", iconAnchor: [11, 40], popupAnchor: [0, -20], }))
            setIsDisabledConfirm(newPosition === undefined);
            return;
        }
        if (position) {
            //const mapInstance = mapRef.current.map;
            //L.marker(position).addTo(mapInstance);
        }
    }, [newPosition, onClick]);

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
        <div className={classes.inputPosition} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "125%" } }> 
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <div className={classes.mapHeader}>
                    {mapRef.current ? (
                        <div className="flexContent" style={{ position: "absolute" , zIndex:"100", left:"10%" }}>
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
                            <div>
                                {mapRef.current.current.crs.properties.title
                                    ? mapRef.current.current.crs.properties.title
                                    : ""}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div style={{ display: "flex", gridGap: "10px", position: "absolute", zIndex: "100", right: "10%" }}>
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

                </div>
            </div>

            <div className={classes.map} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "105%" }}>
                <Map
                    isClickableRegions={true}
                    isVisibleRegionBorders={true}

                    style={{width:"100%" , height:"120%", borderRadius:"10px" , position:"absolute", top:"-20%"} }
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
           
            {/*<div className="map-footer">*/}
            {/*    <Button*/}
            {/*        onClick={() => {*/}
            {/*            setNewIdRegion(idRegion);*/}
            {/*            setNewPosition(position);*/}
            {/*            onCancel();*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Отмена*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        onClick={() => onConfirm(newIdRegion, newPosition)}*/}
            {/*        disabled={isDisabledConfirm}*/}
            {/*    >*/}
            {/*        Подтвердить*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    );
}

export default InputPosition;