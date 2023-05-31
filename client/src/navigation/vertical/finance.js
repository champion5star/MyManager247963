// ** Icons Import

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

export default [
  {
    id: 'finance',
    title: 'Finance',
    icon: <RiMoneyDollarBoxLine size={20} />,
    children: [
      {
        id: 'invoice',
        title: 'Invoice',
        icon: <RiMoneyDollarBoxLine size={20} />,
        navLink: '/invoice/list'
      },
      {
        id: 'income',
        title: 'Income',
        icon: <GiReceiveMoney size={20} />,
        navLink: '/finance/income'
      },
      {
        id: 'expense',
        title: 'Expense',
        icon: <GiPayMoney size={20} />,
        navLink: '/finance/expense'
      },
      {
        id: 'profitnloss',
        title: 'Profit & Loss',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/finance/pnl'
      }
    ]
  }
];
