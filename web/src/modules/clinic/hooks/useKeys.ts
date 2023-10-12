import { useContext, useEffect, useState } from "react";
import { ClinicContext } from "../../../context/ClinicContext";
import { getKeys } from "../api/getKeys";
import { Key } from "../../../models/key";
import { Person } from "../../../models/person";
import { User } from "../../../models/user";
import { Mbti } from "../../../models/mbti";
import { Life } from "../../../models/life";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { LoveLanguage } from "../../../models/loveLanguage";

export type KeyResponse = Key & {
  mbti: Mbti;
  life: Life;
  self_knowledge: SelfKnowledge;
  love_language: LoveLanguage;
  person: Person & {
    user: User;
  };
};

export const useKeys = () => {
  const { getCurrentClinic } = useContext(ClinicContext);

  const [keys, setKeys] = useState<KeyResponse[]>([]);

  const fetchKeys = () => {
    getKeys(getCurrentClinic()).then((response) => {
      setKeys(response);
    });
  };

  useEffect(fetchKeys, []);

  return { keys, fetchKeys };
};
