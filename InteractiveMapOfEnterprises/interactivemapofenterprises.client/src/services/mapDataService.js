import axios from "axios";
import MAP from "./../constants/map";

import { api_url } from "./../../config";
const get_belarus_url = api_url + "geo/belarus"
const get_city_url = api_url + "geo";


const mapDataService = {
    getStartMapData: async () => {
        let responceAllData;
        try {
            responceAllData = await axios.get(get_belarus_url);
            return JSON.parse(JSON.stringify(responceAllData.data));
        } catch (error) {
            console.error("Ошибка при получении данных карты:", error);
            throw error;
        }
    },
    getMapDataById: async (id) => {
        try {
            let city = MAP[id].url.split("/").pop();
            let url = get_city_url + "/" + city;
            const response = await axios.get(url);
            return JSON.parse(JSON.stringify(response.data));
        } catch (error) {
            console.error("Ошибка при получении данных карты:", error);
            throw error;
        }
    },
};

export default mapDataService;
