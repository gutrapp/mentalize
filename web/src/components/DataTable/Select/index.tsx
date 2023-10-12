import React from "react";

type Choice = {
  choice: string;
  value: string;
};

interface DataTableSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  choices: Choice[];
  variant?: "default" | "min-w";
}

export const DataTableSelect = ({
  choices,
  value,
  onChange,
  variant = "default",
}: DataTableSelectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={
        variant === "default"
          ? "flex w-full items-center justify-center outline-none text-md font-medium border-b-[#534559] border-2 border-white"
          : "flex w-[5%] items-center justify-center outline-none text-md font-medium border-b-[#534559] border-2 border-white"
      }
    >
      {choices.map(({ choice, value }, i) => (
        <option key={i} value={value}>
          {choice}
        </option>
      ))}
    </select>
  );
};
