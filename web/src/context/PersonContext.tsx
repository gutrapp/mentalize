import React, { createContext, useCallback, useMemo } from "react";
import { Person } from "../models/person";

type PersonContextProviderProps = {
  children: React.ReactNode;
};

const emptyPerson: Person = { id: 0, age: 0, cpf: "", sex: "M" };

export const personContextInitial: PersonContextProps = {
  getCurrentPerson: () => emptyPerson,
  setCurrentPerson: () => {},
  removeCurrentPerson: () => {},
};

type PersonContextProps = {
  getCurrentPerson: () => Person;
  setCurrentPerson: (selectPerson: Person) => void;
  removeCurrentPerson: () => void;
};

export const PersonContext =
  createContext<PersonContextProps>(personContextInitial);

export const PersonContextProvider = ({
  children,
}: PersonContextProviderProps) => {
  const getCurrentPerson = useCallback((): Person => {
    const storedPerson = localStorage.getItem("person");
    if (!storedPerson) return emptyPerson;
    return JSON.parse(storedPerson) as Person;
  }, []);

  const setCurrentPerson = useCallback((selectPerson: Person) => {
    if (!!localStorage.getItem("person")) return;
    localStorage.setItem("person", JSON.stringify(selectPerson));
  }, []);

  const removeCurrentPerson = useCallback(() => {
    if (!localStorage.getItem("person")) return;
    localStorage.removeItem("person");
  }, []);

  const personContext = useMemo(() => {
    return {
      getCurrentPerson,
      setCurrentPerson,
      removeCurrentPerson,
    };
  }, []);

  return (
    <PersonContext.Provider value={personContext}>
      {children}
    </PersonContext.Provider>
  );
};
