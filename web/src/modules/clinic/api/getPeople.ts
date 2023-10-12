import { Person } from "../../../models/person";
import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";

export const getPeople = async ({ id }: Clinic): Promise<Person[]> => {
  try {
    return api.get(`result/clinic_people/${id}`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
