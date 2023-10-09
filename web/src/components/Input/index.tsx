import React from "react";
import { cn } from "../../helpers/cn.helper";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const Input = ({
  title,
  type,
  onChange,
  value,
  className,
}: InputProps) => {
  return (
    <div className={cn("text-[#414042] relative text-sm", className)}>
      <h1 className="absolute text-[#534559] bg-white ml-1 px-1 -top-3.5">
        {title}
      </h1>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className="flex w-full items-center justify-center outline-none rounded-md text-lg font-medium ring-2 ring-[#534559] ring-offset-2"
      />
    </div>
  );
};
