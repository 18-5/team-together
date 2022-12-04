import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

import CenteredLayout from './components/layout/CenteredLayout';
import DefaultLayout from './components/layout/DefaultLayout';

import Home from './components/pages/Home';
import MyProjects from './components/pages/MyProjects';

import Project from './components/pages/Project';
import ProjectNew from './components/pages/ProjectNew';
import ProjectEdit from './components/pages/ProjectEdit';

import APIConnection from './components/pages/APIConnection';
import Profile from './profile/Profile';
import ProfileEditPage from './profile/ProfileEdit';

import SignUp from "./components/pages/SignUp";
import Login from './components/pages/Login';
import Error from './components/pages/Error';

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
            element: <Home />
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
            element: <MyProjects />
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
