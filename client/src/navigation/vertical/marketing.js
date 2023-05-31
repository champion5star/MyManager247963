// ** Icons Import
import { Facebook, Mail, MessageCircle, MessageSquare, Radio } from 'react-feather';
import { FaBullhorn } from 'react-icons/fa';

export default [
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <FaBullhorn size={20} />,
    children: [
      {
        id: 'automation',
        title: 'Automation',
        icon: <Mail size={20} />,
        navLink: '/apps/email/automation'
      },
      {
        id: 'email',
        title: 'Email',
        icon: <Mail size={20} />,
        navLink: '/apps/email'
      },
      {
        id: 'text',
        title: 'Text',
        icon: <MessageCircle size={20} />,
        navLink: '/apps/text'
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: <MessageSquare size={20} />,
        navLink: '/apps/chat'
      },
      {
        id: 'ticket',
        title: 'Ticket',
        icon: <MessageSquare size={20} />,
        navLink: '/apps/ticket'
      },
      {
        id: 'socialConnect',
        title: 'Social Connect',
        icon: <Facebook size={20} />,
        navLink: '/apps/socialconnect'
      },
      {
        id: 'reputation',
        title: 'Reputation',
        icon: <Radio size={20} />,
        navLink: '/apps/reputation'
      }
    ]
  }
];
