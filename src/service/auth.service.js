import {axiosService} from "./axios.service";
import {urls} from "../config";

const _accessTokenKey = 'accessTokenKey';
const _refreshTokenKey = 'refreshTokenKey';

const authService = {
    register: (user) => axiosService.post(urls.register, user),
    login: (user) => axiosService.post(urls.auth.login, user),
    refresh: (refresh) => axiosService.post(urls.auth.refresh, {refresh}),

    setAccessTokens: ({access, refresh}) => {
        localStorage.setItem(_accessTokenKey, access);
        localStorage.setItem(_refreshTokenKey, refresh);
    },
    getAccessTokenKey: () => {
        return localStorage.getItem(_accessTokenKey);
    },
    getRefreshTokenKey: () => {
        return localStorage.getItem(_refreshTokenKey);
    },
    deleteAccessTokens: () => {
        localStorage.removeItem(_accessTokenKey);
        localStorage.removeItem(_refreshTokenKey);
    },
};

export {authService}