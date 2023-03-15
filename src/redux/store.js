import {configureStore, combineReducers} from '@reduxjs/toolkit';

import {carReducer} from "./carSlice";

const rootReducer = combineReducers({
    carReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {setupStore}