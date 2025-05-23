import userService from "../../services/userService";
import { useState, useEffect } from "react";
import ApplicationUrl from "../../models/ApplicationUrl";

import FormContent from "../common/FormContent";
export default function EditUserFormByAdmin({ user, returnUrl, setError }) {

    const [roles, setRoles] = useState(user?.roles);

    async function UpdateRole(newUser) {
        try {
           
            await userService.editUserRole(newUser).then(async (data) => {
                window.location.href = ApplicationUrl.User.app.get + user.id;
            })
        } catch (error) {
            setError(error);
            return;
        }
    }

    const handleEditUserByAdmin = async () => {
        const newUser = {
            id: user.id,
            roles: roles
        };
        UpdateRole(newUser);   
        window.location.href = ApplicationUrl.User.app.get + user.id;

    }

    return <form style={{
        marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gridGap: "30px"
    }} onSubmit={handleEditUserByAdmin}>
        <div style={{ width:"100%" }}>
            Логин:
            <div>
                <input disabled value={user?.username} type="text"/>
            </div>
        </div>
        <div style={{ width: "100%" }}>
            Роль:
            <div class="styled-select" style={{ width: "100%" }}>
                <select onChange={(e) => {setRoles(e.target.value)}} value={roles} style={{ width: "100%" }}>
                    <option value="Administrator">Администратор</option>
                    <option value="User">Пользователь</option>
                </select>
            </div>
        </div>
        <button type="submit">Подтвердить</button>
    </form>
}