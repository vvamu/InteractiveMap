import axios from 'axios';
import { api_url } from "./../../config";

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
            //localStorage.setItem("UserId", token);

            //if (token) {
            //    axios.defaults.headers.common["Authorization"] = `${token}`;
            //}

        } catch (error) {
            return null;
        }
    },

    logout: async (cookieHandler) => {
        try {
            //const response = await axios.post(`${urlAuth}logout`);
            //axios.defaults.headers.common["Authorization"] = ``;
            //return response.data;

            cookieHandler({ cookieName: 'UserId', isRemove : true });
           
        } catch (error) {
            throw error.response.data;
        }
    },

    getCurrentUser: async () => {
        try {
            //let token = localStorage.getItem("UserId");
            //axios.defaults.headers.common["Authorization"] = token;

            const response = await axios.get(`${urlAuth}currentuser`, { withCredentials: true });
            return JSON.parse(response.data);
        } catch (error) {
            //throw error.message;
            console.log(error)
            return (null);
        }
    }
};



export default authService;