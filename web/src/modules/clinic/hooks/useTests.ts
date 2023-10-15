import { useContext, useEffect, useRef, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getTests } from "../api/getTests";
import { ResponseMbti } from "../types/tests.type";

import { Params } from "../types/tests.type";

export const useTests = (test: "MB" | "SK" | "LO" | "LI", params: Params) => {
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
    getTests(getCurrentClinic(), test, url.current).then((response) => {
      setTests(response);
    });
  };

  useEffect(fetchTests, []);

  return { tests, filterTests };
};
