import { useContext, useEffect, useRef, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getTests } from "../api/getTests";
import {
  ParamsLife,
  ParamsLoveLanguage,
  ParamsSelfKnowledge,
  ResponseLife,
  ResponseLoveLanguage,
  ResponseMbti,
  ResponseSelfKnowledge,
} from "../types/tests.type";

import { ParamsMbti } from "../types/tests.type";

export const useMbtis = (params: ParamsMbti) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [tests, setTests] = useState<ResponseMbti[]>([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterTests = () => {
    const filters = Object.keys(params);
    url.current = "?";
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchTests();
  };

  const fetchTests = () => {
    getTests(getCurrentClinic(), "MB", url.current).then((response) => {
      setTests(response as ResponseMbti[]);
    });
  };

  useEffect(fetchTests, []);

  return { tests, filterTests };
};

export const useLife = (params: ParamsLife) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [tests, setTests] = useState<ResponseLife[]>([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterTests = () => {
    const filters = Object.keys(params);
    url.current = "?";
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchTests();
  };

  const fetchTests = () => {
    getTests(getCurrentClinic(), "LI", url.current).then((response) => {
      setTests(response as ResponseLife[]);
    });
  };

  useEffect(fetchTests, []);

  return { tests, filterTests };
};

export const useSelfKnowledge = (params: ParamsSelfKnowledge) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [tests, setTests] = useState<ResponseSelfKnowledge[]>([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterTests = () => {
    const filters = Object.keys(params);
    url.current = "?";
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchTests();
  };

  const fetchTests = () => {
    getTests(getCurrentClinic(), "SK", url.current).then((response) => {
      setTests(response as ResponseSelfKnowledge[]);
    });
  };

  useEffect(fetchTests, []);

  return { tests, filterTests };
};

export const useLoveLanguages = (params: ParamsLoveLanguage) => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [tests, setTests] = useState<ResponseLoveLanguage[]>([]);

  const url = useRef<string>("?limit=25&offset=0");

  const filterTests = () => {
    const filters = Object.keys(params);
    url.current = "?";
    filters.map((key, _) => {
      // @ts-ignore
      if (params[key]) url.current += `&${key}=${params[key]}`;
    });
    fetchTests();
  };

  const fetchTests = () => {
    getTests(getCurrentClinic(), "LO", url.current).then((response) => {
      setTests(response as ResponseLoveLanguage[]);
    });
  };

  useEffect(fetchTests, []);

  return { tests, filterTests };
};
