import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getKeys } from "../api/getKeys";
import { KeyResponse } from "../types/keys.types";

export const useKeys = () => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [keys, setKeys] = useState<KeyResponse[]>([]);

  const fetchKeys = () => {
    getKeys(getCurrentClinic()).then((response) => {
      setKeys(response);
    });
  };

  useEffect(fetchKeys, []);

  return { keys, fetchKeys };
};
