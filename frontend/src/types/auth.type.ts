export interface User {
  username: string;
  password: string;
  token: string;
}

export interface LocalStorageUser {
  token: string | undefined;
}


