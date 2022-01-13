import React, { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('pages/authentication/Login3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: '/login',
      element: <AuthLogin3 />
    }
  ]
};

export default AuthenticationRoutes;
