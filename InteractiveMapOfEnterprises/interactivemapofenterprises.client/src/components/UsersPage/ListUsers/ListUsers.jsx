
import { useEffect, useState, useContext } from "react";

import LoaderBox from "../../common/InfoBoxs/LoaderBox";
import ListUser from "../ListUser/ListUser";
import userService from "../../../services/userService";
import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox"
import UserContext from "../../../context/UserContext";
import ApplicationUrl from "../../../models/ApplicationUrl";

const ListUsers = ({ setCountUsers }) => {

    const [users, setUsers] = useState([]);
    const [isEditUser, setEditUser] = useState([]);
    const [isActiveLoader, setIsActiveLoader] = useState(false);
    const [messageLoader, setMessageLoader] = useState(undefined);
    const [isActiveDeleteConfirmationBox, setIsActiveDeleteConfirmationBox] = useState(false);
    const curUser = useContext(UserContext).user;



    useEffect(() => {
        onActiveLoader("Загрузка...");
        userService.getAll().then((data) => {
            setUsers(data);
            setCountUsers(data.length)
            setTimeout(() => onCloseLoader(), 1000);
        });
    }, [isEditUser]);





    const onActiveLoader = (message) => {
        setIsActiveLoader(true);
        setMessageLoader(message);
    };

    const onCloseLoader = () => {
        setIsActiveLoader(false);
        setMessageLoader(undefined);
    };

    const deleteAsync = async (userId) => {


        if (curUser?.roles != "Administrator" && curUser?.id != userId) return null;


        try {
            let res = await userService.deleteAsync(userId, false);
            document.location = ApplicationUrl.User.app.get;
        }
        catch (ex) {
            document.location = ApplicationUrl.User.app.get;
        }

    };

    return (
        <div >

          

            {users.map((user, index) => (
                <>
                    <ActionConfirmationBox active={isActiveDeleteConfirmationBox} message={`Удалить ${user.name}?`} onConfirm={() => {
                        deleteAsync(user.id)
                }} onCancel={() => { setIsActiveDeleteConfirmationBox(false) }} />

                
                    <ListUser key={index} data={user} setEditUser={setEditUser}
                        deleteAsync={() => { setIsActiveDeleteConfirmationBox(true) }} />
                </>
            ))}
            <LoaderBox active={isActiveLoader}>
                <p>{messageLoader}</p>
            </LoaderBox>
        </div>
    );
}

export default ListUsers;
