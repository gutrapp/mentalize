import { useContext, useEffect, useRef, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getPeople } from "../api/getPeople";
import { Person } from "../../../models/person";
import { Params } from "../types/person.types";
import { User } from "../../../models/user";
import { Cellphone } from "../../../models/cellphone";
import { Address } from "../../../models/address";

export const usePeople = (params: Params) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [people, setPeople] = useState<
    (Person & { user: User; cellphone: Cellphone; address: Address })[]
  >([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterPeople = () => {
    const filters = Object.keys(params);
    url.current = "?";
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchPeople();
  };

  const fetchPeople = () => {
    getPeople(getCurrentClinic(), url.current).then((response) => {
      setPeople(response);
    });
  };

  useEffect(fetchPeople, []);

  return { people, filterPeople, fetchPeople };
};
