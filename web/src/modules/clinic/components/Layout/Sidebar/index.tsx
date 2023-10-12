import { FaKey } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { LuBrainCircuit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ClinicContext } from "../../../../../context/ClinicContext";

type SidebarProps = {
  children: React.ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  const router = useNavigate();

  const { removeCurrentClinic } = useContext(ClinicContext);

  return (
    <main className="flex flex-row font-medium h-full text-[#414042]">
      <div className="flex flex-col items-center justify-between text-2xl mr-3 pr-4 bg-white h-screen shadow-2xl border">
        <div className="w-full flex flex-col gap-[8px] mt-[65px]">
          <button
            onClick={() => router("/clinic/keys")}
            className="hover:text-[#534559] hover:bg-[#e1e1e1] duration-300 py-1 px-4 rounded-r-md w-full flex justify-start items-center gap-x-5"
          >
            <FaKey />
            Chaves
          </button>
          <button
            onClick={() => router("/clinic/people")}
            className="hover:text-[#534559] hover:bg-[#e1e1e1] duration-300 py-1 px-4 rounded-r-md w-full flex justify-start items-center gap-x-5"
          >
            <BsFillPersonFill />
            Pessoas
          </button>
          <button
            onClick={() => router("/clinic/tests")}
            className="hover:text-[#534559] hover:bg-[#e1e1e1] duration-300 py-1 px-4 rounded-r-md w-full flex justify-start items-center gap-x-5"
          >
            <LuBrainCircuit />
            Resultados
          </button>
        </div>
        <div className="pt-[8px] w-full mb-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              removeCurrentClinic();
              router("/clinic");
            }}
            className="hover:text-[#534559] hover:bg-[#e1e1e1] duration-300 py-1 px-4 rounded-r-md w-full flex justify-between items-center gap-x-5"
          >
            Sair
            <MdExitToApp />
          </button>
        </div>
      </div>
      {children}
    </main>
  );
};
