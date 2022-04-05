import axios from "axios";

const BASE_URL = `https://restcountries.com/v2/`;
const REQUEST_TIMEOUT = 5000;

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": `application/json`,
    },
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export default createAPI;
