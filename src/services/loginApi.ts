import { baseApi } from ".";

type LoginPayloadType = { username: string, password: string };

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: LoginPayloadType) => ({
                url: '/employees/login',
                method: 'POST',
                body
            })
        })
    })
});

export const { useLoginMutation } = loginApi;
