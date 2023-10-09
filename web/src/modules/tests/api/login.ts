import api from "../../../api/api.config";
import { Admin } from "../../../models/admin";
import { Person } from "../../../models/person";
export type LoginData = {
  email: string;
  password: string;
};

export const login = async (
  data: LoginData
): Promise<Admin | Person | void> => {
  try {
    return api.get("auth/csrf").then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      api.post("auth/login", data).then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        return response.data;
      });
    });
  } catch (error) {
    return Promise.reject();
  }
};
