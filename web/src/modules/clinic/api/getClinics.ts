import api from "../../../api/api.config";
import { Admin } from "../../../models/admin";
import { Clinic } from "../../../models/clinic";

export const getClinics = async ({ group }: Admin): Promise<Clinic[]> => {
  try {
    switch (group) {
      case "C":
        return api
          .get("clinic/admin_clinics")
          .then((response) => response.data.results);
      case "G":
        return api.get("clinic").then((response) => response.data.results);
    }
  } catch (error) {
    return Promise.reject();
  }
};
