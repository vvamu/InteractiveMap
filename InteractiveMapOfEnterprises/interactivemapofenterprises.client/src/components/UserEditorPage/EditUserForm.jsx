import userService from "../../services/userService";
import authService from "../../services/authService";
import { useEffect, useState } from "react";

import ApplicationUrl from "../../models/ApplicationUrl";
import useCookieHandler from "../../services/useCookieHandler";
export default function EditUserForm({ user, returnUrl, setError }) {
    const { handleCookie } = useCookieHandler();

    const [username, setUsername] = useState(user?.username);
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(null);

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                id: user?.id ?? null,
                username : username ?? user?.username,
                name : name ?? user?.name, 
                password
            };
            isValid()
       
            if (newUser.id == null)
                await createUser(newUser);
            else
                await editUser(newUser);
        } catch (ex) {
            setError(ex?.message ?? ex)
        }
    };

    async function createUser(newUser) {
        await userService.create(newUser).then(async (data) => {
            await authService.login({ username, password }, handleCookie).then((token) => {
                document.location = token ? ApplicationUrl.User.app.get + token : `/`
            }
            );
        })
    }
    async function editUser(newUser) {
        await userService.editUser(newUser).then(async () => {
            document.location = user.id ? ApplicationUrl.User.app.get + user.id : `/`
        })
    }

    

    useEffect(() => {
        setUsername(user?.username);
        setName(user?.name)
    },[])

    function isValid() {
        let usernameCheck = username ?? user?.username;
        
        if (usernameCheck == null || usernameCheck === "") throw new Error("Логин не может быть пустым");
        if (password == null || password === "") throw new Error("Пароль не может быть пустым");
    }



    return <form onSubmit={handleCreateUser}
        style={{
            marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gridGap: "10px"
        }}>
        <label style={{width:"100%"}}>
            Логин*:
            <input type="text" value={username ?? user?.username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label style={{ width: "100%" }}>
            Имя:
            <input type="text" value={name ?? user?.name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label style={{ width: "100%" }}>
            Пароль*:
            <input type="password"  onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Подтвердить</button>
    </form>
}