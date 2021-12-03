import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import withProtectedRoute from './wrappers/withProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('pages/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('pages/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('pages/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('pages/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('pages/utilities/TablerIcons')));

// manage people routing
const ManageUsers = Loadable(lazy(() => import('pages/manage-people/Users')));

// manage comics and related routing
const ManageComics = Loadable(lazy(() => import('pages/manage-comics/Comics')));
const ManageAuthors = Loadable(lazy(() => import('pages/manage-comics/Authors')));
const ManageGenres = Loadable(lazy(() => import('pages/manage-comics/Genres')));
const ManageFormats = Loadable(lazy(() => import('pages/manage-comics/Formats')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //
const MainLayoutProtected = withProtectedRoute(MainLayout);

const MainRoutes = {
  path: '/',
  element: <MainLayoutProtected />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    {
      path: '/utils/util-typography',
      element: <UtilsTypography />
    },
    {
      path: '/utils/util-color',
      element: <UtilsColor />
    },
    {
      path: '/utils/util-shadow',
      element: <UtilsShadow />
    },
    {
      path: '/icons/tabler-icons',
      element: <UtilsTablerIcons />
    },
    {
      path: '/icons/material-icons',
      element: <UtilsMaterialIcons />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: '/users',
      element: <ManageUsers />
    },
    {
      path: '/comics',
      element: <ManageComics />
    },
    {
      path: '/authors',
      element: <ManageAuthors />
    },
    {
      path: '/genres',
      element: <ManageGenres />
    },
    {
      path: '/formats',
      element: <ManageFormats />
    }
  ]
};

export default MainRoutes;
