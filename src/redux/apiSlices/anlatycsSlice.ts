import { api } from '../api/baseApi';

const analyticsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: ({ revinueYear, bookingYear }: { revinueYear: number; bookingYear: number }) => {
                return {
                    url: `/dashboard/summury`,
                    method: 'GET',
                    params: {
                        revinueYear,
                        bookingYear,
                    },
                };
            },
        }),
    }),
});

export const { useGetAnalyticsQuery } = analyticsSlice;
