import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';
import { OpeningType } from '../types/OpeningType';
import { GET_OPENING_LIST } from '../constants/apiConstants';

export const OpeningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOpeningList: builder.query<ResponseType<OpeningType[]>, void>({
      query: () => `${RouteConstants.openingApi}`,
      providesTags: [GET_OPENING_LIST]
    }),
    getOpeningById: builder.query<ResponseType<OpeningType>, string>({
      query: (id) => `${RouteConstants.openingApi}/${id}`
    }),
    createOpening: builder.mutation<ResponseType<OpeningType>, OpeningType>({
      query: (body) => ({
        url: `${RouteConstants.openingApi}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [GET_OPENING_LIST]
    }),
    updateOpening: builder.mutation<Object, { id: string; opening: OpeningType }>({
      query: (params) => ({
        url: `${RouteConstants.openingApi}/${params.id}`,
        method: 'PATCH',
        body: params.opening
      }),
      invalidatesTags: [GET_OPENING_LIST]
    }),
    deleteOpening: builder.mutation<Object, string>({
      query: (id) => ({
        url: `${RouteConstants.openingApi}/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [GET_OPENING_LIST]
    })
  })
});

export const {
  useGetOpeningListQuery,
  useGetOpeningByIdQuery,
  useCreateOpeningMutation,
  useUpdateOpeningMutation,
  useDeleteOpeningMutation
} = OpeningApi;
