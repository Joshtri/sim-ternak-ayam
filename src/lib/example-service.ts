// Example service file showing how to use the global axios instance with React Query
// You can delete this file after understanding the pattern

import api, { ApiResponse, PaginatedResponse } from './axios';

// Example: User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Example: Service functions that return promises
export const userService = {
  // GET single user
  getUser: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    // API response structure: { success, message, data, errors, statusCode, timestamp }
    return response.data.data;
  },

  // GET all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get<PaginatedResponse<User>>('/users');
    // API response structure: { success, message, data: [], errors, statusCode, timestamp }
    return response.data.data;
  },

  // GET users with pagination
  getUsersPaginated: async (page: number = 1, limit: number = 10) => {
    const response = await api.get<PaginatedResponse<User>>('/users', {
      params: { page, limit },
    });
    // Return full response with pagination metadata if included by backend
    return {
      users: response.data.data,
      pagination: response.data.pagination,
      message: response.data.message,
    };
  },

  // POST create user
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/users', userData);
    // API response structure: { success, message, data, errors, statusCode, timestamp }
    return response.data.data;
  },

  // PUT update user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData);
    // API response structure: { success, message, data, errors, statusCode, timestamp }
    return response.data.data;
  },

  // DELETE user
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
    // Delete typically returns the same response structure but we don't need the data
  },
};

// Example: How to use with React Query in a component
//
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { userService } from '@/lib/example-service';
// import { getErrorMessage } from '@/lib/axios';
//
// function UsersComponent() {
//   const queryClient = useQueryClient();
//
//   // Query - GET users
//   const { data: users, isLoading, error } = useQuery({
//     queryKey: ['users'],
//     queryFn: userService.getUsers,
//   });
//
//   // Query - GET single user
//   const { data: user } = useQuery({
//     queryKey: ['users', userId],
//     queryFn: () => userService.getUser(userId),
//     enabled: !!userId, // Only fetch when userId exists
//   });
//
//   // Query - GET paginated users
//   const { data: paginatedUsers } = useQuery({
//     queryKey: ['users', 'paginated', page, limit],
//     queryFn: () => userService.getUsersPaginated(page, limit),
//   });
//
//   // Mutation - CREATE user
//   const createMutation = useMutation({
//     mutationFn: userService.createUser,
//     onSuccess: () => {
//       // Invalidate and refetch users after successful creation
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//     onError: (error) => {
//       console.error('Failed to create user:', getErrorMessage(error));
//     },
//   });
//
//   // Mutation - UPDATE user
//   const updateMutation = useMutation({
//     mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
//       userService.updateUser(id, data),
//     onSuccess: (_, variables) => {
//       // Invalidate specific user and users list
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//       queryClient.invalidateQueries({ queryKey: ['users', variables.id] });
//     },
//   });
//
//   // Mutation - DELETE user
//   const deleteMutation = useMutation({
//     mutationFn: userService.deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//   });
//
//   // Handle create user
//   const handleCreateUser = (userData: Omit<User, 'id'>) => {
//     createMutation.mutate(userData);
//   };
//
//   // Handle update user
//   const handleUpdateUser = (id: string, data: Partial<User>) => {
//     updateMutation.mutate({ id, data });
//   };
//
//   // Handle delete user
//   const handleDeleteUser = (id: string) => {
//     deleteMutation.mutate(id);
//   };
//
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {getErrorMessage(error)}</div>;
//
//   return (
//     <div>
//       {users?.map(user => (
//         <div key={user.id}>
//           <span>{user.name}</span>
//           <button onClick={() => handleUpdateUser(user.id, { name: 'New Name' })}>
//             Update
//           </button>
//           <button onClick={() => handleDeleteUser(user.id)}>
//             Delete
//           </button>
//         </div>
//       ))}
//       <button onClick={() => handleCreateUser({ name: 'John', email: 'john@example.com', role: 'user' })}>
//         Add User
//       </button>
//     </div>
//   );
// }
