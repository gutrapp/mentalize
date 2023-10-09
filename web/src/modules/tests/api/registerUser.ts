import api from "../../../api/api.config";
import { Address } from "../../../models/address";
import { Cellphone } from "../../../models/cellphone";
import { Person } from "../../../models/person";
import { User } from "../../../models/user";

export type RegisterUserData = {
  user: Omit<User, "id">;
  person: Omit<Person, "id">;
  cellphone: Omit<Cellphone, "id">;
  address: Omit<Address, "id">;
};

export const registerUser = async (
  data: RegisterUserData
): Promise<boolean | void> => {
  try {
    return api.get("auth/csrf").then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      api.post("auth/register", data).then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return true;
      });
    });
  } catch (error) {
    return Promise.reject();
  }
};
