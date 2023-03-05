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

const getSingleProject = async (id: string) => {
  const { data } = await projectService.getProjectById(id);
  return data;
};

const deleteSingleProject = async (id: string) => {
  const { data } = await projectService.deleteProjectById(id);
  return data;
};

export { createProject, getAllProjects, deleteSingleProject, getSingleProject };
