import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import {
  createProjectThunk,
  deleteSingleProjectThunk,
  getAllProjectsThunk,
  getSingleProjectThunk,
} from '../features/projectSlice';
import { CreateProject } from '../types';
import { AppDispatch } from '../types';

export const useProject = () => {
  const dispatch: AppDispatch = useDispatch();
  const success = useSelector((state: RootState) => state.project.success);
  const loading = useSelector((state: RootState) => state.project.loading);
  const error = useSelector((state: RootState) => state.project.error);
  const projects = useSelector((state: RootState) => state.project.projects);
  const project = useSelector((state: RootState) => state.project.project);

  const handleCreateProject = (project: CreateProject) => {
    dispatch(createProjectThunk(project));
  };

  const handleGetAllProjects = (params: URLSearchParams) => {
    dispatch(getAllProjectsThunk(params));
  };

  const handleGetSingleProject = (id: string) => {
    dispatch(getSingleProjectThunk(id));
  };

  const handleDeleteSingleProject = (id: string) => {
    dispatch(deleteSingleProjectThunk(id));
  };

  return {
    projects: projects.data,
    total: projects.metadata.total,
    project,
    success,
    loading,
    error,
    handleCreateProject,
    handleGetAllProjects,
    handleGetSingleProject,
    handleDeleteSingleProject,
  };
};
