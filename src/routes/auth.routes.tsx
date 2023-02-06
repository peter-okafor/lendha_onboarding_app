import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { path } from './path';

const AuthLayout = lazy(() => import('@/components/layouts/auth/AuthLayout'));

const Signin = lazy(() => import('@/features/auth/signin/Signin'));
const Signup = lazy(() => import('@/features/auth/signup/Signup'));
const ForgotPassword = lazy(() => import('@/features/auth/forgot-password/ForgotPassword'));
const PasswordReset = lazy(() => import('@/features/auth/password-reset/PasswordReset'));

const AuthRoutes: RouteObject = {
  path: path.HOME,
  element: <AuthLayout />,
  children: [
    { path: path.HOME, element: <Navigate to={path.SIGNIN} replace /> },
    { path: path.SIGNIN, element: <Signin /> },
    { path: path.SIGNUP, element: <Signup /> },
    { path: path.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: path.PASSWORD_RESET, element: <PasswordReset /> },
    { path: '*', element: <Navigate to={path.SIGNIN} replace /> }
  ]
};

export default AuthRoutes;
