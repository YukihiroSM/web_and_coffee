export interface User {
  username: string;
  password: string;
  token: string;
}

export interface LocalStorageUser {
  id: string | undefined;
  token: string | undefined;
}

export interface AuthState {
  user: {
    id: string;
    token: string;
  } | null;
  loading: boolean;
  error: string | null;
}
