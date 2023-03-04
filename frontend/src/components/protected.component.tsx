import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../constants';
import { useLocalStorage } from '../hooks';
import { LocalStorageUser } from '../types';

export const ProtectedRoute = ({ children }: any) => {
  const [{ token }] = useLocalStorage<LocalStorageUser>('project-me-user', {
    token: undefined,
  });
  if (false) {
    return <Navigate to={ROUTER_KEYS.USER_LOGIN} replace />;
  }

  return children || <Outlet />;
};
