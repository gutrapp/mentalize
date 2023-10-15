import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "../Button/Button";

type ModalProps = {
  open: boolean;
  Icon?: React.ElementType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  children: React.ReactNode;
};

export const Modal = ({ open, setOpen, children, label, Icon }: ModalProps) => {
  if (!open)
    return (
      <Button
        variant="outline"
        size="default"
        className="gap-2"
        onClick={() => setOpen(!open)}
      >
        {label}
        {Icon && <Icon />}
      </Button>
    );

  return (
    <div className="fixed flex inset-0 items-center justify-center h-screen z-40 bg-black backdrop-blur-sm text-[#414042] bg-opacity-70">
      <div className="bg-white rounded-md ring-2 ring-offset-2 ring-white px-10 py-5 w-[500px] h-fit">
        <div>
          <button onClick={() => setOpen(!open)} className="text-[#6C5873V]">
            <IoMdCloseCircleOutline size={30} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
