import { useSelector } from 'react-redux';

const useAuth = (permissions = []) => {
  const auth = useSelector((state) => state.auth);
  const userPerms = auth?.user?.permissions || [];
  const isLackPermissions = permissions ? !permissions.every((perm) => userPerms.includes(perm)) : false;
  return {
    isLackPermissions,
    ...auth
  };
};

export default useAuth;
