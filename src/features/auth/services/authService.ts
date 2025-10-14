import { LoginDto } from "../types";

import api, { ApiResponse } from "@/lib/axios";

export const authService = {
  login: async (data: LoginDto): Promise<string | void> => {
    // Call the login endpoint. The backend may either set an httpOnly cookie
    // or return a token in the response body. Support both:
    const res = await api.post<ApiResponse>("/auth/login", data, {
      withCredentials: true,
    });

    // Try to extract a token from the response body (common when backend
    // returns a Bearer token). Support several possible shapes and persist
    // the token into localStorage so the request interceptor / defaults
    // will include it on subsequent requests.
    try {
      // Common shapes:
      // - res.data.data.accessToken
      // - res.data.data.token
      // - res.data.accessToken
      // - res.data.token
      const body: any = res?.data;
      const maybeToken =
        body?.data?.accessToken ??
        body?.data?.token ??
        body?.accessToken ??
        body?.token;

      if (maybeToken && typeof maybeToken === "string") {
        localStorage.setItem("authToken", maybeToken);
        // Also set default header for axios so subsequent requests include it
        api.defaults.headers.common = api.defaults.headers.common || {};
        (api.defaults.headers.common as any).Authorization =
          `Bearer ${maybeToken}`;

        return maybeToken;
      }
    } catch {
      // ignore extraction errors
    }

    // If no token in body, rely on cookie-based auth (withCredentials)
    return;
  },

  logout: async (): Promise<void> => {
    await api.post<ApiResponse>("/auth/logout", {}, { withCredentials: true });

    // Clear any persisted token and axios header
    try {
      localStorage.removeItem("authToken");
      if (api.defaults.headers.common) {
        delete (api.defaults.headers.common as any).Authorization;
      }
    } catch {
      // ignore
    }
  },

  me: async <T = unknown>(): Promise<T> => {
    const res = await api.get<ApiResponse<T>>("/auth/me", {
      withCredentials: true,
    });

    return res.data.data;
  },

  // Profile endpoints
  getProfile: async <T = unknown>(userId: string): Promise<T> => {
    const res = await api.get<ApiResponse<T>>(`/users/profile/${userId}`, {
      withCredentials: true,
    });

    return res.data.data;
  },

  updateProfile: async <T = unknown>(
    userId: string,
    payload: unknown
  ): Promise<T> => {
    const res = await api.put<ApiResponse<T>>(
      `/users/profile/${userId}`,
      payload,
      {
        withCredentials: true,
      }
    );

    return res.data.data;
  },

  updatePassword: async (userId: string, payload: unknown): Promise<void> => {
    await api.put(`/users/profile/${userId}/password`, payload, {
      withCredentials: true,
    });
  },
};
