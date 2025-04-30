import axios from "axios";
import MAP from "./../constants/map";

const mapDataService = {
  getStartMapData: async () => {
    let responceAllData;
    try {
        let url = "http://localhost:5094/geo/belarus";
        responceAllData = await axios.get(url);
        return JSON.parse(JSON.stringify(responceAllData.data));
    } catch (error) {
        console.error("Ошибка при получении данных карты:", error);
        throw error;
    }
  },
  getMapDataById: async (id) => {
    try {
      let city = MAP[id].url.split("/").pop();
      let url = "http://localhost:5094/geo/" + city;
      const response = await axios.get(url);
      return JSON.parse(JSON.stringify(response.data));
    } catch (error) {
      console.error("Ошибка при получении данных карты:", error);
      throw error;
    }
  },
};

export default mapDataService;
