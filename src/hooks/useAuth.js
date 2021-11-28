import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const defaultOptions = {
  redirectIfLoggedIn: false,
  redirectIfLoggedOut: true,
  redirectIfLackPermission: false,
  redirect: '#',
  permissions: []
};

const useAuth = (options = defaultOptions) => {
  options = Object.assign(defaultOptions, options);
  const { redirectIfLoggedIn, redirect, redirectIfLoggedOut, redirectIfLackPermission, permissions } = options;
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const userPerms = auth?.user?.permissions || [];
  const isLackPermissions = permissions ? !permissions.every((perm) => userPerms.includes(perm)) : false;
  useEffect(() => {
    if (auth.isLoggedIn && redirectIfLoggedIn) {
      navigate(redirect);
    }
    if (auth.isLoggedIn && redirectIfLackPermission && isLackPermissions) {
      navigate(redirect);
    }
    if (!auth.isLoggedIn && redirectIfLoggedOut) {
      navigate(redirect);
    }
  }, [
    auth.isLoggedIn,
    auth.user,
    isLackPermissions,
    navigate,
    redirect,
    redirectIfLackPermission,
    redirectIfLoggedIn,
    redirectIfLoggedOut
  ]);
  return {
    isLackPermissions,
    ...auth
  };
};

export default useAuth;
