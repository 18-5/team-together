import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import "./index.scss"

import FeedPage from './components/pages/Home'
import Profile from './profile/Profile'
import MyProjectsPage from './my-projects/MyProjectsPage';
import ProfileEditPage from './profile/ProfileEdit';
import ExplorePage from './components/pages/ExplorePage';
import ErrorPage from './components/pages/ErrorPage';
import ConnectionTestPage from './components/pages/ConnectionTestPage';
import ProjectPage from './project/ProjectPage';

import DefaultLayout from './components/layout/DefaultLayout';
import CenteredLayout from './components/layout/CenteredLayout';

import Login from './components/pages/Login'
import SignUp from "./components/pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <FeedPage />
          },
          {
            path: "explore",
            element: <ExplorePage />,
            errorElement: <ErrorPage />
          },
          {
            path: "search",
            element: <ErrorPage />
          },
          {
            path: "messages",
            element: <ErrorPage />
          },
          {
            path: "notifications",
            element: <ErrorPage />
          },
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "profile/edit",
            element: <ProfileEditPage />
          },
          {
            path: "my-projects",
            element: <MyProjectsPage />
          },
          {
            path: "connection-test",
            element: <ConnectionTestPage />
          },
          {
            path: "projects/:projectId",
            element: <ProjectPage />
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
