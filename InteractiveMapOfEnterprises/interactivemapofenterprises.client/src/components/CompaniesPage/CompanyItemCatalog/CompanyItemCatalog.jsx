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

import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";

function CompanyItemCatalog({ data, onOpen, onEdit, onDelete, withBtnActions, withOpenByItem, withImage, setErrorMessages }) {
    const curUser = useContext(UserContext).user;
    const [isActiveDeleteConfirmationBox, setIsActiveDeleteConfirmationBox] = useState(false);



    const isCanEditAndDelete = (curUser?.roles == "Administrator" || curUser?.id == data.creatorId);

    function editAction() {
        if (curUser?.roles == "Administrator" || curUser?.id == data.creatorId) {
            onEdit();
            return;
        };       
        return null;
        
    }

    function deleteAction(userId) {
        if (curUser?.roles == "Administrator" || curUser?.id == data.creatorId) {
            onDelete(userId);
            return;
        }
        let error = { message: "Компанию не может удалить пользователь, не являющийся создателем или администратором" };
        setErrorMessagesList(...[error]) 
    }



    return (
        <>
            <ActionConfirmationBox active={isActiveDeleteConfirmationBox} message={`Удалить ${data.name}?`}
                onConfirm={() => { deleteAction(data.id) }}
                onCancel={() => { setIsActiveDeleteConfirmationBox(false) }} />

          

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
                    deleteHandler={() => { setIsActiveDeleteConfirmationBox(true)} }
                    isCanEdit={withBtnActions ?? isCanEditAndDelete} />

            </ListItem>
        </>
        
  );
}

export default CompanyItemCatalog;
