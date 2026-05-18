import { createBrowserRouter, RouteObject, redirect } from 'react-router-dom'
import { lazy } from 'react'
import menuRoutes, { generateRoutes } from './menuConfig'

const Login = lazy(() => import('../views/system/login/index'))
const Register = lazy(() => import('../views/system/register/index'))
const NotFound = lazy(() => import('../views/system/404/index'))
const Layout = lazy(() => import('../layouts/index'))

const checkAuth = () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    return redirect('/login')
  }
  return null
}

const layoutChildren: RouteObject[] = [
  ...generateRoutes(menuRoutes),
  {
    path: '*',
    element: <NotFound />,
  },
]

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Layout />,
    loader: checkAuth,
    children: layoutChildren,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

const AppRoutes: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes)

export default AppRoutes
