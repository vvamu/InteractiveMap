import axios from "axios";

const PRE = "COMPANIES";

import { api_url } from "./../../config";
const company_url = api_url + "company";

const companiesService = {
    
    get: async (id) => {
        try {
            var response = (await axios.get(company_url + "/" + id))
            return response.data;//.data.json();//JSON.parse(response.data);
        } catch (error) {
            console.error(`[${PRE}] - Ошибка при получения предприятия:`, error);
        }
    },
    getAll: async () => {
        try {          
            const response = (await axios.get(company_url)).data;
            return JSON.parse(response);
        } catch (error) {
            console.error(`[${PRE}] - При получении всех предприятий произлоша ошибка:`,error);
        }
    },
    getByRegion: async (regionId) => {
        try {
            var response = (await axios.get(company_url + "/region/" + regionId)).data;
            return JSON.parse(response);//.data.json();//JSON.parse(response.data);
        } catch (error) {console.error(`[${PRE}] - Ошибка при получения предприятий по региону. `, error);
        }
    },

    getByUser: async (userId) => {
        try {
            var response = (await axios.get(company_url + "/user/" + userId)).data;
            return response;//.data.json();//JSON.parse(response.data);
        } catch (error) {
            console.error(`[${PRE}] - Ошибка при получения предприятий по региону. `, error);
        }
    },
    //RENAME TO getByPage
    getPage: async (num, countElem) => {
        try {
            const startIndex = (num - 1) * countElem;
            const endIndex = num * countElem;

            const response = (await axios.get(company_url)).data;
            return JSON.parse(response);
        } catch (error) {
            console.error(
                `[${PRE}] - Ошибка при получении предприятий страницы под номером ${num}:`,
                error
            );
        }
    },
    getTotalPages: async (countElem) => {
        try {
            //return Math.ceil(MOCK_COMPANIES.length / countElem);
            return 1;
        } catch (error) {
            console.error(`[${PRE}] - При получении кол-во страниц произлоша ошибка:`, error);
        }
    },

    create: async (data) => {

        try {
            const formData = new FormData();
            let _iconFormFile = "";
            let _imageFormFiles = []

            const traverseObject = (obj, parentKey = "") => {
                for (const key in obj) {
                    const fullPath = parentKey ? `${parentKey}.${key}` : key;
                    if (key == 'iconFormFile') {
                        formData.append("iconFormFile", obj[key]);
                        _iconFormFile = fullPath;
                        //_iconFormFile = obj[key]; continue;
                    }
                    if (key == 'imageFormFile') {
                        formData.append("imageFormFiles", obj[key]);
                        _imageFormFiles.push(fullPath);
                    }

                    if (obj[key] instanceof File) {
                        ////formData.append("imageFormFiles", obj[key]);
                        //imageFormFiles.push(fullPath);
                        //obj[key] = "";
                    } else if (typeof obj[key] === "object" && obj[key] !== null) {
                        traverseObject(obj[key], fullPath);
                    }
                }
            };

            traverseObject(data);

            let jsonData = JSON.stringify(
                {
                    props: { imageFormFiles: _imageFormFiles, iconFormFile: _iconFormFile },
                    data: data,
                })
            formData.append("jsonData", jsonData);

            const response = await axios.post(company_url, formData,
                { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
            );
            return response.data;

        } catch (error) {
            throw error.response.data;

        }
    },
    deleteAsync: async (id) => {
        try {
            let url = company_url + "/delete/" +id;
            var response = (await axios.post(url))
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
};

export default companiesService;
