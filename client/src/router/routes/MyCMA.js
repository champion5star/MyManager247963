// ** React Imports
import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const MyCMARoutes = [
    {
        path: '/mycma/myaccount',
        component: lazy(() => import('../../views/blank_page'))
    },
    {
        path: '/mycma/members',
        component: lazy(() => import('../../views/blank_page'))
    },
    {
        path: '/mycma/onlineuniv/:univ',
        component: lazy(() => import('../../views/blank_page'))
    },
    {
        path: '/mycma/event',
        component: lazy(() => import('../../views/blank_page'))
    },
    {
        path: '/mycma/faq',
        component: lazy(() => import('../../views/blank_page'))
    }
]

export default MyCMARoutes
