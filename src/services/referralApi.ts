import { ResponseType } from "../types/ResponseType";
import { baseApi } from "./baseApi";
import { RouteConstants } from "../constants/routeConstants";
import { ReferralType } from "../types/ReferralType";

export const ReferralApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReferral: builder.mutation<ResponseType<ReferralType>, ReferralType>({
            query: (body) => ({
                url: `${RouteConstants.referralApi}`,
                method: 'POST',
                body
            })
        }),
        updateReferral: builder.mutation<Object, { id: string, referral: ReferralType }>({
            query: (params) => ({
                url: `${RouteConstants.referralApi}/${params.id}`,
                method: 'PATCH',
                body: params.referral
            })
        }),
        getReferralById: builder.query<ResponseType<ReferralType>, string>({
            query: (id) => ({
              url: `${RouteConstants.referralApi}/${id}`,
              method: 'GET'
            })
          })
    })
});

export const { useCreateReferralMutation, useUpdateReferralMutation, useGetReferralByIdQuery } = ReferralApi;
