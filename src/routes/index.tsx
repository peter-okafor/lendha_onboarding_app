import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthRoutes from './auth.routes';
import { CreditOfficerRoutes, OnFieldCreditOfficerRoutes } from './credit-officer.routes';
import { ProutectedRoutes } from './guards';
import { path } from './path';

const CreditOfficerCustomers = lazy(
  () => import('@/features/onfield-credit-officer/features/customer/Customers')
);
const CreditOfficerCustomerAddForm = lazy(
  () => import('@/features/onfield-credit-officer/features/customer/CustomerAddForm')
);

const CreditOfficerUserProfile = lazy(
  () => import('@/features/onfield-credit-officer/features/user-profile/UserProfile')
);

export default function LendhaRouter() {
  return useRoutes([
    AuthRoutes,
    CreditOfficerRoutes,
    OnFieldCreditOfficerRoutes,
    {
      path: path.CUSTOMERS,
      element: <ProutectedRoutes />,
      children: [
        { path: path.CUSTOMERS, element: <CreditOfficerCustomers /> },
        { path: path.CUSTOMER_NEW, element: <CreditOfficerCustomerAddForm /> },
        { path: path.CUSTOMER_PROFILE, element: <CreditOfficerUserProfile /> },
        { path: '*', element: <Navigate to={path.CUSTOMERS} replace /> }
      ]
    },
    {
      path: '*',
      element: <Navigate to={path.HOME} replace />
    }
  ]);
}
