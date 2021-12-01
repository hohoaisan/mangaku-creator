import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import ToastService from 'services/toast.service';

const withProtectedRoute =
  (Component, options = {}) =>
  (props) => {
    const auth = useAuth();
    if (auth.isLoading) {
      return null;
    }
    if (auth.isLoggedIn) {
      return <Component {...props} />;
    }
    if (auth.isLackPermissions) {
      ToastService.error("You don't have permission to access this page");
      return <Navigate to="/login" />;
    }
    ToastService.error('You must login to continue');
    return <Navigate to="/login" />;
  };

export default withProtectedRoute;
