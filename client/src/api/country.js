import axios from 'axios';
import { BASE_URL, LOCAL_STORAGE_KEY } from '../constant';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).token}`;
    }
    return req;
});

export const searchCountry = (name) => API.get(`/api/country/${name}`)

