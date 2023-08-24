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
    }),
    checkFile: builder.query<ResponseType<{ fileExists: boolean }>, { file: string }>({
      query: (params) => ({
        url: `${RouteConstants.fileCheckApi}?filePath=${params.file}`,
        method: 'GET'
      })
    }),
    getFileUrl: builder.query<string, { fileName: string }>({
      query: (params) => ({
        url: `${RouteConstants.fileApi}/${params.fileName}`,
        method: 'GET'
      })
    })
  })
});

export const { useUploadFileMutation, useLazyCheckFileQuery, useGetFileUrlQuery } = fileApi;
