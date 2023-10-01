import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const Input = ({ title, type, onChange, value }: InputProps) => {
  return (
    <div className="text-[#494949] relative text-sm">
      <h1 className="absolute text-[#9883a5] bg-white ml-1 px-1 -top-3.5">
        {title}
      </h1>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className="inline-flex items-center justify-center outline-none rounded-md text-lg font-medium transition-colors ring-2 ring-[#9883a5] ring-offset-2"
      />
    </div>
  );
};
