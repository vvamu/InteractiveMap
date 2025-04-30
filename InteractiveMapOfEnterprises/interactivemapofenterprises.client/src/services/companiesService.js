import axios from "axios";

const PRE = "COMPANIES";

const companiesService = {
  create: async (data) => {
    try {
      const formData = new FormData();
      const filesPath = [];

      const traverseObject = (obj, parentKey = "") => {
        for (const key in obj) {
          const fullPath = parentKey ? `${parentKey}.${key}` : key;
          if (obj[key] instanceof File) {
            formData.append("files", obj[key]);
            filesPath.push(fullPath);
            obj[key] = "";
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            traverseObject(obj[key], fullPath);
          }
        }
      };

      traverseObject(data);

      formData.append(
        "jsonData",
        JSON.stringify({
          props: {
            filesPath: filesPath,
          },
          data: data,
        })
      );

      const response = await axios.post(`/api/company/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
    } catch (error) {
      console.error(`[${PRE}] - При сохранении произошла ошибка:`, error);
      return false;
    }
  },
  get: async (id) => {
    try {
      return JSON.parse((await axios.get(`/api/company/get/${id}`)).data);
    } catch (error) {
      console.error(`[${PRE}] - Ошибка при получения предприятия:`, error);
    }
  },
  getTotalPages: async (countElem) => {
    try {
      //return Math.ceil(MOCK_COMPANIES.length / countElem);
      return 1;
    } catch (error) {
      console.error(
        `[${PRE}] - При получении кол-во страниц произлоша ошибка:`,
        error
      );
    }
  },
  getPage: async (num, countElem) => {
    try {
      const startIndex = (num - 1) * countElem;
      const endIndex = num * countElem;

      const response = (await axios.get("/api/company/get")).data;
      return JSON.parse(response);
    } catch (error) {
      console.error(
        `[${PRE}] - Ошибка при получении страницы предприятий под номером ${num}:`,
        error
      );
    }
  },
  delete: async (id) => {
    try {
      await axios.delete(`/api/company/${id}`)
    } catch (error) {
      console.error(`[${PRE}] - Ошибка при удалении предприятия:`, error);
    }
  },
};

export default companiesService;
