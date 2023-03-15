import axios from 'axios';
import {createBrowserHistory} from 'history';

import {baseURL} from "../config";
import {authService} from "./auth.service";

let isRefreshing = false;
const history = createBrowserHistory();

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use((config) => {
    const access = authService.getAccessTokenKey();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
});

axiosService.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const refresh = authService.getRefreshTokenKey();

    if (error.response?.status === 401 && refresh && !isRefreshing) {
        isRefreshing = true;

        try {
            const {data} = await authService.refresh(refresh);
            authService.setAccessTokens(data);
        } catch (e) {
            authService.deleteAccessTokens();
            history.replace('/login?expSession=true');
        }

        isRefreshing = false;
        return axiosService(error.config);
    }

    return Promise.reject(error);
});


export {axiosService, history}