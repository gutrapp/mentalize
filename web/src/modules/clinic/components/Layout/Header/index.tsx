import { useContext } from "react";
import { ClinicContext } from "../../../../../context/ClinicContext";
import { BiLogOutCircle } from "react-icons/bi";
import { AdminContext } from "../../../../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/logout";

export const Header = () => {
  const router = useNavigate();

  const { getCurrentClinic, removeCurrentClinic } = useContext(ClinicContext);

  const { removeCurrentAdmin } = useContext(AdminContext);

  const handleLogout = async () => {
    await logout().then((response) => {
      if (response.status === 200) {
        removeCurrentClinic();
        removeCurrentAdmin();
        router("/admin");
      }
    });
  };

  return (
    <main className="h-[55px] z-20 w-full border-b bg-[#534559] font-bold fixed">
      <div className="h-full w-full text-[#BB926B] flex items-center justify-center text-4xl">
        <h1>{getCurrentClinic().name}</h1>
        <h1
          onClick={handleLogout}
          className="fixed text-lg right-0 mr-5 hover:cursor-pointer hover:bg-[#816F86] px-3 py-2 rounded-md flex items-center gap-2"
        >
          Sair
          <BiLogOutCircle size={25} />
        </h1>
      </div>
    </main>
  );
};
