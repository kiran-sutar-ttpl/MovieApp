
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}
