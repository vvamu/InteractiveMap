
import { useState, useEffect } from "react";

import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox";
import userService from "../../../services/userService";
import ApplicationUrl from "../../../models/ApplicationUrl";
import authService from "../../../services/authService";

import ListItem from "../../common/ListItem/ListItem";
import ListItemActions from "../../common/ListItem/ListItemActions";



const ListUser = ({ data, setEditUser, deleteAsync }) => {
    const [curUser, setCurUser] = useState(null);


    useEffect(() => {
        async function getCurUser() {
            try {
                var res = await authService.getCurrentUser();
                setCurUser(res);
            }
            catch (ex) {

            }
        }
        getCurUser();

    }, [])


    const handleOpen = () => document.location = ApplicationUrl.User.app.get + data.id;

    const editAsync = () => {

        if (curUser?.roles == "Administrator" || curUser?.id == data.id) {
            document.location = "/users/edit/" + data.id;
            return;
        };
        return null;
    }

    const isCanEditAndDelete =
        (curUser?.roles == "Administrator" || curUser?.id == data.id);
    

    return (

        <ListItem>
            <div className="flexContent">
                {data.roles == "Administrator"
                    ?
                    <svg width={"20px"} fill="#ffffff" viewBox="-64 -64 768.00 768.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-64" y="-64" width="768.00" height="768.00" rx="384" fill="#000000" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"></path></g></svg>
                    :
                    <svg width={"25px"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9ZM12 20.5C13.784 20.5 15.4397 19.9504 16.8069 19.0112C17.4108 18.5964 17.6688 17.8062 17.3178 17.1632C16.59 15.8303 15.0902 15 11.9999 15C8.90969 15 7.40997 15.8302 6.68214 17.1632C6.33105 17.8062 6.5891 18.5963 7.19296 19.0111C8.56018 19.9503 10.2159 20.5 12 20.5Z" fill="#1C274C"></path> </g></svg>

                }
                {data.username}
            </div>
            <ListItemActions openHandler={handleOpen}
                editHandler={editAsync}
                deleteHandler={deleteAsync}
                isCanEdit={isCanEditAndDelete}
            />
        </ListItem>
    );
}
export default ListUser;