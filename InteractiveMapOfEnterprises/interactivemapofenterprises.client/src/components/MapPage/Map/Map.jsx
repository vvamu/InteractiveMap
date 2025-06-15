import {
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useRef,
} from "react";
import { MapContainer, GeoJSON, useMap, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import mapDataService from "../../../services/mapDataService";


import CityMarker from "./CityMarker";
import MyMarker from "./MyMarker";


function ChangeMap({ center, zoom }) {
    const map = useMap();

    map.setView(center, zoom);

    return null;
}

const Map = forwardRef(
    function Map({
        onRenderStart
        , onRenderEnd
        , onSetNewPositionMouse = () => { }
        , scrollWheelZoom
        , style
        , center
        , zoom
        , isClickableRegions
        , isVisibleRegionBorders
        , markers
        , filterValue
        , className
    }, ref)

    {

    const mapRef = useRef();

    const [geoJsonPath, setGeoJsonPath] = useState([]);
    const [geojsonLayers, setGeojsonLayers] = useState([]); //границы города
    const [geoJsonCurrent, setGeoJsonCurrent] = useState({
        crs: {
            properties: {
                levelOfDetail: "low",
                center: {
                    lat: 53.75,
                    lng: 27.5,
                },
                zoom: 7,
                title: "",
            },
        },
        features: [],
    });

    const [cityMarkers, setCityMarkers] = useState([]);


    useImperativeHandle(ref, () => ({
        map: mapRef.current,
        current: geoJsonCurrent,
        path: geoJsonPath,
        back: () => handleBackGeoJson(),
    }));

    useEffect(() => {
        mapDataService.getStartMapData().then((data) => {
            setGeoJsonCurrent(data);
        });
    }, []);

    useEffect(() => {
        addGeojsonLayer(geoJsonCurrent);
    }, [geoJsonCurrent, geoJsonPath]);

    const addGeojsonLayer = (geojson) => {
        onRenderStart();
        
        setCityMarkers([]);
        setGeojsonLayers([]);

        const delay = 100;

        geojson.features.forEach((feature, index) => {
            setTimeout(() => {
                setGeojsonLayers((prevLayers) => [...prevLayers, feature]);
            }, index + 1 * delay);
        });

        setTimeout(() => {

            onRenderEnd();
        }, (geojson.features.length + 3) * delay);
    };

    const handleClick = (feature, layer) => {

        const handleChange = (newGeoJson, newPath) => {
            setGeoJsonCurrent(newGeoJson);
            setGeoJsonPath(newPath);
        };

        mapDataService.getMapDataById(feature.properties.id).then((data) => {
            const center = layer.getBounds().getCenter();
            const mapGeoJson = data;

            data.crs.properties.center = center;
            data.crs.properties.title = feature.properties.nameRU;

            //setMapColor(feature.properties.fill);
            handleChange(mapGeoJson, [...geoJsonPath, geoJsonCurrent]);
        });
    };

    const handleBackGeoJson = () => {
        if (geoJsonPath.length === 0) {return;}

        const mapGeoJson = geoJsonPath[geoJsonPath.length - 1];
        geoJsonPath.splice(geoJsonPath.length - 1, 1);

        setGeoJsonCurrent(mapGeoJson);
        setGeoJsonPath([...geoJsonPath]);
    };

    const loadCityBorders = (feature, layer) => {
        if (feature.properties.id) {
            layer.on({
                click: () => {
                    handleClick(feature, layer);
                },
            });
        } else {
            layer.on({
                click: (e) => {
                    const { lat, lng } = e.latlng;
                    onSetNewPositionMouse(geoJsonCurrent.crs.properties.id, { lat, lng });
                },
            });
        }

        setTimeout(() => {
            if (feature.properties.isVisibleLabel) {
                setCityMarkers((prev) => [
                    ...prev,
                    {
                        position: layer.getBounds().getCenter(),
                        label: feature.properties.nameRU,
                        onClick: () => handleClick(feature, layer),
                    },
                ]);
            }
        }, 0);
    };

        return (

               
        <MapContainer
            ref={mapRef}
            attributionControl={false}
            zoomControl={true}
           
                className={"map" + " " + className}
            center={center ?? geoJsonCurrent.center}
            zoom={zoom ?? geoJsonCurrent.zoom}
            dragging={true}
            scrollWheelZoom={scrollWheelZoom ?? false}

                style={{
                    ...{
                       
                        padding: "20px 45px",
                        minHeight: "720px",
                        position: "relative",
                        zIndex:"5"

                    },
                    ...style
                }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {!isVisibleRegionBorders ? null : geojsonLayers.map((geojson, index) => (
                <GeoJSON
                    key={index}
                    className="geo-polygon"
                    data={geojson}
                    onEachFeature={loadCityBorders}
                    style={{
                        fillColor: geojson?.properties?.fill ?? "#a88aea",
                        weight: 1,
                        opacity: 0.35,
                        color: "#000",
                        fillOpacity: 0.5,
                    }}
                />
            ))}
            {cityMarkers.map((marker, index) => (
                <CityMarker
                    key={index}
                    position={marker.position}
                    label={marker.label}
                    eventHandlers={{ click: () => marker.onClick(),
                    }}
                />
            ))}
            {markers
                ? markers.map((marker, index) => (

                    <MyMarker marker={marker} />  
                ))
                : null
            }


            <ChangeMap
                center={center ?? geoJsonCurrent.crs.properties.center}
                zoom={zoom ?? geoJsonCurrent.crs.properties.zoom}
            />
                </MapContainer>

    );
});

export default Map;