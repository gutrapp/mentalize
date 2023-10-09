import React, { createContext, useState } from "react";
import { Person } from "../models/person";

type PersonContextProviderProps = {
  children: React.ReactNode;
};

export const personInitialState: Person = {
  id: 0,
  cpf: "",
  age: 0,
  sex: "M",
};

export const PersonContext = createContext<{
  person: Person;
  setPerson: React.Dispatch<React.SetStateAction<Person>>;
}>({
  person: personInitialState,
  setPerson: () => {},
});

export const PersonContextProvider = ({
  children,
}: PersonContextProviderProps) => {
  const [person, setPerson] = useState<Person>(personInitialState);

  return (
    <PersonContext.Provider value={{ person, setPerson }}>
      {children}
    </PersonContext.Provider>
  );
};
