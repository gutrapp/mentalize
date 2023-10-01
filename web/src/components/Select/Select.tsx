import React from "react";

type Choice = {
  choice: string;
  value: string;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  choices: Choice[];
}

export const Select = ({ title, choices, value, onChange }: SelectProps) => {
  return (
    <div className="relative text-sm font-medium text-[#494949]">
      <h1 className="text-[#514456] bg-white absolute -top-3.5 ml-1 px-1">
        {title}
      </h1>
      <select
        value={value}
        onChange={onChange}
        className="inline-flex items-center justify-center rounded-md outline-none text-lg font-medium transition-colors ring-2 ring-[#9883a5] ring-offset-2"
      >
        {choices.map(({ choice, value }, i) => (
          <option key={i} value={value}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};
