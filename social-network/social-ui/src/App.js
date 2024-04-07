import React, { useContext } from 'react'
import './App.scss'
import Login from './pages/login-page/Login'
import Register from './pages/register/Register'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Profile from './pages/profile/Profile'
import Leftbar from './components/leftbar/Leftbar'
import Rightbar from './components/rightbar/Rightbar';
import { ThemeContext } from './context/ThemeContext';
import { AuthContext } from './context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {

  const {currentUser} = useContext(AuthContext);
  const {darkMode}=useContext(ThemeContext);
  const queryClient=new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode? "dark": "light"}`}>
       <Navbar  /> 
        <div style={{ display: 'flex' }}>
          <Leftbar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'profile/:id',
          element: <Profile />
        }
      ]
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
