import api from "../../../api/api.config";
import { PersonWithUser } from "../types/person.types";

export const getAllPeople = async (): Promise<PersonWithUser[]> => {
  return await api.get("person").then((response) => {
    if (response.status === 200) return response.data.results;
  });
};
