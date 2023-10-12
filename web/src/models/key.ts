export type Key = {
  id: number;
  expired: "EX" | "VA";
  testTaken: "US" | "NU";
  test: "MB" | "SK" | "LO" | "LI";
  key: string;
  seen: "VI" | "NV";
  created_at: Date;
  expires_at: Date;
};
