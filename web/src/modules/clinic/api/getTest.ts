import api from "../../../api/api.config";
import { GetTest, ResponseMbtiOne } from "../types/tests.type";

export const getMbti = async ({
  id,
  test_id,
  test,
}: GetTest): Promise<ResponseMbtiOne> => {
  try {
    return api
      .get(`clinic/${id}/clinic_test/${test_id}/${test}`)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      });
  } catch (error) {
    return Promise.reject();
  }
};
