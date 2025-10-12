export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponseApi {
  search?: string;
  page?: number;
  limit?: number;
}
