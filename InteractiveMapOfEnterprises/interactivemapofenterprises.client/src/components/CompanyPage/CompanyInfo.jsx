const deleteIcon = "/delete.svg";
import classes from "./CompanyInfo.module.css";
import { React, useRef, useState, useEffect, useContext } from "react";
import "leaflet/dist/leaflet.css";
import Map from "../MapPage/Map/Map";

import authService from "../../services/authService";


import ContentWithPaddings from "../common/ContentWithPaddings";
import AutoResizeTextArea from "../EditCompanyPage/AutoResizeTextArea";
import ActionConfirmationBox from "../common/InfoBoxs/ActionConfirmationBox";
import companiesService from "../../services/companiesService";
import LoaderBox from "../common/InfoBoxs/LoaderBox";

import ComponentHeader from "./ComponentHeader";
import ComponentAbout from "./ComponentAbout";
import ComponentMap from "./ComponentMap";
import ComponentAuthor from "./ComponentAuthor";
import ComponentMainInfo from "./ComponentMainInfo";

import ComponentIcon from "./ComponentIcon";
import { getBackgroundUrl } from "./getBackgroundUrl";

import ApplicationUrl from "../../models/ApplicationUrl";
import UserContext from "../../context/UserContext";
function CompanyInfo({ data, setIsActiveLoader, isActiveLoader }) {
    return !data ? null : <MinimalInfoAboutCompony props={data} setIsActiveLoader={setIsActiveLoader} isActiveLoader={isActiveLoader} />;
}
export default CompanyInfo;

function MinimalInfoAboutCompony({ props, setIsActiveLoader, isActiveLoader }) {

    const curUser = useContext(UserContext).user;


    const [isActiveDeleteConfirmationBox, setIsActiveDeleteConfirmationBox] =useState(false);
    const [messageActionConfirmation, setMessageActionConfirmation] =useState(undefined);
    const [messageLoader, setMessageLoader] = useState(undefined);

    const handleDelete = async (id) => {

        try {

            companiesService.deleteAsync(id);
        }
        catch {}
        finally {
            document.location = ApplicationUrl.User.app.get + curUser.id;
        }

    };

    
    useEffect(() => {
            setTimeout(() => setIsActiveLoader(false), 1000);
    }, []);

    return (
        <div>
            <LoaderBox active={isActiveLoader} />
            <ActionConfirmationBox active={isActiveDeleteConfirmationBox} message={`Удалить ${props.name}?`}
                onConfirm={() => { handleDelete(props.id) }}
                onCancel={() => { setIsActiveDeleteConfirmationBox(false) }} />

           
            <ComponentHeader props={props} user={curUser} getBackgroundUrl={getBackgroundUrl}
                setIsActiveDeleteConfirmationBox={setIsActiveDeleteConfirmationBox} />
            <ComponentAbout props={props} />
            <ComponentIcon props={props} />
            <ComponentMainInfo props={props}/>  
            <ComponentMap props={props} />
            <ComponentAuthor props={props} />
           
        </div>
    );
}




