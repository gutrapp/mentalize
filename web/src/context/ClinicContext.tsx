import React, { createContext, useCallback, useMemo } from "react";
import { Clinic } from "../models/clinic";
import { useNavigate } from "react-router-dom";

type ClinicContextProviderProps = {
  children: React.ReactNode;
};

const emptyClinic: Clinic = { id: 0, name: "" };

export const clinicContextInitial: ClinicContextProps = {
  getCurrentClinic: () => emptyClinic,
  setCurrentClinic: () => {},
  removeCurrentClinic: () => {},
};

type ClinicContextProps = {
  getCurrentClinic: () => Clinic;
  setCurrentClinic: (selectClinic: Clinic) => void;
  removeCurrentClinic: () => void;
};

export const ClinicContext =
  createContext<ClinicContextProps>(clinicContextInitial);

export const ClinicContextProvider = ({
  children,
}: ClinicContextProviderProps) => {
  const router = useNavigate();

  const getCurrentClinic = useCallback((): Clinic => {
    const storedClinic = localStorage.getItem("clinic");
    if (!storedClinic) {
      router("/");
      return emptyClinic;
    }
    return JSON.parse(storedClinic) as Clinic;
  }, []);

  const setCurrentClinic = useCallback((selectClinic: Clinic) => {
    if (!!localStorage.getItem("clinic")) return;
    localStorage.setItem("clinic", JSON.stringify(selectClinic));
  }, []);

  const removeCurrentClinic = useCallback(() => {
    if (!localStorage.getItem("clinic")) return;
    localStorage.removeItem("clinic");
  }, []);

  const clinicContext = useMemo(() => {
    return {
      getCurrentClinic,
      setCurrentClinic,
      removeCurrentClinic,
    };
  }, []);

  return (
    <ClinicContext.Provider value={clinicContext}>
      {children}
    </ClinicContext.Provider>
  );
};
