import { api } from '../api/baseApi';

const settingSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getFaq: builder.query({
            query: (params) => {
                return {
                    url: '/faq',
                    params: params,
                };
            },
            providesTags: ['Faq'],
        }),
        createFaq: builder.mutation({
            query: (data) => ({
                url: '/faq',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Faq'],
        }),
        updateFaq: builder.mutation({
            query: (data) => ({
                url: `/faq/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Faq'],
        }),
        deleteFaq: builder.mutation({
            query: (id) => ({
                url: `/faq/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Faq'],
        }),
        // about us page
        getSupportContent: builder.query({
            query: ({ type }) => ({
                url: `/disclaimer?type=${type}`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        // add about us content
        addSupportContent: builder.mutation({
            query: ({ data }) => ({
                url: `/disclaimer`,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useGetFaqQuery,
    useCreateFaqMutation,
    useUpdateFaqMutation,
    useDeleteFaqMutation,
    useGetSupportContentQuery,
    useAddSupportContentMutation,
} = settingSlice;
