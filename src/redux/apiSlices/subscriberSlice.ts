import { api } from '../api/baseApi';

const subscriberSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllSubscribes: builder.query({
            query: ({ type, status, searchTerm }) => ({
                url: `/subscription/subscribers`,
                method: 'GET',
                params: {
                    type,
                    status,
                    searchTerm,
                },
            }),
        }),
    }),
});

export const { useGetAllSubscribesQuery } = subscriberSlice;
