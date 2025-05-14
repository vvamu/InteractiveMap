import React, { useState } from 'react';
import axios from 'axios';
import userService  from '../services/userService';
import authService from '../services/authService';

const CreateUserPage = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            const newUser = {
                username,
                name,
                password
            };
            await userService.create(newUser).then(async () => {
                await authService.login({ username, password }).then(() => { document.location = `/` });
            })
        } catch (error) {
            setError(error);
        }
    };


    return (
        <div>
            <h2>Create User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleCreateUser}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUserPage;