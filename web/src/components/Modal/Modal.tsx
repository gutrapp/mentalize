import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button } from "../Button/Button";

type ModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  children: React.ReactNode;
};

export const Modal = ({ open, setOpen, children, label }: ModalProps) => {
  if (!open)
    return (
      <Button variant="outline" size="default" onClick={() => setOpen(!open)}>
        {label}
      </Button>
    );

  return (
    <div className="fixed flex inset-0 items-center justify-center h-screen bg-black backdrop-blur-sm text-[#494949] bg-opacity-70">
      <div className="bg-white rounded-md ring-2 ring-offset-2 ring-white px-10 py-5 w-min">
        <div>
          <button onClick={() => setOpen(!open)} className="text-[#514956]">
            <IoMdCloseCircleOutline size={30} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
