import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { login, register } from '../features/auth/authSlice';
import { User } from '../types';
import { AppDispatch } from '../types';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleRegister = (user: User) => {
    dispatch(register(user));
  };

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  return { user, loading, error, handleRegister, handleLogin };
};
