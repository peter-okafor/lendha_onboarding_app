import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { path } from './path';

// receiveables imports
const Receivables = lazy(() => import(`@/features/transactions/features/receivables/Receivables`));
const ReceivablesBankOptions = lazy(
  () => import('@/features/transactions/features/receivables/ReceiveMoneyOptions')
);
const ReceivablesBankTransfer = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/bank-transfer/ReceivablesBankTransfer'
    )
);

// debit card imports
const ReceivablesDebitCard = lazy(
  () =>
    import('@/features/transactions/features/receivables/features/debit-card/ReceivablesDebitCard')
);
const ReceivablesDebitCardList = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/debit-card/ReceivablesDebitCardList'
    )
);
const ReceivablesDebitCardForm = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/debit-card/ReceivablesDebitCardForm'
    )
);
const ReceivablesDebitCardSingle = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/debit-card/ReceivablesDebitCardSingle'
    )
);

const ReceivablesDebitCardAddMoney = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/debit-card/ReceivablesDebitCardAddMoney'
    )
);

// ussd imports
const ReceivablesUSSD = lazy(
  () => import('@/features/transactions/features/receivables/features/ussd/ReceivablesUSSD')
);
const ReceivablesUSSDGenerateCode = lazy(
  () =>
    import('@/features/transactions/features/receivables/features/ussd/ReceivablesUSSDGenerateCode')
);

// cash deposit imports
const ReceivablesCashDeposit = lazy(
  () =>
    import(
      '@/features/transactions/features/receivables/features/cash-deposit/ReceivablesCashDeposit'
    )
);

const ReceivablesRoutes: RouteObject = {
  path: path.TRANSACTIONS_RECEIVABLES,
  element: <Receivables />,
  children: [
    {
      path: path.TRANSACTIONS_RECEIVABLES,
      element: <ReceivablesBankOptions />
    },
    {
      path: path.TRANSACTIONS_RECEIVABLES_BANK_TRANSFER,
      element: <ReceivablesBankTransfer />
    },
    {
      path: path.TRANSACTIONS_RECEIVABLES_DEBIT_CARD,
      element: <ReceivablesDebitCard />,
      children: [
        {
          path: path.TRANSACTIONS_RECEIVABLES_DEBIT_CARD,
          element: <ReceivablesDebitCardList />
        },
        {
          path: path.TRANSACTIONS_RECEIVABLES_NEW_DEBIT_CARD,
          element: <ReceivablesDebitCardForm />
        },
        {
          path: path.TRANSACTIONS_RECEIVABLES_SINGLE_DEBIT_CARD,
          element: <ReceivablesDebitCardSingle />
        },
        {
          path: path.TRANSACTIONS_RECEIVABLES_DEBIT_CARD_ADD_MONEY,
          element: <ReceivablesDebitCardAddMoney />
        }
      ]
    },
    {
      path: path.TRANSACTIONS_RECEIVABLES_USSD,
      element: <ReceivablesUSSD />,
      children: [
        {
          path: path.TRANSACTIONS_RECEIVABLES_USSD,
          element: <ReceivablesUSSDGenerateCode />
        }
      ]
    },
    {
      path: path.TRANSACTIONS_RECEIVABLES_CASH_DEPOSIT,
      element: <ReceivablesCashDeposit />
    }
  ]
};

export default ReceivablesRoutes;
