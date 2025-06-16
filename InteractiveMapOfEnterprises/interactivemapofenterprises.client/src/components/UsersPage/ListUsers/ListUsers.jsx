
import { useEffect, useState, useContext } from "react";

import LoaderBox from "../../common/InfoBoxs/LoaderBox";
import ListUser from "../ListUser/ListUser";
import userService from "../../../services/userService";
import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox"
import UserContext from "../../../context/UserContext";
import ApplicationUrl from "../../../models/ApplicationUrl";
import ErrorBox from "../../common/InfoBoxs/ErrorBox";

const ListUsers = ({ setCountUsers, setErrorMessages ,children}) => {

    const [users, setUsers] = useState([]);
    const [isEditUser, setEditUser] = useState([]);
    const [isActiveLoader, setIsActiveLoader] = useState(false);
    const [messageLoader, setMessageLoader] = useState(undefined);
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
            let error = { message: `${ex}` };
            let errors = [error]
            setErrorMessages(errors) 
            //document.location = ApplicationUrl.User.app.get;
        }

    };

    return (
        <div >
            {users.map((user, index) => (
                <>
                    <ListUser key={index} data={user} setEditUser={setEditUser}
                        deleteAsync={(userId) => { deleteAsync(userId) }}>
                    </ListUser>
                </>
            ))}
            <LoaderBox active={isActiveLoader}>
                <p>{messageLoader}</p>
            </LoaderBox>
        </div>
    );
}

export default ListUsers;
