import axios from 'axios';

import { api_url } from "./../../config";
const urlUser = api_url + "users/"

const userService = {
    create: async (user,isSoftDelete) => {
        try {
            const formData = new FormData();

            let jsonData = JSON.stringify({ data: user })
            formData.append("jsonData", jsonData);

            const response = await axios.post(`${urlUser}create`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    deleteAsync: async (userId, isSoft = true) => {
        try {
            const response = await
                axios(`${urlUser}delete/${userId}`, {
                    method: "post",
                    data: { isSoft: false },
                    withCredentials: true
                });

                //axios.post(`${urlUser}delete/${userId}?isSoft=${isSoft}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    getAll: async () => {
        try {
            const response = await axios.get(`${urlUser}`);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    get: async (id) => {
        try {
            const response = await axios.get(`${urlUser}${id}` );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    editUserRole: async (user) => {
        try {
            const formData = new FormData();

            let jsonData = JSON.stringify({ data: user })
            formData.append("jsonData", jsonData);

            const response = await axios.put(`${urlUser}editAdmin`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });
          

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    editUser: async (user) => {
        try {
            const formData = new FormData();

            let jsonData = JSON.stringify({ data: user })
            formData.append("jsonData", jsonData);

            const response = await axios.put(`${urlUser}edit`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default userService;