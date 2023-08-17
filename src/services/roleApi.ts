import { baseApi } from ".";
import { RouteConstants } from "../constants/routeConstants";
import { ResponseType } from "../types/ResponseType";
import { RoleType } from "../types/RoleType";

export const roleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRoleList: builder.query<ResponseType<RoleType[]>, void>({
            query: () => `${RouteConstants.roleApi}`,
            providesTags: []
        })
    })
});

export const { useGetRoleListQuery } = roleApi;
