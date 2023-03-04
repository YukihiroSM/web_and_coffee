import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { login, register } from '../features/authSlice';
import { User } from '../types';
import { AppDispatch } from '../types';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const success = useSelector((state: RootState) => state.auth.success);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (user: User) => {
    dispatch(register(user));
  };

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  return { success, loading, error, handleRegister, handleLogin };
};
