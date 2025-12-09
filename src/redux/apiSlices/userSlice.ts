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
            query: ({ id, status }) => {
                console.log(id, status);
                return {
                    url: `/user/change-status/${id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: {
                        status,
                    },
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
