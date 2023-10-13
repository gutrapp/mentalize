import { useContext, useEffect, useRef, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getKeys } from "../api/getKeys";
import { KeyResponse, Params } from "../types/keys.types";

export const useKeys = (params: Params) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const url = useRef<string>("");

  const [keys, setKeys] = useState<KeyResponse[]>([]);

  const fetchKeys = (url?: string) => {
    getKeys(getCurrentClinic(), url).then((response) => {
      setKeys(response);
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      url.current = `?limit=${params.pagination}&offset=1`;
      const filters = Object.keys(params);
      filters.map((key, _) => {
        if (params[key] && key !== "pagination")
          url.current += `&${key}=${params[key]}`;
      });
      fetchKeys(url.current);
    }, 3000);
    return () => clearTimeout(delayDebounceFn);
  }, [params]);

  return { keys, fetchKeys };
};
