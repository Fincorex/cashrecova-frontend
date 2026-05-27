/**
 * Global Authentication Context Provider (AuthContext.tsx)
 * 
 * ? Handles user session lifecycle, state hydration on initialization,
 * ? and event listeners that force logout operations when HTTP requests return 401s.
 * 
 * Dependencies:
 * - authService: Executes API logic communicating with backend identity microservices.
 * - localStorage: Key-value database for storing raw auth tokens and user payload cache.
 */

import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";
import { User, AuthContextType } from "../../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // ! Token state is initialized directly from localStorage to prevent flash of
  // ! unauthenticated screens while the app checks authorization status.
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("cashrecova_token"));
  const [loading, setLoading] = useState<boolean>(true);

  // ? Synchronize local session payload with API on initialization
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Fetch fresh profile details from Laravel API via /user
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            localStorage.setItem("cashrecova_user", JSON.stringify(response.data));
          } else {
            // Local token has expired or is invalid
            cleanAuthSession();
          }
        } catch (error) {
          // NOTE: If server connection fails but token is present, we clear the session
          // to guarantee security over offline caching.
          console.error("Authentication synchronization failed:", error);
          cleanAuthSession();
        }
      } else {
        cleanAuthSession();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  // ? Broadcast Listener: Intercept global unauthorized events from response middleware (apiClient)
  // This intercepts 401 Session Expiration errors at the fetch layer and performs clean redirection.
  useEffect(() => {
    const handleUnauthorized = () => {
      cleanAuthSession();
      // Redirect page to authentication view
      window.location.href = '/login';
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  /**
   * Resets all credentials in storage and local state.
   */
  const cleanAuthSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("cashrecova_token");
    localStorage.removeItem("cashrecova_user");
  };

  /**
   * Performs MFI login authentication flow.
   */
  const login = async (credentials: Record<string, string>) => {
    const response = await authService.login(credentials);
    if (response.success && response.data) {
      const { data, token: newToken } = response;
      setUser(data);
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("cashrecova_token", newToken);
      }
      localStorage.setItem("cashrecova_user", JSON.stringify(data));
    }
    return response;
  };

  /**
   * Registers a new Microfinance Institution portal admin.
   */
  const register = async (userData: Record<string, string>) => {
    const response = await authService.registerMFI(userData);
    if (response.success && response.data) {
      const { data, token: newToken } = response;
      setUser(data);
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("cashrecova_token", newToken);
      }
      localStorage.setItem("cashrecova_user", JSON.stringify(data));
    }
    return response;
  };

  /**
   * Calls API logout endpoint and flushes local storage caches.
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn("API logout call failed, cleaning local session anyway.", err);
    }
    cleanAuthSession();
  };

  const value: AuthContextType = {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
