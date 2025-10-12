// Custom React Query hooks for user management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  userService,
  CreateUserDto,
  UpdateUserDto,
  UserFilters,
} from "../services/userService";

import { getErrorMessage } from "@/lib/axios";

// Query keys
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters?: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Hook to fetch all users with filters
 */
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => userService.getUsers(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single user
 */
export function useUser(id: string, enabled = true) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserDto) => userService.createUser(data),
    onSuccess: () => {
      // Invalidate all user lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("User created successfully");
    },
    onError: error => {
      console.error("Failed to create user:", getErrorMessage(error));
    },
  });
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      userService.updateUser(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific user and all user lists
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("User updated successfully");
    },
    onError: error => {
      console.error("Failed to update user:", getErrorMessage(error));
    },
  });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      // Invalidate all user lists
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("User deleted successfully");
    },
    onError: error => {
      console.error("Failed to delete user:", getErrorMessage(error));
    },
  });
}

/**
 * Hook to toggle user active status
 */
export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.toggleUserStatus(id),
    onSuccess: (_, id) => {
      // Invalidate the specific user and all user lists
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      console.log("User status updated successfully");
    },
    onError: error => {
      console.error("Failed to toggle user status:", getErrorMessage(error));
    },
  });
}

/**
 * Hook to change user password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      id,
      oldPassword,
      newPassword,
    }: {
      id: string;
      oldPassword: string;
      newPassword: string;
    }) => userService.changePassword(id, oldPassword, newPassword),
    onSuccess: () => {
      console.log("Password changed successfully");
    },
    onError: error => {
      console.error("Failed to change password:", getErrorMessage(error));
    },
  });
}
