import { ResponseType } from "../types/ResponseType";
import { baseApi } from "./baseApi";
import { RouteConstants } from "../constants/routeConstants";

export const FileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<ResponseType<{ file: string }>, FormData>({
            query: (body) => ({
                url: `${RouteConstants.fileUploadApi}`,
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        })
    })
});

export const { useUploadFileMutation } = FileApi;
