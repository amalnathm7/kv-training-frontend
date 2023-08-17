import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_BASE_URL, GET_EMPLOYEE_LIST } from "../constants/apiConstants";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');

            const token = localStorage.getItem('token');

            if (token)
                headers.set('Authorization', `Bearer ${token}`);

            return headers;
        }
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: () => ({}),
    tagTypes: [GET_EMPLOYEE_LIST]
});
