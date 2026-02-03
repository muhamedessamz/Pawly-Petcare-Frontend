import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to normalize user object keys to camelCase
    const normalizeUser = (userData) => {
        if (!userData) return null;
        return {
            ...userData,
            email: userData.email || userData.Email,
            name: userData.name || userData.Name,
            username: userData.username || userData.Username,
            profilePictureUrl: userData.profilePictureUrl || userData.ProfilePictureUrl,
            phoneNumber: userData.phoneNumber || userData.PhoneNumber,
            role: userData.role || userData.Role,
            token: userData.token || userData.Token
        };
    };

    useEffect(() => {
        // Load user from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(normalizeUser(parsedUser));
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Note: api.auth.login returns the user object directly (AuthResponseDto)
        const responseCode = await api.auth.login({ email, password });
        const user = normalizeUser(responseCode);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = (updatedUser) => {
        const newUser = { ...user, ...normalizeUser(updatedUser) };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
