import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AuthorRoute from './AuthorRoute';
import UserRoute from './UserRoute';
import config from 'config';
import useAuth from 'hooks/useAuth';

// ==============================|| ROUTING RENDER ||============================== //

const routesRole = {
  admin: [MainRoutes, AuthenticationRoutes],
  mod: [MainRoutes, AuthenticationRoutes],
  author: [AuthorRoute, AuthenticationRoutes],
  user: [UserRoute, AuthenticationRoutes]
};

export default function ThemeRoutes() {
  const auth = useAuth();
  const matchedRoutes = auth?.user?.role ? routesRole[auth.user.role] : [AuthenticationRoutes];
  console.log(matchedRoutes);
  return useRoutes(matchedRoutes, config.basename);
}
