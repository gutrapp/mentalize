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
    love_language: {
      id: 0,
      first: "AF",
      second: "PE",
      third: "SE",
      fourth: "TI",
      fifth: "TO",
      firstScore: 0,
      secondScore: 0,
      thirdScore: 0,
      fourthScore: 0,
      fifthScore: 0,
    },
    self_knowledge: {
      id: 0,
      first: "AU",
      second: "DI",
      third: "KI",
      fourth: "VI",
      firstScore: 0,
      secondScore: 0,
      thirdScore: 0,
      fourthScore: 0,
    },
    life: {
      id: 0,
      average: 0,
      total: 0,
      espiritual: 0,
      mente: 0,
      saude: 0,
      prosperidade: 0,
      carreira: 0,
      amor: 0,
      diversao: 0,
      dinheiro: 0,
      disciplina: 0,
      felicidade: 0,
      proposito: 0,
    },
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
