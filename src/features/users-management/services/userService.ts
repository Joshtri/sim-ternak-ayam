import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

// User types/interfaces
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: "Petugas" | "Operator" | "Pemilik";
  noWA?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  noWA: string;
  role: string; // "Petugas" | "Operator" | "Pemilik"
}

export interface UpdateUserDto {
  username?: string;
  fullName?: string;
  email?: string;
  role?: "Petugas" | "Operator" | "Pemilik";
  noWA?: string;
  isActive?: boolean;
}

export interface UserFilters {
  search?: string;
  role?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

// User service - all API calls related to users
export const userService = {
  /**
   * Get all users with optional filters and pagination
   */
  getUsers: async (filters?: UserFilters): Promise<User[]> => {
    const response = await api.get<PaginatedResponse<User>>("/users", {
      params: filters,
    });

    // Return the data array directly from the response
    return response.data.data;
  },

  /**
   * Get a single user by ID
   */
  getUser: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Create a new user
   */
  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/users", data);

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Update an existing user
   */
  updateUser: async (id: string, data: UpdateUserDto): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Delete a user
   */
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  /**
   * Toggle user active status
   */
  toggleUserStatus: async (id: string): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>(
      `/users/${id}/toggle-status`
    );

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Change user password
   */
  changePassword: async (
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    await api.post(`/users/${id}/change-password`, {
      oldPassword,
      newPassword,
    });
  },
};
