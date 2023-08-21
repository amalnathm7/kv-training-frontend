import { GET_REFERRAL_LIST } from '../constants/apiConstants';
import { RouteConstants } from '../constants/routeConstants';
import { ReferralType } from '../types/ReferralType';
import { baseApi } from './baseApi';
import { ResponseType } from '../types/ResponseType';

export const ReferralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferralById: builder.query<ResponseType<ReferralType>, string>({
      query: (id) => ({
        url: `${RouteConstants.referralApi}/${id}`,
        method: 'GET'
      })
    }),
    createReferral: builder.mutation<ResponseType<ReferralType>, ReferralType>({
      query: (body) => ({
        url: `${RouteConstants.referralApi}`,
        method: 'POST',
        body
      })
    }),
    updateReferral: builder.mutation<Object, { id: string; referral: ReferralType }>({
      query: (params) => ({
        url: `${RouteConstants.referralApi}/${params.id}`,
        method: 'PATCH',
        body: params.referral
      })
    }),
    getAllReferralsList: builder.query<ResponseType<ReferralType[]>, void>({
      query: () => `${RouteConstants.referralApi}`,
      providesTags: [GET_REFERRAL_LIST]
    })
  })
});

export const {
  useCreateReferralMutation,
  useUpdateReferralMutation,
  useGetReferralByIdQuery,
  useGetAllReferralsListQuery
} = ReferralApi;
