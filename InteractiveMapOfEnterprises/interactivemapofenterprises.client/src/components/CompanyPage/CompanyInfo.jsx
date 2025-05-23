
import classes from "./CompanyInfo.module.css";
import { React, useRef, useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Map from "../MapPage/Map/Map";

import authService from "../../services/authService";
import NavLinkWithImage from "../common/NavLinkWithImage";

import OperationType from "../../models/OperationType";
import ApplicationUrl from "../../models/ApplicationUrl";
import ContentWithPaddings from "../common/ContentWithPaddings";

function CompanyInfo({ data }) {return (!data ? null : <MinimalInfoAboutCompony props={data} />);}
export default CompanyInfo;





function MinimalInfoAboutCompony({ props }) {
    const [user, setUser] = useState(null); // Declare user state first

    useEffect(() => {
        authService.getCurrentUser().then((data) => {
            setUser(data)
        });
    }, []);

    const EditButton = () => {
        let res = user != null && (user?.roles == "Administrator" || user?.id == props?.creatorId)
        if (res) {
            return <NavLinkWithImage  />
        }
        return null 
    }

    return (
        <div>

            <ImageComponent props={props} />
            <IconComponent props={props} />
            
            <ContentWithPaddings>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h2 className={classes.title}>{props.name}</h2>
                    {
                        user?.id != props.creatorId ? null: 
                            <NavLinkWithImage to={`${ApplicationUrl.Company.app.edit}${props.id}`} operationType={OperationType.edit} />
                    }
                    
                </div>
                <div className={classes.description}>{props.category}</div>
                <hr/>
                <div className={classes.foundationDate}>
                    Дата основания: <span>{props?.dateFoundation?.substring(0, 10)}</span>
                </div>
                <div className={classes.foundationDate}>
                    Регион: <span>{props.regionId}</span> 
                </div>
                <div className={classes.foundationDate}>
                    Сайт: <span>{props.uri ?? "-"}</span>
                </div>
                <div className={classes.foundationDate}>
                    Информация о предприятии: {props.description == null ? "" : "-"}
                </div>
                <div className={classes.foundationDate}>{props.description}</div>
                <hr/>
                <div className={classes.foundationDate}>
                    Создатель: <span>{props.creatorName}</span>
                </div>
                <div className={classes.foundationDate}>
                    Дата добавления: <span>{props?.dateCreatedArticle?.substring(0, 10)}</span>
                </div>
               
                
            </ContentWithPaddings>
                
            <MapOnPage props={props} />
         
               
          
        </div>
    );
}




const ImageComponent = (props) => {
    let image = !props.props.imageBytes ? "/emptyImageGray.jpg" : `data:image/png;base64,${props.props.imageBytes}`
    return <img src={image} style={{ height: "580px", width: "100%", }}/>
    //return <div style={{ backgroundImage: image, height: "580px", width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "50%", backgroundPositionY: "center" }} ></div>
};

const IconComponent = (props) => {

    return (
        <img
            style={{ position: "absolute", top: "10%", right: "45px", border: "1px black solid", borderRadius: "10px", backgroundColor: "white" }}
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
    let image = !props.props.iconBytes ? "/qualityMark.png" : `data:image/jpeg;base64,${props.props.iconBytes}`

    const _markers = [{
        position: {
            lng: props.props.altitude, lat: props.props.latitude
        },
        name: props.props.name,
        icon: image,
        companyId: props.props.id
    }]

    //useEffect(() => {
    //    const newMarkers = [props];
    //    if (mapRef && mapRef.current) {
    //        mapRef.current.setCompanies(newMarkers);
    //    }
    //}, [mapRef, props]);

    return <Map
        center={{
            lng: props.props.altitude, lat: props.props.latitude
        }}
        zoom={12}
        ref={mapRef}
        onRenderStart={() => setIsRender(true)}
        onRenderEnd={() => setIsRender(false)}
        scrollWheelZoom={false}
        isVisibleRegionBorders={false}
        companiess={[props, props, props]}
        markers={_markers} />
}


{/*{data.map((d, index) => {*/ }
{/*  const Component = components[d.type];*/ }
{/*  return <Component key={index} props={d} />;*/ }
{/*})}*/ }