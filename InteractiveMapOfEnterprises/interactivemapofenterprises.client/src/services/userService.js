import axios from 'axios';

import { api_url } from "./../../config";
const urlUser = api_url + "users/"

const userService = {
    create: async (user) => {
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
    deleteUser: async (userId, isSoft = true) => {
        try {
            const response = await axios.post(`${urlUser}delete/${userId}?isSoft=${isSoft}`);
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