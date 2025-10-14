// Custom React Query hooks for user management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  userService,
  CreateUserDto,
  UpdateUserDto,
  UserFilters,
} from "../services/userService";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

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
      showToast({
        title: "Berhasil!",
        description: "User berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      showToast({
        title: "Gagal Membuat User",
        description: errorMessage || "Terjadi kesalahan saat membuat user",
        color: "error",
      });
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
      showToast({
        title: "Berhasil!",
        description: "User berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      showToast({
        title: "Gagal Mengupdate User",
        description: errorMessage || "Terjadi kesalahan saat mengupdate user",
        color: "error",
      });
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
      showToast({
        title: "Berhasil!",
        description: "User berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      showToast({
        title: "Gagal Menghapus User",
        description: errorMessage || "Terjadi kesalahan saat menghapus user",
        color: "error",
      });
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
      showToast({
        title: "Berhasil!",
        description: "Status user berhasil diubah",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      const description =
        errorMessage || "Terjadi kesalahan saat mengubah status user";

      showToast({
        title: "Gagal Mengubah Status",
        description,
        color: "error",
      });
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
      showToast({
        title: "Berhasil!",
        description: "Password berhasil diubah",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      showToast({
        title: "Gagal Mengubah Password",
        description: errorMessage || "Terjadi kesalahan saat mengubah password",
        color: "error",
      });
    },
  });
}
