import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getPeople } from "../api/getPeople";
import { Person } from "../../../models/person";

export const usePeople = () => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople(getCurrentClinic()).then((response) => {
      setPeople(response);
    });
  }, []);

  return { people };
};
