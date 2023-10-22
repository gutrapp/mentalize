import React, { createContext, useCallback, useMemo } from "react";

type Key = {
  id: number;
  expired: "EX" | "VA";
  testTaken: "US" | "NU";
  test: "MB" | "SK" | "LO" | "LI";
  key: string;
  seen: "VI" | "NV";
  created_at: string;
  clinic: number;
  expires_at: string;
};

type KeyContextProviderProps = {
  children: React.ReactNode;
};

const emptyKey: Key = {
  id: 0,
  created_at: "",
  expired: "VA",
  expires_at: "",
  key: "",
  seen: "NV",
  test: "MB",
  testTaken: "NU",
  clinic: 0,
};

type KeyContextProps = {
  getCurrentKey: () => Key;
  setCurrentKey: (selectKey: Key) => void;
  removeCurrentKey: () => void;
};

export const keyContextInitial: KeyContextProps = {
  getCurrentKey: () => emptyKey,
  setCurrentKey: () => {},
  removeCurrentKey: () => {},
};

export const KeyContext = createContext<KeyContextProps>(keyContextInitial);

export const KeyContextProvider = ({ children }: KeyContextProviderProps) => {
  const getCurrentKey = useCallback((): Key => {
    const storedKey = localStorage.getItem("key");
    if (!storedKey) {
      return emptyKey;
    }
    return JSON.parse(storedKey) as Key;
  }, []);

  const setCurrentKey = useCallback((selectKey: Key) => {
    if (!!localStorage.getItem("key")) return;
    localStorage.setItem("key", JSON.stringify(selectKey));
  }, []);

  const removeCurrentKey = useCallback(() => {
    if (!localStorage.getItem("key")) return;
    localStorage.removeItem("key");
  }, []);

  const keyContext = useMemo(() => {
    return {
      getCurrentKey,
      setCurrentKey,
      removeCurrentKey,
    };
  }, []);

  return (
    <KeyContext.Provider value={keyContext}>{children}</KeyContext.Provider>
  );
};
