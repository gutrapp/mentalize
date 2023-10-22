import api from "../../../api/api.config";

export const logout = () => {
  return api.delete("auth/logout");
};
