import { ResponseType } from '../types/ResponseType';
import { baseApi } from './baseApi';
import { RouteConstants } from '../constants/routeConstants';

export const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<ResponseType<{ file: string }>, FormData>({
      query: (body) => ({
        url: `${RouteConstants.fileUploadApi}`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useUploadFileMutation } = fileApi;
