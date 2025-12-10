import { api } from "../api/baseApi";

const analyticsSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAnalytics: builder.query({
            query: () => {
                return {
                    url: `/dashboard/summury?revinueYear=2024&bookingYear=2025`,
                    method: "GET",
                }
            },
        }),

    }),
});

export const { useGetAnalyticsQuery } = analyticsSlice;