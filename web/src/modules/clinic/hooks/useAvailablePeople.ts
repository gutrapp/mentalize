import { useEffect, useState } from "react";
import { getAllPeople } from "../api/getAllPeople";
import { PersonWithUser } from "../types/person.types";

export const useAvailablePeople = (): {
  people: PersonWithUser[];
} => {
  const [people, setPeople] = useState<PersonWithUser[]>([]);

  useEffect(() => {
    getAllPeople().then((response) => {
      setPeople(response);
    });
  }, []);

  return { people };
};
