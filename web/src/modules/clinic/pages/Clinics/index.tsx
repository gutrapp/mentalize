import { useNavigate } from "react-router-dom";
import { useClinics } from "../../hooks/useClinics";
import { useContext } from "react";
import { ClinicContext } from "../../../../context/ClinicContext";
import { FaHouseChimneyMedical } from "react-icons/fa6";

export const Clinics = () => {
  const router = useNavigate();

  const { setCurrentClinic } = useContext(ClinicContext);

  const { clinics } = useClinics();

  const handleRedirectToClinic = (index: number) => {
    setCurrentClinic(clinics[index]);
    router("/clinic/keys");
  };

  return (
    <main className="max-h-full min-h-screen w-full flex justify-center flex-col gap-4 items-center text-[#414042] px-2 py-7 xl:px-0 xl:py-0">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-10 text-4xl font-headers">
          <h1 className="text-[#BB926B] font-bold">SUAS CLÍNICAS</h1>
        </div>

        <div className="flex flex-row gap-10">
          {clinics.map((clinic, index) => {
            return (
              <div
                onClick={() => handleRedirectToClinic(index)}
                className="flex justify-center items-center flex-col ring-2 hover:text-[#534559] duration-300 hover:scale-105 hover:ring-[#534559] ring-[#414042] shadow-2xl rounded-2xl px-8 py-4 hover:cursor-pointer"
              >
                <FaHouseChimneyMedical size={150} />
                <h1 className="text-3xl font-bold">{clinic.name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
