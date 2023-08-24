import { GET_MY_REFERRAL_LIST, GET_REFERRAL_LIST } from '../constants/apiConstants';
import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { ReferralType } from '../types/ReferralType';

export const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReferrals: builder.query<
      ResponseType<ReferralType[]>,
      { email?: string; role?: string; openingId?: string; offset: number }
    >({
      query: ({ email, role, openingId, offset }) => {
        let endpoint = `${RouteConstants.referralApi}`;
        const params = [];

        params.push(`offset=${offset}`);
        if (email) params.push(`email=${email}`);
        if (role) params.push(`role=${role}`);
        if (openingId) params.push(`openingId=${openingId}`);
        endpoint += `?${params.join('&')}`;

        return endpoint;
      },
      providesTags: [GET_REFERRAL_LIST]
    }),
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
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    }),
    updateReferral: builder.mutation<Object, { id: string; referral: ReferralType }>({
      query: (params) => ({
        url: `${RouteConstants.referralApi}/${params.id}`,
        method: 'PATCH',
        body: params.referral
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    }),
    getMyReferrals: builder.query<ResponseType<ReferralType[]>, void>({
      query: () => ({
        url: `${RouteConstants.referralApi}/me`,
        method: 'GET'
      }),
      providesTags: [GET_MY_REFERRAL_LIST]
    }),
    deleteReferral: builder.mutation<Object, string>({
      query: (id) => ({
        url: `${RouteConstants.referralApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    })
  })
});

export const {
  useCreateReferralMutation,
  useUpdateReferralMutation,
  useGetReferralByIdQuery,
  useGetMyReferralsQuery,
  useGetAllReferralsQuery,
  useDeleteReferralMutation,
  useLazyGetAllReferralsQuery,
  useLazyGetMyReferralsQuery
} = referralApi;
