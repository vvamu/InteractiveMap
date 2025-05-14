import {useState,useEffect,useImperativeHandle,forwardRef,useRef,} from "react";
import { MapContainer, GeoJSON, useMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import companiesService from "../../../services/companiesService";
import mapDataService from "../../../services/mapDataService";


import MarkerLabel from "./MarkerLabel";
import MarkerCompany from "./MarkerCompany";

function ChangeMap({ center, zoom }) {
  const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);
  return null;
}

const Map = forwardRef(
    function Map({
            onRenderStart
            ,onRenderEnd
            ,onSetNewPositionMouse = () => { }
            ,scrollWheelZoom
            ,style
            ,center
            ,zoom
            ,isClickableRegions
            ,isVisibleRegionBorders    
        }, ref)
    {

      const defaultStyles = {
          padding: "20px 45px",
          height: "550px",
           position: "relative"
      };

      const combinedStyles = {
          ...defaultStyles,
          ...style
      };

      const mapRef = useRef();

      const [geojsonLayers, setGeojsonLayers] = useState([]);
      const [geoJsonCurrent, setGeoJsonCurrent] = useState({
        crs: {
          properties: {
            levelOfDetail: "low",
            center: {
              lat: 53.75,
              lng: 27.5,
            },
            zoom: 3,
            title: "",
          },
        },
        features: [],
      });
      const [geoJsonPath, setGeoJsonPath] = useState([]);

      const [labelMarkers, setLabelMarkers] = useState([]);
      const [companyMarkers, setCompanyMarkers] = useState([]);
      const [mapColor, setMapColor] = useState(undefined);

      useImperativeHandle(ref, () => ({
        map: mapRef.current,
        current: geoJsonCurrent,
        path: geoJsonPath,
        back: () => handleBackGeoJson(),
      }));

    

      useEffect(() => {mapDataService.getStartMapData().then((data) => {setGeoJsonCurrent(data);});}, []);
      useEffect(() => {addGeojsonLayer(geoJsonCurrent);}, [geoJsonCurrent, geoJsonPath]);
   

      const addGeojsonLayer = (geojson) => {
        onRenderStart();
        setCompanyMarkers([]);
        setLabelMarkers([]);
        setGeojsonLayers([]);

        let delay = 20;

        geojson.features.forEach((feature, index) => {
          setTimeout(() => {
            setGeojsonLayers((prevLayers) => [...prevLayers, feature]);
          }, index + 1 * delay);
        });

        setTimeout(() => {
          geojson.markers && setCompanyMarkers(geojson.markers);
          onRenderEnd();
        }, (geojson.features.length + 3) * delay);
      };

      const getPolygonStyle = (feature) => {
        let fillColor = "blue";

        if (feature.properties.fill) {
          fillColor = feature.properties.fill;
        } else if (mapColor) {
          fillColor = mapColor;
        }

        return {
          fillColor: fillColor,
          weight: 2,
          opacity: 0.45,
          color: "#000",
          fillOpacity: 0.5,
        };
      };

      const handleAddMarker = (feature, layer) => {
        if (feature.properties.isVisibleLabel) {
          setLabelMarkers((prev) => [
            ...prev,
            {
              position: layer.getBounds().getCenter(),
              label: feature.properties.nameRU,
              onClick: () => handleClick(feature, layer),
            },
          ]);
        }
      };

      const handleChange = (newGeoJson, newPath) => {
        setGeoJsonCurrent(newGeoJson);
        setGeoJsonPath(newPath);
      };

      const handleClick = (feature, layer) => {
        mapDataService.getMapDataById(feature.properties.id).then((data) => {
          const center = layer.getBounds().getCenter();
          const mapGeoJson = data;

          data.crs.properties.center = center;
          data.crs.properties.title = feature.properties.nameRU;

          setMapColor(feature.properties.fill);
          handleChange(mapGeoJson, [...geoJsonPath, geoJsonCurrent]);
        });
          //companiesService.getByRegion(feature.properties.id).then((data) => {
          //    handleChange(mapGeoJson, [...geoJsonPath, geoJsonCurrent]);
          //});
      };

      const handleBackGeoJson = () => {
        if (geoJsonPath.length === 0) {
          return;
        }

        const mapGeoJson = geoJsonPath[geoJsonPath.length - 1];

        geoJsonPath.splice(geoJsonPath.length - 1, 1);

        setGeoJsonCurrent(mapGeoJson);
        setGeoJsonPath([...geoJsonPath]);
      };

      const handleEachFeature = (feature, layer) => {
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
          handleAddMarker(feature, layer);
        }, 0);
      };

        return (
        
                <MapContainer
                ref={mapRef}
                attributionControl={false}
                zoomControl={true}
                dragging={false}
                scrollWheelZoom={scrollWheelZoom ?? true}
                className="map"
                center={center ?? geoJsonCurrent.center}
                style={combinedStyles}
                zoom={zoom}
                
                >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!isVisibleRegionBorders ? null : 
                    geojsonLayers.map((geojson, index) => (
                        <GeoJSON
                            key={index}
                            className={!isClickableRegions ? "" : "geo-polygon"}
                            onEachFeature={!isClickableRegions ? null : handleEachFeature}
                            data={geojson}
                            style={getPolygonStyle}
                        />
                    ))
                }
                    
                    {labelMarkers.map((marker, index) => (
                        <MarkerLabel
                            key={index}
                            position={marker.position}
                            label={marker.label}
                            eventHandlers={{
                                click: () => marker.onClick(),
                            }}
                        />
                    ))}
                    {companyMarkers.map((marker, index) => (
                        <MarkerCompany
                            key={index}
                            position={marker.position}
                            hint={marker.name}
                            eventHandlers={{
                                click: () => document.location = "/company?id=" + marker.id
                            }}
                        />
                    ))
                    }
                   
                    <ChangeMap
                        center={geoJsonCurrent.crs.properties.center}
                        zoom={geoJsonCurrent.crs.properties.zoom}
                    />
                </MapContainer>
       
      );
    }
);

export default Map;
