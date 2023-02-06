import { path } from '@/routes/path';
import {
  RiAccountBoxFill,
  RiExchangeFill,
  RiFileList3Fill,
  RiGroupFill,
  RiHandCoinFill,
  RiMoneyDollarCircleFill,
  RiSettings2Fill,
  RiStackFill
} from 'react-icons/ri';

export const SIDEBAR_WIDTH = '300px';

export const SIDEBAR_MENUS = [
  {
    name: 'Wallet',
    route: path.WALLET,
    icon: RiMoneyDollarCircleFill
  },
  {
    name: 'Transactions',
    route: path.TRANSACTIONS,
    icon: RiExchangeFill
  },
  { name: 'Invoice', route: path.INVOICES, icon: RiFileList3Fill },
  {
    name: 'Stock management',
    route: path.STOCK_MANAGEMENT,
    icon: RiStackFill
  },
  {
    name: 'Settings',
    route: path.SETTINGS,
    icon: RiSettings2Fill
  },
  {
    name: 'Credit Officer',
    route: path.CREDIT_OFFICER,
    icon: RiAccountBoxFill
  }
];

export const CREDIT_OFFICER_SIDEBAR_MENUS = [
  {
    name: 'Customers',
    route: path.CUSTOMERS,
    icon: RiGroupFill
  },
  {
    name: 'Loans',
    route: path.CREDIT_OFFICER_LOANS,
    icon: RiHandCoinFill
  },
  {
    name: 'Credit officer',
    route: path.CREDIT_OFFICER,
    icon: RiAccountBoxFill
  }
];
