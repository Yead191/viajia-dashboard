import { api } from '../api/baseApi';

const packageSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => ({
                url: '/package',
            }),
            providesTags: ['Package'],
        }),
        createPackage: builder.mutation({
            query: (data) => ({
                method: 'POST',
                url: '/package',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['Package'],
        }),

        editPackage: builder.mutation({
            query: ({ id, data }) => ({
                method: 'PATCH',
                url: `/package/${id}`,
                body: data,
            }),
            invalidatesTags: ['Package'],
        }),

        deletePackage: builder.mutation({
            query: ({ id }) => ({
                method: 'DELETE',
                url: `/package/${id}`,
            }),
            invalidatesTags: ['Package'],
        }),
    }),
});

export const { useGetPackagesQuery, useCreatePackageMutation, useEditPackageMutation, useDeletePackageMutation } =
    packageSlice;
