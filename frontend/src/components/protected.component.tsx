import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../constants';
import { useLocalStorage } from '../hooks';

export const ProtectedRoute = ({ children }: any) => {
  const [token] = useLocalStorage<string | null>('project-me-user', null);
  if (!token) {
    return <Navigate to={ROUTER_KEYS.USER_LOGIN} replace />;
  }

  return children || <Outlet />;
};
