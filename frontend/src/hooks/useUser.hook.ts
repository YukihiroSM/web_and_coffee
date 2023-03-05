import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { getUserProjectsThunk } from '../features/userSlice';
import { AppDispatch } from '../types';

export const useUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const success = useSelector((state: RootState) => state.user.success);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const projects = useSelector((state: RootState) => state.user.projects);

  const handleGetUserProjects = (params: URLSearchParams) => {
    dispatch(getUserProjectsThunk(params));
  };

  return { projects, success, loading, error, handleGetUserProjects };
};
