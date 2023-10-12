import { Clinic } from "../../../models/clinic";
import api from "../../../api/api.config";
import { Mbti } from "../../../models/mbti";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { LoveLanguage } from "../../../models/loveLanguage";
import { Life } from "../../../models/life";

export const getTests = async (
  { id }: Clinic,
  test: "MB" | "SK" | "LO" | "LI"
): Promise<(Mbti | SelfKnowledge | LoveLanguage | Life)[]> => {
  try {
    return api.get(`result/clinic_tests/${id}/${test}`).then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
