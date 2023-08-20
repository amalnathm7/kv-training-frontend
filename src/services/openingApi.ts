import { ResponseType } from "../types/ResponseType";
import { baseApi } from "./baseApi";
import { RouteConstants } from "../constants/routeConstants";
import { OpeningType } from "../types/OpeningType";

export const OpeningApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOpeningById: builder.query<ResponseType<OpeningType>, string>({
            query: (id) => `${RouteConstants.openingApi}/${id}`
        })
    })
});

export const { useGetOpeningByIdQuery } = OpeningApi;
