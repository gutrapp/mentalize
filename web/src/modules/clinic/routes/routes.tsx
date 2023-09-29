import { Clinics } from "../pages/Clinics";
import { Keys } from "../pages/Dashboard/Keys";
import { Key } from "../pages/Dashboard/Key";
import { People } from "../pages/Dashboard/People";
import { Person } from "../pages/Dashboard/Person";
import { Tests } from "../pages/Dashboard/Tests";
import { Test } from "../pages/Dashboard/Test";

export const CLINIC_ROUTES = [
    {
        route: '/clinic',
        element: <Clinics />
    },
    {
        route: '/clinic/tests',
        element: <Tests />
    },
    {
        route: '/clinic/person',
        element: <People />
    },
    {
        route: '/clinic/key',
        element: <Keys />
    },
    {
        route: '/clinic/tests/:id',
        element: <Test />
    },
    {
        route: '/clinic/person/:id',
        element: <Person />
    },
    {
        route: '/clinic/key/:id',
        element: <Key />
    },
]