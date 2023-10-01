import { Clinics } from "../pages/Clinics";
import { Test } from "../pages/Dashboard/Test";

export const CLINIC_ROUTES = [
  {
    route: "/clinic",
    element: <Clinics />,
  },
  {
    route: "/clinic/tests/:id",
    element: <Test />,
  },
];
