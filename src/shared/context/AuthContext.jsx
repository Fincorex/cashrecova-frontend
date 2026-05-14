import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "@shared/services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("fincorex_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists and initialize user state
    const initializeAuth = async () => {
      if (token) {
        try {
          // In a real app, we would verify the token with the backend
          // For now, we'll assume the token is valid and set a mock user
          const savedUser = localStorage.getItem("fincorex_user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch (error) {
          console.error("Failed to initialize auth:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success) {
      const { data, token: newToken } = response;
      setUser(data);
      setToken(newToken);
      localStorage.setItem("fincorex_token", newToken);
      localStorage.setItem("fincorex_user", JSON.stringify(data));
    }
    return response;
  };

  const register = async (userData) => {
    const response = await authService.registerMFI(userData);
    if (response.success) {
      const { data, token: newToken } = response;
      setUser(data);
      setToken(newToken);
      localStorage.setItem("fincorex_token", newToken);
      localStorage.setItem("fincorex_user", JSON.stringify(data));
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("fincorex_token");
    localStorage.removeItem("fincorex_user");
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
