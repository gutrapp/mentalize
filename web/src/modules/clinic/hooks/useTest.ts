import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { ResponseMbtiOne } from "../types/tests.type";
import { getMbti } from "../api/getTest";

export const useMbti = (test_id: string, test: string) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [mbti, setMbti] = useState<ResponseMbtiOne>({
    id: 0,
    first: "AR",
    second: "AR",
    third: "AR",
    fourth: "AR",
    firstScore: 0,
    secondScore: 0,
    thirdScore: 0,
    fourthScore: 0,
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
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        type: "P",
      },
    },
    result: {
      id: 0,
      expired: "EX",
      testTaken: "US",
      test: "MB",
      key: "",
      seen: "VI",
      created_at: "",
      expires_at: "",
    },
  });

  const fetchMbti = () => {
    getMbti({ id: getCurrentClinic().id, test_id, test }).then((response) => {
      setMbti(response);
    });
  };

  useEffect(fetchMbti, []);

  return { mbti };
};
