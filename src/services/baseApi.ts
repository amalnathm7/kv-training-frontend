import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  API_BASE_URL,
  GET_APPLICATION_LIST,
  GET_EMPLOYEE_LIST,
  GET_MY_REFERRAL_LIST,
  GET_OPENING_LIST,
  GET_PUBLIC_OPENING_LIST,
  GET_REFERRAL_BY_ID,
  GET_REFERRAL_LIST
} from '../constants/apiConstants';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      // if (!headers.get('Content-Type'))
      //     headers.set('Content-Type', 'application/json');

      const token = localStorage.getItem('token');

      if (token) headers.set('Authorization', `Bearer ${token}`);

      return headers;
    }
  }),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes: [
    GET_EMPLOYEE_LIST,
    GET_OPENING_LIST,
    GET_PUBLIC_OPENING_LIST,
    GET_REFERRAL_LIST,
    GET_MY_REFERRAL_LIST,
    GET_APPLICATION_LIST,
    GET_REFERRAL_BY_ID
  ]
});
