import api from "../../../api/api.config";
import { Admin } from "../../../models/admin";
import { Clinic } from "../../../models/clinic";

export const getClinics = async (admin: Admin): Promise<Clinic[]> => {
  if (admin.group === "C")
    return await api
      .get("clinic/admin_clinics")
      .then((response) => response.data);
  else return await api.get("clinic").then((response) => response.data);
};
