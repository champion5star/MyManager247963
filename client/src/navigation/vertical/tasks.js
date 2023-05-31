// ** Icons Import
import { FaTasks } from 'react-icons/fa';
import { CheckCircle, Clock } from 'react-feather';

export default [
  {
    id: 'tasks',
    title: 'Tasks & Goals',
    icon: <FaTasks size={20} />,
    children: [
      {
        id: 'tasks',
        title: 'Tasks',
        icon: <Clock size={20} />,
        navLink: '/tasks'
      },
      {
        id: 'goals',
        title: 'Goals',
        icon: <CheckCircle size={20} />,
        navLink: '/goals'
      }
    ]
  }
];
