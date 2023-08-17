import { baseApi } from ".";
import { GET_EMPLOYEE_LIST } from "../constants/apiConstants";
import { RouteConstants } from "../constants/routeConstants";
import { EmployeeType } from "../types/EmployeeType";
import { ResponseType } from "../types/ResponseType";

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEmployeeList: builder.query<ResponseType<EmployeeType[]>, void>({
            query: () => `${RouteConstants.employeeApi}`,
            providesTags: [GET_EMPLOYEE_LIST]
        }),
        getEmployeeById: builder.query<ResponseType<EmployeeType>, string>({
            query: (id) => `${RouteConstants.employeeApi}/${id}`
        }),
        createEmployee: builder.mutation<ResponseType<EmployeeType>, EmployeeType>({
            query: (body) => ({
                url: `${RouteConstants.employeeApi}`,
                method: 'POST',
                body
            })
        }),
        updateEmployee: builder.mutation<Object, { id: string, employee: EmployeeType }>({
            query: (params) => ({
                url: `${RouteConstants.employeeApi}/${params.id}`,
                method: 'PATCH',
                body: params.employee
            })
        }),
        deleteEmployee: builder.mutation<Object, string>({
            query: (id) => ({
                url: `${RouteConstants.employeeApi}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [GET_EMPLOYEE_LIST]
        })
    })
});

export const { useGetEmployeeListQuery, useGetEmployeeByIdQuery, useCreateEmployeeMutation,
    useUpdateEmployeeMutation, useDeleteEmployeeMutation } = employeeApi;