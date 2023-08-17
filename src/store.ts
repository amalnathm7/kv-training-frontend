import { configureStore } from "@reduxjs/toolkit";
import { employeeApi } from "./services/employeeApi";

const store = configureStore({
    reducer: {
        [employeeApi.reducerPath]: employeeApi.reducer
    },
    middleware: (getDefaultMiddleware) => ([...getDefaultMiddleware(), employeeApi.middleware])
});

export default store;
