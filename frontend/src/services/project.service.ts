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
  // getMealsByFilter(params: URLSearchParams) {
  //   return this.get(
  //     {
  //       url: `${BACKEND_KEYS.MEALS_BY_FILTER}?${params}`,
  //     },
  //     false
  //   );
  // }
  // getRandomMeals() {
  //   return this.get({ url: BACKEND_KEYS.RANDOM_MEALS }, false);
  // }
  // getSingleMeal(id: string) {
  //   return this.get({ url: `${BACKEND_KEYS.SINGLE_MEAL}${id}` }, false);
  // }
}

export const projectService = new ProjectService();
