import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getPerson } from "../api/getPerson";
import { PersonResponse } from "../types/person.types";

export const usePerson = (person_id: string) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [person, setPerson] = useState<PersonResponse>({
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
    keys: [],
    lifes: [],
    lls: [],
    mbtis: [],
    sks: [],
  });

  const fetchPerson = () => {
    getPerson({ id: getCurrentClinic().id, person_id }).then((response) => {
      setPerson(response);
    });
  };

  useEffect(fetchPerson, []);

  return { person };
};
