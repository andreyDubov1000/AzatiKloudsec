import axios from "axios";

export const initializeAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.defaults.headers.common = {
    "x-api-key": process.env.REACT_APP_X_API_KEY,
  };
};

export default axios;
