import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import withProtectedRoute from './wrappers/withProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/Default')));

// manage people routing
const ManageUsers = Loadable(lazy(() => import('pages/manage-people/Users')));

// manage comics and related routing
const ManageComics = Loadable(lazy(() => import('pages/manage-comics/Comics/ManageComics')));
const CreateComics = Loadable(lazy(() => import('pages/manage-comics/Comics/CreateComic')));
const UpdateComics = Loadable(lazy(() => import('pages/manage-comics/Comics/UpdateComic')));
const ComicDetail = Loadable(lazy(() => import('pages/manage-comics/Comics/ComicDetail')));
const UploadChapter = Loadable(lazy(() => import('pages/manage-comics/Comics/UploadChapter')));
const UpdateChapter = Loadable(lazy(() => import('pages/manage-comics/Comics/UpdateChapter')));
const ManageAuthors = Loadable(lazy(() => import('pages/manage-comics/Authors')));
const ManageGenres = Loadable(lazy(() => import('pages/manage-comics/Genres')));
const ManageFormats = Loadable(lazy(() => import('pages/manage-comics/Formats')));

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
      path: '/users',
      element: <ManageUsers />
    },
    {
      path: '/comics',
      element: <ManageComics />
    },
    {
      path: '/comics/create',
      element: <CreateComics />
    },
    {
      path: '/comics/:comicId/update',
      element: <UpdateComics />
    },
    {
      path: '/comics/:comicId/chapters/upload',
      element: <UploadChapter />
    },
    {
      path: '/comics/:comicId/chapters/:chapterId',
      element: <UpdateChapter />
    },
    {
      path: '/comics/:comicId',
      element: <ComicDetail />
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
