import React from "react";

type Choice = {
  choice: string;
  value: string;
};

interface DataTableSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  choices: Choice[];
}

export const DataTableSelect = ({
  choices,
  value,
  onChange,
}: DataTableSelectProps) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="inline-flex items-center justify-center outline-none text-md font-medium border-b-[#534559] border-2 border-white"
    >
      {choices.map(({ choice, value }, i) => (
        <option key={i} value={value}>
          {choice}
        </option>
      ))}
    </select>
  );
};
