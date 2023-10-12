import { Person } from "../../../models/person";
import { User } from "../../../models/user";

export type PersonWithUser = Person & {
  user: User;
};
