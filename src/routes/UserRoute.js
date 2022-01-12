import React, { lazy } from 'react';
// project imports
import Loadable from 'ui-component/Loadable';
import withProtectedRoute from './wrappers/withProtectedRoute';

// manage comics and related routing
const Register = Loadable(lazy(() => import('pages/authentication/Register3')));

const ProtectedRegister = withProtectedRoute(Register);

const UserRoute = {
  path: '/',
  element: <ProtectedRegister />
};

export default UserRoute;
