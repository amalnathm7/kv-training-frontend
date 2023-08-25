import { GET_APPLICATION_LIST, PAGE_LENGTH } from '../constants/apiConstants';
import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { ApplicationType } from '../types/ApplicationType';

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<
      ResponseType<ApplicationType[]>,
      {
        email?: string;
        role?: string;
        openingId?: string;
        status?: string;
        bonusStatus?: string;
        offset: number;
      }
    >({
      query: ({ email, role, openingId, offset, status, bonusStatus }) => {
        let endpoint = `${RouteConstants.applicationApi}`;
        const params = [];

        params.push(`offset=${offset}&length=${PAGE_LENGTH}`);
        if (email) params.push(`email=${email}`);
        if (role) params.push(`role=${role}`);
        if (status) params.push(`status=${status}`);
        if (bonusStatus) params.push(`bonusStatus=${bonusStatus}`);
        if (openingId) params.push(`openingId=${openingId}`);
        endpoint += `?${params.join('&')}`;

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
    updateApplication: builder.mutation<
      ResponseType<{ id: string }>,
      { id: string; application: ApplicationType }
    >({
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
