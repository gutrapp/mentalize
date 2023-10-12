import { Admin } from "../../../models/admin";
import { Clinic } from "../../../models/clinic";
import { Person } from "../../../models/person";
import { KeyResponse } from "../hooks/useKeys";

export type Params = {
  pagination: string;
};

export type Redirect = {
  id: number;
};

export type PersonRedirect = {
  person: Person;
};

export type TestRedirect = {
  key: KeyResponse;
};

export type KeyCreate = {
  key: string;
  test: "MB" | "SK" | "LO" | "LI";
  admin: Admin;
  clinic: Clinic;
};
