import api from "../../../api/api.config";
import { GetPerson, PersonResponse } from "../types/person.types";

export const getPerson = async ({
  id,
  person_id,
}: GetPerson): Promise<PersonResponse> => {
  try {
    return api
      .get(`clinic/${id}/clinic_person/${person_id}`)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      });
  } catch (error) {
    return Promise.reject();
  }
};
