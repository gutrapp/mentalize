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
    <div className="w-full relative text-sm font-medium text-[#414042]">
      <h1 className="text-[#534559] bg-white absolute -top-3.5 ml-1 px-1">
        {title}
      </h1>
      <select
        value={value}
        onChange={onChange}
        className="w-full flex items-center justify-center rounded-md outline-none text-lg font-medium ring-2 ring-[#534559] ring-offset-2"
      >
        {choices.map(({ choice, value }, i) => (
          <option className="w-full block" key={i} value={value}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};
