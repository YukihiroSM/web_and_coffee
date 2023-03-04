import { projectService } from '../services';
import { CreateProject } from '../types';

const createProject = async (project: CreateProject) => {
  const { data } = await projectService.createProject(project);
  return data;
};

const getAllProjects = async (params: URLSearchParams) => {
  const { data } = await projectService.getAllProjects(params);
  return data;
};

export { createProject, getAllProjects };
