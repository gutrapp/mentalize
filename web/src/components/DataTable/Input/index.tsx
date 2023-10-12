import React from "react";

interface DataTableInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const DataTableInput = ({
  type,
  onChange,
  value,
  placeholder,
}: DataTableInputProps) => {
  return (
    <input
      type={type}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="flex w-full items-center justify-center outline-none text-md font-medium border-b-[#534559] border-2 border-white"
    />
  );
};
