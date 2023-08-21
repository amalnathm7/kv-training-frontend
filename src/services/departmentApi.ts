import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { DepartmentType } from '../types/DepartmentType';
import { ResponseType } from '../types/ResponseType';

export const departmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartmentList: builder.query<ResponseType<DepartmentType[]>, void>({
      query: () => `${RouteConstants.departmentApi}`,
      providesTags: []
    })
  })
});

export const { useGetDepartmentListQuery } = departmentApi;
