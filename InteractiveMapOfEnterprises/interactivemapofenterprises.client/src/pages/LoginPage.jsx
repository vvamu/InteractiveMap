import React, { useState, useContext } from 'react';
import authService from '../services/authService';
import useCookieHandler from '../services/useCookieHandler';
import ContentWithPaddings from '../components/common/ContentWithPaddings';
import FormContent from '../components/common/FormContent';

import useLocationChangeLogger from "../hooks/useLocationChangeLogger";


const LoginPage = ({ changeUser }) => {
    const { handleCookie } = useCookieHandler();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Update to use a single error state



    const handleLogin = async (e) => {
        e.preventDefault();

        
        isValid();
        try {
            await authService.login({ username, password }, handleCookie);
            changeUser();
            document.location = "/";
        } catch (error) {
            setError(error);
        }
        
    };

    function isValid() {
        try {
            if (username == null || username === "") throw new Error("Логин не может быть пустым");
            if (password == null || password === "") throw new Error("Пароль не может быть пустым");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <FormContent>
            <h2>Войти</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
            <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
                <div>
                    Логин:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div style={{ marginTop: "20px" }}>
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div style={{ marginTop: "20px" }} className="flexContent">
                    <button type="submit">Войти</button>
                </div>
            </form>
        </FormContent>
    );
};

export default LoginPage;