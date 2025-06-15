import axios from 'axios';
import { api_url } from "./../../config";
import userService from './userService';

const urlAuth = api_url + "auth/"



const authService = {
    

    login: async (loginUser, cookieHandler) => {

        try {

            const formData = new FormData();
            let jsonData = JSON.stringify({ data: loginUser })
            formData.append("jsonData", jsonData);

            const response = await axios.post(`${urlAuth}login`, formData,
                { headers: { "Content-Type": "multipart/form-data" } });
            let token = response.data;
            cookieHandler({ cookieName: 'UserId', cookieValue: token });

           
            return token;
            

            //if (token) {
            //    axios.defaults.headers.common["Authorization"] = `${token}`;
            //}

        } catch (error) {
            throw error.response.data;
        }
    },

    logout: async (cookieHandler) => {
        try {
            //const response = await axios.post(`${urlAuth}logout`);
            //axios.defaults.headers.common["Authorization"] = ``;
            //return response.data;


            localStorage.clear();
            cookieHandler({ cookieName: 'UserId', isRemove : true });
           
        } catch (error) {
            throw error.response.data;
        }
    },

    getCurrentUser: async () => {
        try {
            //let token = localStorage.getItem("UserId");
            //axios.defaults.headers.common["Authorization"] = token;

            let roles = localStorage.getItem("Roles")
            //let isInRole = roles == "Administrator" || roles == "User"
            //if (isInRole) return;
            
            const response = await axios.get(`${urlAuth}currentuser`, { withCredentials: true });
            let result = JSON.parse(response.data);
            //localStorage.setItem("Roles", result?.roles);
            //localStorage.setItem("UserId", result?.id);

            return result;
        } catch (error) {
            //throw error.message;
            console.log(error)
            throw error?.response?.data ?? "";
        }
    }
};



export default authService;