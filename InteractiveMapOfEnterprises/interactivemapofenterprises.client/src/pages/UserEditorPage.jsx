import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userService  from '../services/userService';
import authService from '../services/authService';

import FormContent from '../components/common/FormContent';
import EditUserFormByAdmin from '../components/UserEditorPage/EditUserFormByAdmin';
import EditUserForm from '../components/UserEditorPage/EditUserForm';

import { useParams } from 'react-router-dom';

export default function UserEditorPage() {
    const { id } = useParams();
    const [returnUrl, setReturnUrl] = useState('');
    const [user, setUser] = useState(null); // Declare user state first

    const [error, setError] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = id ?? urlParams.get('id');
        const returnUrlParam = urlParams.get('returnUrl');
        if (idParam!=null) {
            userService.get(idParam).then((data) => {
                setUser(data)
            });
        }
        setReturnUrl(decodeURIComponent(returnUrlParam));
    }, []);


    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        async function getCurUser() {
            try {
                var res = await authService.getCurrentUser();
                setCurrentUser(res);
            }
            catch (ex) {
               
            }

        }
        getCurUser();
        
    }, [])


    return (
        <FormContent backgroundImage={"url(/createUserImage.jpg)"}>
            <h2>{!user ? "Создать" : "Редактировать"} пользователя</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {currentUser?.roles == "Administrator" && currentUser?.id != user?.id ? 
                <EditUserFormByAdmin user={user} returnUrl={returnUrl}  setError={setError} />
                :
                <EditUserForm user={user} returnUrl={window.location.href} setError={setError} />
            }
           
        </FormContent>
    );
};

