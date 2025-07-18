export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  group: string;
  status: 'active' | 'disabled';
  lastLogin: Date;
  avatar?: string;
  department?: string;
  phone?: string;
  location?: string;
  permissions?: string[];
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}

export interface UserFilters {
  search: string;
  status: 'all' | 'active' | 'disabled';
  page: number;
  limit: number;
}