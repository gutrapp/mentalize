import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";
import { ResponseMbti } from "../types/tests.type";

export const getTests = async (
  { id }: Clinic,
  test: "MB" | "SK" | "LO" | "LI",
  url?: string
): Promise<ResponseMbti[]> => {
  try {
    return api
      .get(`clinic/${id}/clinic_tests/${test}${url}`)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      });
  } catch (error) {
    return Promise.reject();
  }
};
