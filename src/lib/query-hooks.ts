// Reusable React Query hooks and utilities
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getErrorMessage } from './axios';

// Generic type for query functions
type QueryFunction<TData, TParams extends unknown[] = []> = (...params: TParams) => Promise<TData>;

// Generic type for mutation functions
type MutationFunction<TData, TVariables> = (variables: TVariables) => Promise<TData>;

/**
 * Custom hook for GET requests with React Query
 * Wraps useQuery with better typing and error handling
 */
export function useApiQuery<TData, TParams extends unknown[] = []>(
  queryKey: unknown[],
  queryFn: QueryFunction<TData, TParams>,
  params: TParams,
  options?: Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, AxiosError>({
    queryKey: [...queryKey, ...params],
    queryFn: () => queryFn(...params),
    ...options,
  });
}

/**
 * Custom hook for POST/PUT/DELETE requests with React Query
 * Wraps useMutation with automatic cache invalidation
 */
export function useApiMutation<TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: {
    invalidateKeys?: unknown[][];
    onSuccessMessage?: string;
    onErrorMessage?: string;
  } & Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate specified query keys
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      // Show success message if provided
      if (options?.onSuccessMessage) {
        console.log(options.onSuccessMessage);
        // You can replace this with your toast/notification system
      }

      // Call custom onSuccess if provided
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // Show error message
      const errorMessage = options?.onErrorMessage || getErrorMessage(error);
      console.error(errorMessage);
      // You can replace this with your toast/notification system

      // Call custom onError if provided
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}

/**
 * Example usage:
 *
 * // In your service file (e.g., userService.ts)
 * import api, { ApiResponse } from '@/lib/axios';
 *
 * export const userService = {
 *   getUser: async (id: string) => {
 *     const response = await api.get<ApiResponse<User>>(`/users/${id}`);
 *     return response.data.data;
 *   },
 *   createUser: async (data: CreateUserDto) => {
 *     const response = await api.post<ApiResponse<User>>('/users', data);
 *     return response.data.data;
 *   },
 * };
 *
 * // In your component
 * import { useApiQuery, useApiMutation } from '@/lib/query-hooks';
 * import { userService } from '@/services/userService';
 *
 * function UserComponent({ userId }: { userId: string }) {
 *   // Query
 *   const { data: user, isLoading } = useApiQuery(
 *     ['users'],
 *     userService.getUser,
 *     [userId],
 *     { enabled: !!userId }
 *   );
 *
 *   // Mutation
 *   const createUser = useApiMutation(userService.createUser, {
 *     invalidateKeys: [['users']],
 *     onSuccessMessage: 'User created successfully',
 *   });
 *
 *   const handleCreate = () => {
 *     createUser.mutate({ name: 'John', email: 'john@example.com' });
 *   };
 *
 *   return <div>...</div>;
 * }
 */
