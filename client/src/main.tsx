import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

import CenteredLayout from './components/layout/CenteredLayout';
import DefaultLayout from './components/layout/DefaultLayout';

import APIConnection from './components/pages/APIConnection';
import Error from './components/pages/Error';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Messages from './components/pages/Messages';
import MyProjects from './components/pages/MyProjects';
import Notifications from './components/pages/Notifications';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';
import Project from './components/pages/Project';
import ProjectEdit from './components/pages/ProjectEdit';
import ProjectNew from './components/pages/ProjectNew';
import SignUp from "./components/pages/SignUp";

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
            element: <Messages />
          },
          {
            path: "notifications",
            element: <Notifications />
          },
          {
            path: "profile/:userId",
            element: <Profile />
          },
          {
            path: "profile/:userId/edit",
            element: <ProfileEdit />
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
            element: <ProjectEdit isNewProject={true} />,
          },
          {
            path: "projects/:projectId",
            element: <Project />,
          },
          {
            path: "projects/:projectId/edit",
            element: <ProjectEdit isNewProject={false} />,
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
