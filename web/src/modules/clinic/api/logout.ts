import api from "../../../api/api.config";
import Cookies from "js-cookie";

export const logout = () => {
  return api.delete("auth/logout", {
    headers: { "X-CSRFToken": Cookies.get("csrftoken") },
  });
};
