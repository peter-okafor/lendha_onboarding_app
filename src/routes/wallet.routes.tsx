import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from './guards';
import { path } from './path';

const Wallet = lazy(() => import('@/features/wallet/Wallet'));
const WalletPayLoan = lazy(() => import('@/features/wallet/features/pay-loan/WalletPayLoan'));
const WalletTopUpLoan = lazy(
  () => import('@/features/wallet/features/top-up-loan/WalletTopUpLoan')
);
const WalletTakeLoan = lazy(() => import('@/features/wallet/features/take-loan/WalletTakeLoan'));

const WalletRoutes: RouteObject = {
  path: path.WALLET,
  element: <AuthGuard />,
  children: [
    { path: path.WALLET, element: <Wallet /> },
    { path: path.WALLET_PAY_LOAN, element: <WalletPayLoan /> },
    { path: path.WALLET_TOP_UP_LOAN, element: <WalletTopUpLoan /> },
    { path: path.WALLET_TAKE_LOAN, element: <WalletTakeLoan /> },
    { path: '*', element: <Navigate to={path.WALLET} replace /> }
  ]
};

export default WalletRoutes;
