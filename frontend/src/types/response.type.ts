type Notification = {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
  error?: string;
  success?: string;
};

type AxiosResponse = {
  message: string;
};

type Response = {
  id: string;
  token: string;
};

export type { AxiosResponse, Response, Notification };
