import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import "./index.scss"

import App from './App'
import FeedPage from './pages/FeedPage'
import ProfilePage from './profile/ProfilePage'
import MyProjectsPage from './my-projects/MyProjectsPage';
import ProfileEditPage from './profile/ProfileEditPage';
import ExplorePage from './pages/ExplorePage';
import ErrorPage from './pages/ErrorPage';
import ConnectionTestPage from './pages/ConnectionTestPage';
import ProjectPage from './project/ProjectPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
            element: <ProfilePage />
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
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
)
