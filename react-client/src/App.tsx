import React from 'react'
import Register from './components/Register'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import VideoDetails from './components/VideoDetails'
import MyVideos from './components/MyVideos'
import Profile from './components/Profile'
import { retrieveSession } from './utils/retrieveSesion'
import ProtectedRoute from './components/ProtectedRoute'
import LikedVideos from './components/LikedVideos'
import FollowingVideos from './components/FollowingVideos'

const creatorSession = retrieveSession()

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<Dashboard />}
      />
    ),
  },
  {
    path: '/video-details/:id',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<VideoDetails />}
      />
    ),
  },
  {
    path: '/my-videos',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<MyVideos />}
      />
    ),
  },
  {
    path: '/liked-videos',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<LikedVideos />}
      />
    ),
  },
  {
    path: '/following-videos',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<FollowingVideos />}
      />
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute
        creatorSession={creatorSession}
        childrenComponent={<Profile />}
      />
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
