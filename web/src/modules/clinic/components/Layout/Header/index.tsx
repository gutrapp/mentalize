import { useContext } from "react";
import { ClinicContext } from "../../../../../context/ClinicContext";

export const Header = () => {
  const { getCurrentClinic } = useContext(ClinicContext);
  return (
    <main className="h-[55px] z-20 text-[#BB926B] w-full border-b bg-[#534559] font-bold fixed flex items-center justify-center text-4xl">
      {getCurrentClinic().name}
    </main>
  );
};
