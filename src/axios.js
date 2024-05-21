import axios from "axios";
import config from "./config";

const instance = axios.create({
    baseURL: `${config.BASE_URL}/api/`
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
});


export default instance;