import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { AuthGuard } from './guards';
import { path } from './path';
import ReceivablesRoutes from './receivables.routes';

// transactions imports
const Transactions = lazy(() => import('@/features/transactions/Transaction'));
const TransactionSendMoney = lazy(
  () => import('@/features/transactions/features/send-money/TransactionSendMoney')
);
const TransactionAirtime = lazy(
  () => import('@/features/transactions/features/airtime/TransactionAirtime')
);
const TransactionBuyAirtime = lazy(
  () => import('@/features/transactions/features/airtime/TransactionAirtimeBuyAirtime')
);

const TransactionBills = lazy(
  () => import('@/features/transactions/features/bills/TransactionBills')
);

const TransactionRoutes: RouteObject = {
  path: path.TRANSACTIONS,
  element: <AuthGuard />,
  children: [
    { path: path.TRANSACTIONS, element: <Transactions /> },
    { path: path.TRANSACTIONS_SEND, element: <TransactionSendMoney /> },
    ReceivablesRoutes,
    {
      path: path.TRANSACTIONS_AIRTIME,
      element: <TransactionAirtime />,
      children: [
        {
          path: path.TRANSACTIONS_AIRTIME,
          element: <TransactionBuyAirtime />
        }
      ]
    },
    { path: path.TRANSACTIONS_BILLS, element: <TransactionBills /> },
    { path: '*', element: <Navigate to={path.TRANSACTIONS} replace /> }
  ]
};

export default TransactionRoutes;
