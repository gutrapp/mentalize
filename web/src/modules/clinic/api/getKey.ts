import api from "../../../api/api.config";
import { GetKey, KeyResponse } from "../types/keys.types";

export const getKey = async ({ id, key_id }: GetKey): Promise<KeyResponse> => {
  try {
    return api.get(`clinic/${id}/clinic_result/${key_id}`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
