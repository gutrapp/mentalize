export type Address = {
  id: number;
  cep: string;
  number: string;
  street: string;
  neighboorhood: string;
  city: string;
  state: StateChoices;
};

export type StateChoices =
  | "SC"
  | "RS"
  | "PR"
  | "SP"
  | "RJ"
  | "DF"
  | "MT"
  | "MS"
  | "GO"
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "ES"
  | "MG"
  | "MA"
  | "PA"
  | "PB"
  | "PE"
  | "PI"
  | "RN"
  | "RO"
  | "RR"
  | "SE"
  | "TO";
