const baseURL = process.env.REACT_APP_API;

const urls = {
    register: '/users',
    auth: {
        login: '/auth',
        refresh: '/auth/refresh'
    },
    cars: '/cars',
};

export {
    baseURL,
    urls,
}