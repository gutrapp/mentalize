import { Address } from "../../../models/address";
import { Cellphone } from "../../../models/cellphone";
import { Key } from "../../../models/key";
import { Life } from "../../../models/life";
import { LoveLanguage } from "../../../models/loveLanguage";
import { Mbti } from "../../../models/mbti";
import { Person } from "../../../models/person";
import { SelfKnowledge } from "../../../models/selfKnowledge";
import { User } from "../../../models/user";

export type PersonWithUser = Person & {
  user: User;
};

export type Params = {
  offset: string;
  limit: string;
  cpf: string;
  age: string;
  sex: "M" | "F" | "";
  full_name: string;
  email: string;
  telefone: string;
};

export type GetPerson = {
  id: number;
  person_id: string;
};

export type PersonResponse = Person & {
  user: User;
  keys: Key[];
  cellphone: Cellphone;
  address: Address;
  mbtis: Mbti[];
  sks: SelfKnowledge[];
  lifes: Life[];
  lls: LoveLanguage[];
};
