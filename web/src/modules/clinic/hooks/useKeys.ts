import { useContext, useEffect, useRef, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getKeys } from "../api/getKeys";
import { KeyResponse, Params } from "../types/keys.types";

export const useKeys = (params: Params) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [keys, setKeys] = useState<KeyResponse[]>([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterKeys = () => {
    url.current = "?";
    const filters = Object.keys(params);
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchKeys();
  };

  const fetchKeys = () => {
    getKeys(getCurrentClinic(), url.current).then((response) => {
      setKeys(response);
    });
  };

  useEffect(fetchKeys, []);

  return { keys, fetchKeys, filterKeys };
};
