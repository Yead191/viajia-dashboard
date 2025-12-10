import { api } from '../api/baseApi';

const bookingSlice = api.injectEndpoints({
    endpoints: (build) => ({
        getBookings: build.query({
            query: ({ type, searchTerm }) => ({
                url: '/dashboard/booking',
                method: 'GET',
                params: {
                    type,
                    searchTerm,
                },
            }),
        }),
    }),
});

export const { useGetBookingsQuery } = bookingSlice;
