import { Address } from "../../../models/address";
import { Cellphone } from "../../../models/cellphone";
import { Key } from "../../../models/key";
import { Life } from "../../../models/life";
import { LoveLanguage } from "../../../models/loveLanguage";
import { Mbti } from "../../../models/mbti";
import { Person } from "../../../models/person";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { User } from "../../../models/user";

export type GetTest = {
  id: number;
  test_id: string;
  test: string;
};

export type ParamsMbti = {
  first: "AR" | "EA" | "" | "FI" | "WA";
  second: "AR" | "EA" | "" | "FI" | "WA";
  firstScore: string;
  secondScore: string;
  full_name: string;
  email: string;
  key: string;
  limit: string;
  offset: string;
};

export type ParamsLife = {
  average: string;
  total: string;
  full_name: string;
  email: string;
  key: string;
  limit: string;
  offset: string;
};

export type ParamsSelfKnowledge = {
  first: "VI" | "AU" | "DI" | "KI" | "";
  second: "VI" | "AU" | "DI" | "KI" | "";
  firstScore: string;
  secondScore: string;
  full_name: string;
  email: string;
  key: string;
  limit: string;
  offset: string;
};

export type ParamsLoveLanguage = {
  first: "AF" | "SE" | "PE" | "TI" | "TO" | "";
  second: "AF" | "SE" | "PE" | "TI" | "TO" | "";
  firstScore: string;
  secondScore: string;
  full_name: string;
  email: string;
  key: string;
  limit: string;
  offset: string;
};

export type ResponseMbti = Mbti & {
  result: Key;
  user: User;
};

export type ResponseLife = Life & {
  result: Key;
  user: User;
};

export type ResponseSelfKnowledge = SelfKnowledge & {
  result: Key;
  user: User;
};

export type ResponseLoveLanguage = LoveLanguage & {
  result: Key;
  user: User;
};

export type ResponseMbtiOne = Mbti & {
  result: Key;
  person: Person & {
    user: User;
    cellphone: Cellphone;
    address: Address;
  };
};

export type ResponseLifeOne = Life & {
  result: Key;
  person: Person & {
    user: User;
    cellphone: Cellphone;
    address: Address;
  };
};

export type ResponseLoveLanguageOne = LoveLanguage & {
  result: Key;
  person: Person & {
    user: User;
    cellphone: Cellphone;
    address: Address;
  };
};

export type ResponseSelfKnowledgeOne = SelfKnowledge & {
  result: Key;
  person: Person & {
    user: User;
    cellphone: Cellphone;
    address: Address;
  };
};
