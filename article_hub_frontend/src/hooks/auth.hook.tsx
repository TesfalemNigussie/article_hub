"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from "../util/local.storage.utils";

interface AuthContextType {
    isUserLoggedIn: boolean;
    saveUser: (data: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isUserLoggedIn: false,
    saveUser: (data: any) => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const user = getUserFromLocalStorage();
        setIsUserLoggedIn(!!user);
    }, []);

    const saveUser = (user: any) => {
        saveUserToLocalStorage(user);
        setIsUserLoggedIn(true);
    };

    const logout = () => {
        removeUserFromLocalStorage();
        setIsUserLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, logout, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
