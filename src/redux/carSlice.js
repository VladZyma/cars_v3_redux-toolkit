import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {carService} from "../service";

const getAllCars = createAsyncThunk(
    'carSlice/getAllCars',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAllCars(page);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.status);
        }
    }
);

const createCar = createAsyncThunk(
    'carSlice/createCar',
    async ({car}, {rejectWithValue}) => {
        try {
            const {data} = await carService.createCar(car);
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.message);
        }
    }
);

const updateCarById = createAsyncThunk(
    'carSlice/updateCarById',
    async ({id, car}, {rejectWithValue}) => {
        try {
            const {data} = await carService.updateCarById(id, car);
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.message);
        }
    }
);

const deleteCarById = createAsyncThunk(
    'carSlice/deleteCarById',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.deleteCarById(id);
        } catch (e) {
            return rejectWithValue(e.response?.message);
        }
    }
);

const addPhotoById = createAsyncThunk(
    'carSlice/addCarPhotoById',
    async ({id, formData}, {rejectWithValue}) => {
        try {
            const {data} = await carService.addCarPhotoById(id, formData);
            console.log('DATA:', data);
            return data;
        } catch (e) {
            return rejectWithValue(e.response?.message);
        }
    }
);

const initialState = {
    cars: {},
    carForUpdate: null,
    loading: false,
    error: null,
};

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.cars = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getAllCars.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(createCar.fulfilled, (state, action) => {
                state.cars.items.push(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(createCar.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCar.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(updateCarById.fulfilled, (state, action) => {
                const oldCar = state.cars.items.find(car => car.id === action.payload.id);
                Object.assign(oldCar, action.payload);

                state.loading = false;
                state.error = null;
            })
            .addCase(updateCarById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCarById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(deleteCarById.fulfilled, (state, action) => {
                const carIndex = state.cars.items.findIndex(car => car.id === action.payload);
                state.cars.items.splice(carIndex, 1);

                state.loading = false;
                state.error = null;
            })
            .addCase(deleteCarById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCarById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(addPhotoById.fulfilled, (state, action) => {
                const carToAddPhoto = state.cars.items.find(car => car.id === action.payload.id);
                Object.assign(carToAddPhoto, {...action.payload, photo: URL.createObjectURL(action.payload.photo)});

                state.loading = false;
                state.error = null;
            })
            .addCase(addPhotoById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPhotoById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
});

const {reducer: carReducer, actions: {setCarForUpdate}} = carSlice;
const carActions = {
    getAllCars,
    createCar,
    setCarForUpdate,
    updateCarById,
    deleteCarById,
    addPhotoById,
};

export {
    carReducer,
    carActions,
}