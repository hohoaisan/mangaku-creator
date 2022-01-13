import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import withProtectedRoute from './wrappers/withProtectedRoute';

// manage comics and related routing
const ManageComics = Loadable(lazy(() => import('pages/manage-comics-author/ManageComics')));
const CreateComics = Loadable(lazy(() => import('pages/manage-comics-author/CreateComic')));
const UpdateComics = Loadable(lazy(() => import('pages/manage-comics-author/UpdateComic')));
const ComicDetail = Loadable(lazy(() => import('pages/manage-comics-author/ComicDetail')));
const UploadChapter = Loadable(lazy(() => import('pages/manage-comics-author/UploadChapter')));
const UpdateChapter = Loadable(lazy(() => import('pages/manage-comics-author/UpdateChapter')));

// ==============================|| MAIN ROUTING ||============================== //
const MainLayoutProtected = withProtectedRoute(MainLayout);

const AuthorsRoute = {
  path: '/',
  element: <MainLayoutProtected />,
  children: [
    {
      path: '/',
      element: <Navigate to="/comics" />
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
    }
  ]
};

export default AuthorsRoute;
