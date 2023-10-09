import api from "../../../api/api.config";
import { Admin } from "../../../models/admin";

export type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData): Promise<Admin | boolean> => {
  return (
    (await api.get("auth/csrf").then(async () => {
      api.post("auth/login", data).then((response) => response.data);
    })) || false
  );
};
