import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import {
  createUserResumeThunk,
  getUserProjectsThunk,
  getUserResumeThunk,
} from '../features/userSlice';
import { AppDispatch } from '../types';

export const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const success = useSelector((state: RootState) => state.user.success);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const projects = useSelector((state: RootState) => state.user.projects);
  const resume = useSelector((state: RootState) => state.user.resume);

  const handleGetUserProjects = (params: URLSearchParams) => {
    dispatch(getUserProjectsThunk(params));
  };

  const handleCreateUserResume = (resume: FormData) => {
    dispatch(createUserResumeThunk(resume));
  };

  const handleGetUserResume = () => {
    dispatch(getUserResumeThunk(''));
  };

  return {
    projects: projects.data,
    total: projects.metadata.total,
    resume,
    success,
    loading,
    error,
    handleGetUserProjects,
    handleCreateUserResume,
    handleGetUserResume,
  };
};
