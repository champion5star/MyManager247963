import { lazy } from "react";

const BlankPage = lazy(() => import("../../views/blankPage"))
const MemberPage = lazy(() => import("../../views/manageusers/members/list/index"))

const MyCMARoutes = [
    {
        path: "/events/tournament",
        element: <BlankPage />
    },
    {
        path: "/events/tournament",
        element: <BlankPage />
    },
    {
        path: "/events/testing",
        element: <BlankPage />
    },
    {
        path: "/events/instructor-college",
        element: <BlankPage />
    },
    {
        path: "/events/seminars",
        element: <BlankPage />
    },
    {
        path: "/events/others",
        element: <BlankPage />
    },
    {
        path: "/users/members",
        element: <MemberPage />
    },
    {
        path: "/users/operators",
        element: <BlankPage />
    },
    {
        path: "/users/admins",
        element: <BlankPage />
    },
    {
        path: "/other/locations",
        element: <BlankPage />
    },
    {
        path: "/other/faq",
        element: <BlankPage />
    },
    {
        path: "/other/online-courses",
        element: <BlankPage />
    }
] 

export default MyCMARoutes