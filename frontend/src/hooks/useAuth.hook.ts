import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { login, register } from '../features/authSlice';
import { User } from '../types';
import { AppDispatch } from '../types';
import { useLocalStorage } from './localStorage.hook';

export const useAuth = () => {
  const [, setLocalStorageUser] = useLocalStorage<string | null>(
    'project-me-user',
    null
  );
  const dispatch: AppDispatch = useDispatch();
  const success = useSelector((state: RootState) => state.auth.success);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleRegister = (user: User) => {
    dispatch(register(user));
  };

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  useEffect(() => {
    token && setLocalStorageUser(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { success, loading, error, handleRegister, handleLogin };
};
