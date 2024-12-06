// types.ts
export interface UserData {
  fullName?: string;
  email: string;
  password: string;
}

export interface AuthState {
  user?: UserData;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export interface RootState {
  auth: AuthState;
}

export interface Todo {
  title: 'string';
  notes: 'string';
  tag: 'string';
  date: 'string';
}
