import { AdminContextProvider } from "../../../context/AdminContext";
import { ClinicContextProvider } from "../../../context/ClinicContext";
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
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Clinics />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/tests/",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Tests />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/tests/:id",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Test />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/keys",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Keys />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/keys/:id",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Key />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/people",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <People />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
  {
    route: "/clinic/people/:id",
    element: (
      <AdminContextProvider>
        <ClinicContextProvider>
          <Person />,
        </ClinicContextProvider>
      </AdminContextProvider>
    ),
  },
];
