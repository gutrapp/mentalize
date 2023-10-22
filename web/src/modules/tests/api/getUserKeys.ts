import api from "../../../api/api.config";

export const getUserKeys = () => {
  try {
    return api.get("person/get_current_user_results").then((response) => {
      if (response.status !== 200) throw new Error(response.statusText);
      return response.data;
    });
  } catch (error) {
    return Promise.reject();
  }
};
