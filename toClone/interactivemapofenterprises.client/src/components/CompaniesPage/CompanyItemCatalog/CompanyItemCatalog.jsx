import ButtonIcon from "../../Common/Buttons/ButtonIcon";
import classes from "./CompanyItemCatalog.module.css";
import authService from "../../../services/authService";
import { useState,useEffect, useContext } from "react";
import ApplicationUrl from "../../../models/ApplicationUrl";

const openIcon = "/open.svg";
const editIcon = "/edit.svg";
const deleteIcon = "/delete.svg";


import ListItem from "../../common/ListItem/ListItem";
import ListItemActions from "../../common/ListItem/ListItemActions";

import UserContext from "../../../context/UserContext";
import FitImage from "../../common/FitImage";

function CompanyItemCatalog({ data, onOpen, onEdit, onDelete, withBtnActions, withOpenByItem , withImage }) {

    //const [curUser, setCurUser] = useState({ roles: localStorage.getItem("Roles"), id: localStorage.getItem("UserId") });
    
    //useEffect(() => {

    //    async function getUser() {
    //        await authService.getCurrentUser().then((data) => {
    //            setCurUser(data);
    //        })
    //    }
    //    getUser();
    //})

    const curUser = useContext(UserContext).user;

    const isCanEditAndDelete =
        (curUser?.roles == "Administrator" || curUser?.id == data.creatorId);

    function editAction() {
        if (curUser?.roles == "Administrator" || curUser?.id == data.creatorId) {
            onEdit();
            return;
        };       
        return null;
        
    }

    function deleteAction() {
        if (curUser?.roles == "Administrator" || curUser?.id == data.creatorId) {
            onDelete();
            return;
        }
        return null;
    }

    return (
        <ListItem onClick={() => {
            withOpenByItem ? onOpen(data?.id) : null
        }} >

            <div className="flexContent">
                {withImage ? 
                    (<div>
                        <FitImage imageBytes={data.imageBytes} height={"70px"} width={"120px"} />
                    </div>)
                    : null
                }
               
                <div >
                    <p className={classes.name}  >{data.name}</p>
                    <p style={{ fontSize: "15px" }}>{data.category}</p>
                </div>
            </div>
            <ListItemActions openHandler={() => { onOpen(data?.id) }}
                editHandler={editAction}
                deleteHandler={deleteAction}
                isCanEdit={withBtnActions ?? isCanEditAndDelete} />
         
      </ListItem>
  );
}

export default CompanyItemCatalog;
