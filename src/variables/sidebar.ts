import { path } from '@/routes/path';
import { RiAccountBoxFill, RiGroupFill, RiHandCoinFill } from 'react-icons/ri';

export const SIDEBAR_WIDTH = '300px';

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
