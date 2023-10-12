import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";
import { KeyResponse } from "../hooks/useKeys";

export const getKeys = async ({ id }: Clinic): Promise<KeyResponse[]> => {
  try {
    return api.get(`clinic/${id}/clinic_results`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
