/**
 * Production-Ready Authentication Service (authService.ts)
 * 
 * ? Handles login, registration, logout, and token session verification.
 * ? Dynamically toggles to mock simulation state when VITE_USE_MOCK_API is true,
 * ? allowing full design/functional prototyping without active backend infrastructure.
 * 
 * NOTE:
 * Request/response mapping layer maps frontend camelCase variables to standard backend
 * Laravel snake_case conventions (e.g. institution_name, password_confirmation).
 */

import apiClient from './apiClient';
import { User, ApiResponse } from '../../types';

// Check if developer wants local decoupled simulation.
// ? Defaults to true to ensure zero-config hosting on Vercel/Netlify for frontend prototyping.
const isMockEnabled = import.meta.env.VITE_USE_MOCK_API !== 'false';

// Small utility to simulate network latency during mocked execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
  /**
   * Registers a new Microfinance Institution Organization.
   * 
   * ? Maps camelCase fields to snake_case body properties for Laravel validators.
   */
  registerMFI: async (userData: Record<string, string>): Promise<ApiResponse<User>> => {
    if (isMockEnabled) {
      await delay(1000);
      if (userData['email'] === "exists@cashrecova.com") {
        return {
          success: false,
          message: "An institution with this email already exists.",
        };
      }
      const mockUser: User = {
        id: "mfi_" + Math.random().toString(36).substring(2, 11),
        institutionName: userData['institutionName'] || '',
        email: userData['email'] || '',
        phone: userData['phone'] || '',
      };
      return {
        success: true,
        message: "Registration successful",
        data: mockUser,
        token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
      };
    }

    try {
      // Maps directly to Laravel RegisterController or custom API endpoint
      const response = await apiClient.post<any>('/register', {
        institution_name: userData['institutionName'],
        email: userData['email'],
        phone: userData['phone'],
        password: userData['password'],
        password_confirmation: userData['password'], // Standard Laravel validator naming
      });
      return {
        success: true,
        data: {
          id: response.user?.id || '',
          institutionName: response.user?.institution_name || response.user?.institutionName || '',
          email: response.user?.email || '',
          phone: response.user?.phone || '',
        },
        token: response.token,
        message: response.message || 'Registration successful',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: error.errors, // Laravel validation (422) structure
      };
    }
  },

  /**
   * Authenticates user session with credentials.
   * 
   * ? Retrieves the token for injection into subsequently made apiClient calls.
   */
  login: async (credentials: Record<string, string>): Promise<ApiResponse<User>> => {
    if (isMockEnabled) {
      await delay(800);
      if (credentials['email'] === "error@cashrecova.com") {
        return {
          success: false,
          message: "Invalid email or password.",
        };
      }
      const mockUser: User = {
        id: "mfi_12345",
        institutionName: "CashRecova Finance Ltd",
        email: credentials['email'] || '',
      };
      return {
        success: true,
        message: "Login successful",
        data: mockUser,
        token: "mock-jwt-token-12345",
      };
    }

    try {
      // Maps to standard token authentication in Laravel (Sanctum/JWT)
      const response = await apiClient.post<any>('/login', {
        email: credentials['email'],
        password: credentials['password'],
      });
      return {
        success: true,
        data: {
          id: response.user?.id || '',
          institutionName: response.user?.institution_name || response.user?.institutionName || '',
          email: response.user?.email || '',
          phone: response.user?.phone || '',
        },
        token: response.token,
        message: response.message || 'Login successful',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }
  },

  /**
   * Flushes token state on the remote API gateway.
   */
  logout: async (): Promise<{ success: boolean }> => {
    if (isMockEnabled) {
      await delay(300);
      return { success: true };
    }

    try {
      await apiClient.post('/logout');
      return { success: true };
    } catch (error) {
      // NOTE: We catch and resolve remote logout failures cleanly so the 
      // client can still complete local state purge (e.g. if internet is dropped).
      console.error('API logout failure (cleaning locally):', error);
      return { success: true };
    }
  },

  /**
   * Hydrates active user profiles using cached token.
   * 
   * ? Fired at application mount/boot-up sequence to recover session.
   */
  getCurrentUser: async (): Promise<ApiResponse<User | null>> => {
    if (isMockEnabled) {
      await delay(200);
      const savedUser = localStorage.getItem("cashrecova_user");
      return {
        success: true,
        data: savedUser ? JSON.parse(savedUser) : null,
      };
    }

    try {
      const user = await apiClient.get<any>('/user');
      return {
        success: true,
        data: {
          id: user?.id || '',
          institutionName: user?.institution_name || user?.institutionName || '',
          email: user?.email || '',
          phone: user?.phone || '',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
};

export default authService;
