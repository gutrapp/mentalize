import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { KeyResponse } from "../types/keys.types";
import { getKey } from "../api/getKey";

export const useKey = (key_id: string) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [key, setKey] = useState<KeyResponse>({
    id: 0,
    expired: "EX",
    testTaken: "US",
    test: "MB",
    key: "",
    seen: "VI",
    created_at: "",
    expires_at: "",
    mbti: {
      id: 0,
      first: "AR",
      second: "EA",
      third: "FI",
      fourth: "WA",
      firstScore: 0,
      secondScore: 0,
      thirdScore: 0,
      fourthScore: 0,
    },
    person: {
      id: 0,
      cpf: "",
      age: 0,
      sex: "F",
      address: {
        id: 0,
        cep: "",
        number: "",
        street: "",
        neighboorhood: "",
        city: "",
        state: "AC",
      },
      cellphone: {
        id: 0,
        ddd: "",
        telefone: "",
        type: "FX",
      },
      user: {
        id: 0,
        full_name: "",
        email: "",
        password: "",
        type: "P",
      },
    },
  });

  const fetchKey = () => {
    getKey({ id: getCurrentClinic().id, key_id }).then((response) => {
      setKey(response);
    });
  };

  useEffect(fetchKey, []);

  return { key };
};
