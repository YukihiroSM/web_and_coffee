import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { ROUTER_KEYS } from '../constants';

export const ProtectedRoute = ({ children }: any) => {
  if (false) {
    return <Navigate to={ROUTER_KEYS.USER_LOGIN} replace />;
  }

  return children || <Outlet />;
};
