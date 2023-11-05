import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import {
  ResponseLifeOne,
  ResponseLoveLanguageOne,
  ResponseMbtiOne,
  ResponseSelfKnowledgeOne,
} from "../types/tests.type";
import {
  getLife,
  getLoveLanguage,
  getMbti,
  getSelfKnowledge,
} from "../api/getTest";

export const useTest = (
  test_id: string,
  test: string
): {
  result:
    | ResponseMbtiOne
    | ResponseLifeOne
    | ResponseSelfKnowledgeOne
    | ResponseLoveLanguageOne;
} => {
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
        full_name: "",
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
  const [life, setLife] = useState<ResponseLifeOne>({
    id: 0,
    average: 0,
    total: 0,
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
  });
  const [selfKnowledge, setSelfKnowledge] = useState<ResponseSelfKnowledgeOne>({
    id: 0,
    first: "AU",
    fourth: "DI",
    second: "KI",
    third: "VI",
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
        full_name: "",
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
  const [loveLanguage, setLoveLanguage] = useState<ResponseLoveLanguageOne>({
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

  const fetchTest = () => {
    switch (test) {
      case "MB":
        getMbti({ id: getCurrentClinic().id, test_id, test }).then(
          (response) => {
            setMbti(response);
          }
        );
        break;
      case "LI":
        getLife({ id: getCurrentClinic().id, test_id, test }).then(
          (response) => {
            setLife(response);
          }
        );
        break;
      case "SK":
        getSelfKnowledge({ id: getCurrentClinic().id, test_id, test }).then(
          (response) => {
            setSelfKnowledge(response);
          }
        );
        break;
      case "LO":
        getLoveLanguage({ id: getCurrentClinic().id, test_id, test }).then(
          (response) => {
            setLoveLanguage(response);
          }
        );
        break;
    }
  };

  useEffect(fetchTest, [getCurrentClinic, test, test_id]);

  return {
    result:
      test === "MB"
        ? mbti
        : test === "SK"
        ? selfKnowledge
        : test === "LO"
        ? loveLanguage
        : life,
  };
};
