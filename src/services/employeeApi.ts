import { baseApi } from ".";
import { EmployeeResponseType } from "../types/EmployeeResponseType";

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeList: builder.query<EmployeeResponseType, void>({
            query: () => '/employees',
            providesTags: []
        })
    })
});

export const { useGetEmployeeListQuery } = employeeApi;
