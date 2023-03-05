import { Project } from './project.type';

type Notification = {
  status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
  error?: any;
  success?: string;
};

type ProjectsResponse = {
  data: Project[];
  metadata: { total: number };
};

export type { Notification, ProjectsResponse };
