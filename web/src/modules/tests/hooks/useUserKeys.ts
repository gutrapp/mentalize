import { useEffect, useState } from "react";
import { UserResult } from "../types/test.types";
import { getUserKeys } from "../api/getUserKeys";

export const useUserKeys = () => {
  const [keys, setKeys] = useState<UserResult[]>([]);

  const fetchKeys = () => {
    getUserKeys().then((response) => {
      setKeys(response);
    });
  };

  useEffect(fetchKeys, []);

  return { keys };
};
