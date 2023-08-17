import { baseApi } from ".";
import { RouteConstants } from "../constants/routeConstants";

type LoginPayloadType = { username: string, password: string };

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
