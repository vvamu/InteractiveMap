
import { useEffect, useState } from "react";

import LoaderBox from "../../common/InfoBoxs/LoaderBox";
import ListUser from "../ListUser/ListUser";
import userService from "../../../services/userService";
import ActionConfirmationBox from "../../common/InfoBoxs/ActionConfirmationBox";

const ListUsers = () => {

    const [users, setUsers] = useState([]);
    const [isEditUser, setEditUser] = useState([]);
    const [isActiveLoader, setIsActiveLoader] = useState(false);
    const [messageLoader, setMessageLoader] = useState(undefined);



    useEffect(() => {
        onActiveLoader("Загрузка...");
        userService.getAll().then((data) => {
            setUsers(data);
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

    return (
        <div>
            {users.map((user, index) => (
                <ListUser key={index} data={user} setEditUser={setEditUser} />
            ))}
            <LoaderBox active={isActiveLoader}>
                <p>{messageLoader}</p>
            </LoaderBox>
        </div>
    );
}

export default ListUsers;
