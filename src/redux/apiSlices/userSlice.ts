import { api } from '../api/baseApi';

const userSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ searchTerm, status, page, limit }) => ({
                url: `/user`,
                method: 'GET',
                credentials: 'include',
                params: {
                    searchTerm,
                    status,
                    page,
                    limit,
                },
            }),
        }),
        changeStatusUser: builder.mutation({
            query: ({ id }: { id: string }) => {
                return {
                    method: 'PATCH',
                    url: `/user/${id}`,
                };
            },
        }),

        getHosts: builder.query({
            query: ({ query }: { query?: string }) => {
                return {
                    url: '/user/host?' + query,
                };
            },
        }),
    }),
});
export const { useGetUsersQuery, useChangeStatusUserMutation, useGetHostsQuery } = userSlice;
