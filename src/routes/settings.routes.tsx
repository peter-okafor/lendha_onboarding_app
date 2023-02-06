import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from './guards';
import { path } from './path';

const Settings = lazy(() => import('@/features/settings/Settings'));
const SettingsTransactionLimit = lazy(
  () => import('@/features/settings/features/transaction-limit/TransactionLimitSettings')
);
const SettingsPinManagement = lazy(
  () => import('@/features/settings/features/pin-management/SettingsPinManagement')
);
const PinManagementOptions = lazy(
  () => import('@/features/settings/features/pin-management/components/PinManagementOptions')
);
const PinManagementChange = lazy(
  () => import('@/features/settings/features/pin-management/components/PinManagementChange')
);
const PinManagementReset = lazy(
  () => import('@/features/settings/features/pin-management/components/PinManagementReset')
);
const SettingsPassword = lazy(
  () => import('@/features/settings/features/password/SettingsPassword')
);

const SettingsRoutes: RouteObject = {
  path: path.SETTINGS,
  element: <AuthGuard />,
  children: [
    { path: path.SETTINGS, element: <Settings /> },
    { path: path.SETTINGS_TRANSACTION_LIMIT, element: <SettingsTransactionLimit /> },
    {
      path: path.SETTINGS_PIN_MANAGEMENT,
      element: <SettingsPinManagement />,
      children: [
        {
          path: path.SETTINGS_PIN_MANAGEMENT,
          element: <PinManagementOptions />
        },
        {
          path: path.SETTINGS_PIN_MANAGEMENT_CHANGE_PIN,
          element: <PinManagementChange />
        },
        {
          path: path.SETTINGS_PIN_MANAGEMENT_RESET_PIN,
          element: <PinManagementReset />
        }
      ]
    },
    { path: path.SETTINGS_PASSWORD, element: <SettingsPassword /> },
    { path: '*', element: <Navigate to={path.SETTINGS} replace /> }
  ]
};

export default SettingsRoutes;
