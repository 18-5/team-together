import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import App from './App'
import FeedPage from './FeedPage'
import ProfilePage from './profile/ProfilePage'
import MyProjectsPage from './my-projects/MyProjectsPage';
import './index.scss'
import ProfileEditPage from './profile/ProfileEditPage';
import ExplorePage from './ExplorePage';
import ErrorPage from './ErrorPage';
import ConnectionTestPage from './ConnectionTestPage';

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
            path: "projects",
            element: <MyProjectsPage />
          },
          {
            path: "connection-test",
            element: <ConnectionTestPage />
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
