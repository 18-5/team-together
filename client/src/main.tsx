import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

import APIConnection from './components/pages/APIConnection';
import ExplorePage from './components/pages/ExplorePage';
import MyProjectsPage from './my-projects/MyProjectsPage';
import Profile from './profile/Profile';
import ProfileEditPage from './profile/ProfileEdit';

import CenteredLayout from './components/layout/CenteredLayout';
import DefaultLayout from './components/layout/DefaultLayout';

import FeedPage from './components/pages/Home';
import Error from './components/pages/Error';
import Login from './components/pages/Login';
import SignUp from "./components/pages/SignUp";
import Project from './components/pages/Project';
import ProjectEdit from './components/pages/ProjectEdit';
import ProjectNew from './components/pages/ProjectNew';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            path: "/",
            element: <FeedPage />
          },
          {
            path: "explore",
            element: <ExplorePage />,
            errorElement: <Error />
          },
          {
            path: "search",
            element: <Error />
          },
          {
            path: "messages",
            element: <Error />
          },
          {
            path: "notifications",
            element: <Error />
          },
          {
            path: "profile/:userId",
            element: <Profile />
          },
          {
            path: "profile/:userId/edit",
            element: <ProfileEditPage />
          },
          {
            path: "my-projects",
            element: <MyProjectsPage />
          },
          {
            path: "connection-test",
            element: <APIConnection />
          },
          {
            path: "projects/new",
            element: <ProjectNew />,
          },
          {
            path: "projects/:projectId",
            element: <Project />,
          },
          {
            path: "projects/:projectId/edit",
            element: <ProjectEdit />,
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <CenteredLayout />,
    children: [{
      path: "/login",
      element: <Login />
    }]
  },
  {
    path: "/sign-up",
    element: <CenteredLayout />,
    children: [{
      path: "/sign-up",
      element: <SignUp />
    }]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
)
