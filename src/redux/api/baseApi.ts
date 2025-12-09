import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
const token = Cookies.get('accessToken');

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://10.10.7.9:5011/api/v1',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ['profile', 'Notifications'],
    endpoints: () => ({}),
});

// export const imageUrl = "http://206.189.231.81:5000";
// export const imageUrl = "http://10.10.7.72:5000";
export const imageUrl = 'http://10.10.7.9:5011';
