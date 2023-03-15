import {axiosService} from "./axios.service";
import {urls} from "../config";

const carService = {
    createCar: (car) => axiosService.post(urls.cars, car),
    getAllCars: (page = 1) => axiosService.get(urls.cars, {params: {page, page_size: 6}}),
    getCarById: (id) => axiosService.get(`${urls.cars}/${id}`),
    updateCarById: (id, car) => axiosService.put(`${urls.cars}/${id}`, car),
    addCarPhotoById: (id, data) => axiosService.put(`${urls.cars}/${id}/photo`, data),
    deleteCarById: (id) => axiosService.delete(`${urls.cars}/${id}`),
};

export {carService}