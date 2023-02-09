import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { ProutectedRoutes } from './guards';
import { path } from './path';

const CreditOfficer = lazy(() => import('@/features/credit-officer/CreditOfficer'));
const CreditOfficerLoans = lazy(
  () => import('@/features/onfield-credit-officer/features/loans/Loans')
);
const CreditOfficerTakeLoan = lazy(
  () => import('@/features/onfield-credit-officer/features/loans/LoanApply')
);

const CreditOfficerPayLoan = lazy(
  () => import('@/features/onfield-credit-officer/features/loans/PayLoan')
);

const CreditOfficerUserProfile = lazy(
  () => import('@/features/onfield-credit-officer/features/user-profile/UserProfile')
);

export const CreditOfficerRoutes: RouteObject = {
  path: path.CREDIT_OFFICER,
  element: <ProutectedRoutes />,
  children: [
    { path: path.CREDIT_OFFICER, element: <CreditOfficer /> },
    { path: '*', element: <Navigate to={path.CREDIT_OFFICER} replace /> }
  ]
};

export const OnFieldCreditOfficerRoutes: RouteObject = {
  path: path.CREDIT_OFFICER_LOANS,
  element: <ProutectedRoutes />,
  children: [
    {
      path: path.CREDIT_OFFICER_LOANS,
      element: <CreditOfficerLoans />
    },
    { path: path.CREDIT_OFFICER_TAKE_LOAN, element: <CreditOfficerTakeLoan /> },
    { path: path.CREDIT_OFFICER_PAY_LOAN, element: <CreditOfficerPayLoan /> },
    { path: path.CREDIT_OFFICER_USER_PROFILE, element: <CreditOfficerUserProfile /> },
    { path: '*', element: <Navigate to={path.CREDIT_OFFICER_LOANS} replace /> }
  ]
};
