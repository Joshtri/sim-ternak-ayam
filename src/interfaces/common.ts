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

export interface ICurrentUser extends BaseEntity {
  // id: string;
  username: string;
  email?: string;
  fullName?: string;
  noWA?: string;
  role?: string;
  kandangsManaged?: string[]; // Array of kandang IDs the user manages
  // createdAt?: string;
  // updateAt?: string;
}
