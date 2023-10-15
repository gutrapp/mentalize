import { Clinics } from "../pages/Clinics";
import { Key } from "../pages/Dashboard/Key";
import { Keys } from "../pages/Dashboard/Keys";
import { People } from "../pages/Dashboard/People";
import { Person } from "../pages/Dashboard/Person";
import { Test } from "../pages/Dashboard/Test";
import { Tests } from "../pages/Dashboard/Tests";

export const CLINIC_ROUTES = [
  {
    route: "/clinic",
    element: <Clinics />,
  },
  {
    route: "/clinic/tests",
    element: <Tests />,
  },
  {
    route: "/clinic/tests/:id/:test",
    element: <Test />,
  },
  {
    route: "/clinic/keys",
    element: <Keys />,
  },
  {
    route: "/clinic/keys/:id",
    element: <Key />,
  },
  {
    route: "/clinic/people",
    element: <People />,
  },
  {
    route: "/clinic/people/:id",
    element: <Person />,
  },
];
