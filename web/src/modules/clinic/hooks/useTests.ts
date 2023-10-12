import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getTests } from "../api/getTests";
import { Mbti } from "../../../models/mbti";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { LoveLanguage } from "../../../models/loveLanguage";
import { Life } from "../../../models/life";

export const useTests = (test: "MB" | "SK" | "LO" | "LI") => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [tests, setTests] = useState<
    (Mbti | SelfKnowledge | LoveLanguage | Life)[]
  >([]);

  useEffect(() => {
    getTests(getCurrentClinic(), test).then((response) => {
      setTests(response);
    });
  }, []);

  return { tests };
};
