import { Admin } from "../../../models/admin";
import { Clinic } from "../../../models/clinic";
import { Person } from "../../../models/person";
import { User } from "../../../models/user";
import { Mbti } from "../../../models/mbti";
import { Life } from "../../../models/life";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { LoveLanguage } from "../../../models/loveLanguage";
import { Address } from "../../../models/address";
import { Cellphone } from "../../../models/cellphone";

export type Params = {
  pagination: string;
  person: string;
  expired: "EX" | "" | "VA";
  testTaken: "US" | "" | "NU";
  key: string;
  seen: "VI" | "" | "NV";
  test: "MB" | "SK" | "LO" | "LI" | "";
  created_at: string;
  expires_at: string;
};

export type Redirect = {
  id: number;
};

export type KeyCreate = {
  key: string;
  test: "MB" | "SK" | "LO" | "LI";
  admin: Admin;
  clinic: Clinic;
};

export type GetKey = {
  id: number;
  key_id: string;
};

export type KeyTest = {
  id: number;
  expired: "EX" | "VA";
  testTaken: "US" | "NU";
  key: string;
  seen: "VI" | "NV";
  created_at: string;
  expires_at: string;
} & (
  | {
      test: "MB";
      mbti: Mbti;
    }
  | {
      test: "SK";
      selfknowledge: SelfKnowledge;
    }
  | {
      test: "LO";
      lovelanguage: LoveLanguage;
    }
  | {
      test: "LI";
      life: Life;
    }
);

export type KeyResponse = KeyTest & {
  person: Person & {
    address: Address[];
    cellphone: Cellphone[];
    user: User;
  };
};
