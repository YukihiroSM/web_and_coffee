import HttpService from './http.service';

import { BACKEND_KEYS } from '../constants';
import { CreateProject } from '../types';

class ProjectService extends HttpService {
  createProject(project: CreateProject) {
    return this.post(
      {
        url: BACKEND_KEYS.PROJECT_CREATE,
        data: project,
      },
      true
    );
  }

  getAllProjects(params: URLSearchParams) {
    return this.get(
      {
        url: `${BACKEND_KEYS.PROJECT_ALL}?${params}`,
      },
      false
    );
  }

  getProjectById(id: string) {
    return this.get(
      {
        url: `project/${id}`,
      },
      false
    );
  }

  deleteProjectById(id: string) {
    return this.delete(
      {
        url: `project/${id}`,
      },
      true
    );
  }
}

export const projectService = new ProjectService();
