import { GET_MY_REFERRAL_LIST, GET_REFERRAL_LIST } from '../constants/apiConstants';
import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { ApplicationType } from '../types/ApplicationType';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllApplicationsList: builder.query<
      ResponseType<ApplicationType[]>,
      { email?: string; role?: string; openingId?: string }
    >({
      query: ({ email, role, openingId }) => {
        let endpoint = `${RouteConstants.applicationApi}`;
        const params = [];

        if (email) params.push(`email=${email}`);
        if (role) params.push(`role=${role}`);
        if (openingId) params.push(`openingId=${openingId}`);
        if (params.length > 0) endpoint += `?${params.join('&')}`;

        return endpoint;
      },
      providesTags: [GET_REFERRAL_LIST]
    }),
    getApplicationById: builder.query<ResponseType<ApplicationType>, string>({
      query: (id) => ({
        url: `${RouteConstants.applicationApi}/${id}`,
        method: 'GET'
      })
    }),
    createApplication: builder.mutation<ResponseType<ApplicationType>, ApplicationType>({
      query: (body) => ({
        url: `${RouteConstants.applicationApi}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    }),
    updateApplication: builder.mutation<Object, { id: string; application: ApplicationType }>({
      query: (params) => ({
        url: `${RouteConstants.applicationApi}/${params.id}`,
        method: 'PATCH',
        body: params.application
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    }),
    getMyApplications: builder.query<ResponseType<ApplicationType[]>, void>({
      query: () => ({
        url: `${RouteConstants.applicationApi}/me`,
        method: 'GET'
      }),
      providesTags: [GET_MY_REFERRAL_LIST]
    }),
    deleteApplication: builder.mutation<Object, string>({
      query: (id) => ({
        url: `${RouteConstants.applicationApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [GET_REFERRAL_LIST, GET_MY_REFERRAL_LIST]
    })
  })
});

export const {
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useGetApplicationByIdQuery,
  useGetMyApplicationsQuery,
  useGetAllApplicationsListQuery,
  useDeleteApplicationMutation,
  useLazyGetAllApplicationsListQuery
} = applicationApi;
