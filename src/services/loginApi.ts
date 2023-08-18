import { baseApi } from "./baseApi";
import { RouteConstants } from "../constants/routeConstants";

type LoginPayloadType = { email: string, password: string };

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginPayloadType) => ({
                url: `${RouteConstants.loginApi}`,
                method: 'POST',
                body
            })
        })
    })
});

export const { useLoginMutation } = loginApi;
