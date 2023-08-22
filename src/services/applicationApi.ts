import { GET_APPLICATION_LIST } from '../constants/apiConstants';
import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { ApplicationType } from '../types/ApplicationType';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<
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
      providesTags: [GET_APPLICATION_LIST]
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
      invalidatesTags: [GET_APPLICATION_LIST]
    }),
    updateApplication: builder.mutation<Object, { id: string; application: ApplicationType }>({
      query: (params) => ({
        url: `${RouteConstants.applicationApi}/${params.id}`,
        method: 'PATCH',
        body: params.application
      }),
      invalidatesTags: [GET_APPLICATION_LIST]
    }),
    deleteApplication: builder.mutation<Object, string>({
      query: (id) => ({
        url: `${RouteConstants.applicationApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [GET_APPLICATION_LIST]
    })
  })
});

export const {
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useGetApplicationByIdQuery,
  useLazyGetApplicationsQuery,
  useLazyGetApplicationByIdQuery
} = applicationApi;