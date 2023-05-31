// ** Icons Import
import { Circle } from 'react-feather'
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri'

export default [
    {
        id: 'contacts',
        title: 'Contacts',
        icon: <RiContactsBookLine size={20} />,
        children: [
            {
                id: 'client',
                title: 'Clients',
                icon: <RiContactsLine size={20} />,
                navLink: '/contacts/clients/list'
            },
            {
                id: 'employee',
                title: 'Employee',
                icon: <RiContactsLine size={20} />,
                children: [
                    {
                        id: 'myEmployee',
                        title: 'My Employee',
                        icon: <Circle size={12} />,
                        navLink: '/contacts/employee/list'
                    },
                    {
                        id: 'myForms',
                        title: 'My Forms',
                        icon: <Circle size={12} />,
                        navLink: '/apps/myforms'
                    },
                    {
                        id: 'schedule',
                        title: 'Schedule',
                        icon: <Circle size={12} />,
                        navLink: '/apps/schedule'
                    },
                    {
                        id: 'workhistory',
                        title: 'Work History',
                        icon: <Circle size={12} />,
                        navLink: '/apps/workhistory'
                    }
                ]
            },
            {
                id: 'leads',
                title: 'Leads',
                icon: <RiContactsLine size={20} />,
                navLink: '/contacts/leads/list'
            },
            {
                id: 'relationships',
                title: 'Relationships',
                icon: <RiContactsLine size={20} />,
                navLink: '/contacts/relationship/list'
            },
            {
                id: 'vendor',
                title: 'Vendor',
                icon: <RiContactsLine size={20} />,
                navLink: '/contacts/vendor/list'
            }
        ]
    }
]
