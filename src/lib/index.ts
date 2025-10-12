// Main exports from lib
export { default as api, getErrorMessage } from './axios';
export type { ApiResponse, PaginatedResponse, ApiError } from './axios';
export { useApiQuery, useApiMutation } from './query-hooks';
