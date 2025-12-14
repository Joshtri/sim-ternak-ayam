import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Base API URL based on environment
const BASE_URL = import.meta.env.PROD
  ? import.meta.env["VITE_BASE_API_URL"]
  : "https://localhost:7195/api";

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage or your auth state management
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error status codes
    if (error.response) {
      // Skip error handling for blob responses (like PDFs)
      // If the response type was blob, don't try to parse as JSON
      if (error.config?.responseType === "blob") {
        return Promise.reject(error);
      }

      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and force logout
          try {
            localStorage.removeItem("authToken");
            if (api.defaults.headers.common) {
              delete (api.defaults.headers.common as any).Authorization;
            }
            // Redirect to login page if we are not already there
            if (window.location.pathname !== "/login") {
              window.location.href = "/login";
            }
          } catch { }
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Internal server error");
          break;
        default:
          console.error("API Error:", error.response.data);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response from server");
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Generic types for API responses - matches your backend structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T[];
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
}

// Helper function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;

    // Check for validation errors first
    if (apiError?.errors) {
      const errorMessages = Object.values(apiError.errors).flat().join(", ");

      return errorMessages || apiError.message;
    }

    return apiError?.message || error.message || "An error occurred";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};

export default api;
