import React, { createContext, useCallback, useMemo } from "react";
import { Admin } from "../models/admin";
import { useNavigate } from "react-router-dom";

type AdminContextProviderProps = {
  children: React.ReactNode;
};

const emptyAdmin: Admin = { id: 0, group: "C", role: "O" };

export const adminContextInitial: AdminContextProps = {
  getCurrentAdmin: () => emptyAdmin,
  setCurrentAdmin: () => {},
  removeCurrentAdmin: () => {},
};

type AdminContextProps = {
  getCurrentAdmin: () => Admin;
  setCurrentAdmin: (selectAdmin: Admin) => void;
  removeCurrentAdmin: () => void;
};

export const AdminContext =
  createContext<AdminContextProps>(adminContextInitial);

export const AdminContextProvider = ({
  children,
}: AdminContextProviderProps) => {
  const router = useNavigate();

  const getCurrentAdmin = useCallback((): Admin => {
    const storedAdmin = localStorage.getItem("admin");
    if (!storedAdmin) {
      router("/");
      return emptyAdmin;
    }
    return JSON.parse(storedAdmin) as Admin;
  }, []);

  const setCurrentAdmin = useCallback((selectAdmin: Admin) => {
    if (!!localStorage.getItem("admin")) return;
    localStorage.setItem("admin", JSON.stringify(selectAdmin));
  }, []);

  const removeCurrentAdmin = useCallback(() => {
    if (!localStorage.getItem("admin")) return;
    localStorage.removeItem("admin");
  }, []);

  const adminContext = useMemo(() => {
    return {
      getCurrentAdmin,
      setCurrentAdmin,
      removeCurrentAdmin,
    };
  }, []);

  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
};
