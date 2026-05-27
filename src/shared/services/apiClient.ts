/**
 * Production-Grade API Client for CashRecova Frontend
 * 
 * ? Native wrapper around standard Fetch API.
 * ? Handles JWT injection, response normalization, and centralized error parsing.
 * ? Integrated with Laravel-style validation exception handling (422) and session eviction (401).
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api';

/**
 * Standardized API Exception Wrapper
 * 
 * ? Formats raw server exceptions into standard developer-friendly structures.
 * ? Especially formats validation messages (422) returned as lists by backend frameworks.
 */
export class ApiError extends Error {
  status: number;
  errors: Record<string, string[]> | null;

  constructor(status: number, message: string, errors: Record<string, string[]> | null = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors; // Holds specific key-value arrays (e.g. CAC number invalid)
  }
}

/**
 * Central Asynchronous Fetch Wrapper
 * 
 * ? Automatically reads JWT from storage and configures headers.
 * ? Automatically dispatches interceptor events for session recovery/redirection.
 */
const request = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('cashrecova_token');
  
  // Clean leading/trailing slash combinations
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}${cleanEndpoint}`;

  // Configure standard request headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json', // Force backends to return JSON formats instead of HTML dumps
    ...((options.headers as Record<string, string>) || {}),
  };

  // Inject token if active
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  // Convert payload objects to JSON strings
  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    // Parse json response safely to avoid empty response parsing errors
    let data: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    if (!response.ok) {
      // ! 1. Session Expiration Interceptor (401 Unauthorized)
      // Cleans session and throws custom event to notify AuthContext to redirect.
      if (response.status === 401) {
        localStorage.removeItem('cashrecova_token');
        localStorage.removeItem('cashrecova_user');
        
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        
        throw new ApiError(401, 'Your session has expired. Please login again.');
      }

      // ! 2. Validation Exception Handler (422 Unprocessable Entity)
      // Normalizes field-level errors to show highlights dynamically under form elements.
      if (response.status === 422 && data) {
        throw new ApiError(422, data.message || 'Validation failed', data.errors);
      }

      // ! 3. General Server Failure Handler (500, 503, 404)
      const errorMessage = (data && data.message) || `Request failed with status ${response.status}`;
      throw new ApiError(response.status, errorMessage);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // ? Fallback error handler for offline client networks
    throw new ApiError(0, 'Unable to connect to the server. Please verify your internet connection.');
  }
};

const apiClient = {
  get: <T = any>(endpoint: string, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T = any>(endpoint: string, body?: any, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'POST', body }),
  put: <T = any>(endpoint: string, body?: any, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'PUT', body }),
  delete: <T = any>(endpoint: string, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
