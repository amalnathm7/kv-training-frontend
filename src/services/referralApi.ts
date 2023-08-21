import { GET_REFERRAL_LIST } from '../constants/apiConstants';
import { RouteConstants } from '../constants/routeConstants';
import { ReferralType } from '../types/ReferralType';
import { baseApi } from './baseApi';
import { ResponseType } from '../types/ResponseType';

export const referralApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReferralsList: builder.query<ResponseType<ReferralType[]>, void>({
      query: () => `${RouteConstants.referralsApi}`,
      providesTags: [GET_REFERRAL_LIST]
    })
  })
});

export const { useGetAllReferralsListQuery } = referralApi;
