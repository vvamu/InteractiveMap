import VideoCompony from "./VideoCompony";
import AchievementsCompany from "./AchievementsCompany";
import classes from "./CompanyInfo.module.css";
import { React, useRef, useState, useEffect } from "react";
const qualityMarkIcon = "/qualityMark.png";


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ContentWithPaddings from "../../common/ContentWithPaddings";
import Map from "../../MapPage/Map/Map";

const components = {
  MINIMAL_INFO_ABOUT: MinimalInfoAboutCompony,
  VIDEO: VideoCompony,
  ACHIEVEMENTS: AchievementsCompany
};


function CompanyInfo({ data }) {
  console.log(data);

  if (!data) {
    return null;
  }
  return (
     
          <MinimalInfoAboutCompony props={ data} />
      
  );
}


const ImageComponent = (props) => {

    //return (
    //    <img
    //        className={classes.logo}
    //        src={!props.props.imageBytes ? "/qualityMark.png" : `data:image/jpeg;base64,${props.props.imageBytes}`}
    //        alt={props.props.name}
    //        width={256}
    //        height={256}
    //    />
    //);
    let image = !props.imageBytes ? "url(emptyImageGray.jpg)" : `data:image/png;base64,${props.imageBytes}`
    return <div style={{ backgroundImage: image, height: "580px", width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "50%", backgroundPositionY: "center" }} ></div>
};

const IconComponent = (props) => {

    return (
        <img
            className={classes.qualityMark}
            src={!props.props.iconBytes ? "/qualityMark.png" : `data:image/jpeg;base64,${props.props.iconBytes}`}
            alt={props.props.name}
            width={100}
            height={100}
        />
    );
};
function MapOnPage(props) {
    const { mapRef } = props; 
    const [isRender, setIsRender] = useState(false);
    let pos = [props.props.latitude, props.props.altitude]

    //useEffect(() => {
    //    const newMarkers = [props];
    //    if (mapRef && mapRef.current) {
    //        mapRef.current.setCompanies(newMarkers);
    //    }
    //}, [mapRef, props]);
   
    return <Map
        center={pos}
        zoom={8}
        ref={mapRef}
        onRenderStart={() => setIsRender(true)}
        onRenderEnd={() => setIsRender(false)}
        scrollWheelZoom={false}
        isVisibleRegionBorders={false}
        companiess={[props,props,props]}    />
}
function MinimalInfoAboutCompony({ props }) {

    return (
        <div>

            <ImageComponent props={props} />
            {props.iconBytes ? (
                <IconComponent props={props} />
            ) : null}
            {/*<div className={`${classes.chapter} ${classes.minimalInfoAboutCompony}`}>*/}
                
            <ContentWithPaddings>
                <h2 className={classes.title}>{props.name}</h2>
                <div className={classes.description}>{props.category }</div>
                <div className={classes.foundationDate}>
                    Date of placement: <span>{props.dateFoundation.substring(0, 10)}</span>
                </div>
                <div className={classes.foundationDate}>
                    Region: <span>{props.regionId}</span> 
                </div>
                <hr/>
                <div className={classes.foundationDate}>
                    Creator: <span>{props.creatorName}</span> (<span>{props.dateCreatedArticle.substring(0, 10)}</span>)
                </div>
                <hr/>
                <div className={classes.description}>{props.description}</div>
            </ContentWithPaddings>
                
            <MapOnPage props={props} />
         
               
          
        </div>
    );
}

export default CompanyInfo;


{/*{data.map((d, index) => {*/ }
{/*  const Component = components[d.type];*/ }
{/*  return <Component key={index} props={d} />;*/ }
{/*})}*/ }