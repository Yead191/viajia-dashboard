import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://147.93.121.222:5000/api/v1',
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['profile', 'Notifications', 'Package', 'Faq'],
    endpoints: () => ({}),
});

export const imageUrl = 'http://147.93.121.222:5000';
