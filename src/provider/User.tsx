import React, { createContext, useContext } from 'react';
import { useGetProfileQuery } from '../redux/apiSlices/authSlice';

export type User = {
    email: string;
    image: string;
    name: string;
    role: 'SUPER_ADMIN' | 'ADMIN';
    status: 'active' | 'inactive';
};

export const UserContext = createContext<any>({
    user: null,
    isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, isLoading } = useGetProfileQuery(undefined);

    const user = (data?.data as User) ?? null;

    return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
