import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";
import { KeyResponse } from "../types/keys.types";

export const getKeys = async (
  { id }: Clinic,
  url?: string
): Promise<KeyResponse[]> => {
  try {
    return api.get(`clinic/${id}/clinic_results${url}`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
