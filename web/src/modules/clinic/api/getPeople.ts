import { Person } from "../../../models/person";
import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";
import { User } from "../../../models/user";
import { Cellphone } from "../../../models/cellphone";
import { Address } from "../../../models/address";

export const getPeople = async (
  { id }: Clinic,
  url?: string
): Promise<
  (Person & { user: User; cellphone: Cellphone; address: Address })[]
> => {
  try {
    return api.get(`clinic/${id}/clinic_people${url}`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
