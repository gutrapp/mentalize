import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./NavItem";
import { AuthNavItems } from "./AuthNavItems";

export const Header = () => {
  const { pathname } = useLocation();

  const [trigger, setTrigger] = useState<boolean>(false);
  const [fixed, setFixed] = useState<boolean>(false);

  const handleTrigger = () => {
    setTrigger(window.scrollY >= 95);
  };

  useEffect(() => {
    if (pathname !== "/") setFixed(true);
  }, [pathname]);

  window.addEventListener("scroll", handleTrigger);

  return (
    <header
      className={
        trigger
          ? "font-headers bg-[#1e2123] text-lg font-bold w-full hidden lg:flex lg:fixed text-white opacity-75 shadow-2xl duration-500"
          : fixed
          ? "h-[55px] z-20 w-full bg-[#534559] font-bold fixed text-[#BB926B] flex items-center justify-center text-4xl"
          : "font-headers bg-gradient-to-b from-[#1e2123] to-transparent  text-lg w-full hidden lg:flex lg:fixed font-bold text-white duration-500"
      }
    >
      <div className="mx-[300px] flex w-full h-[85px] items-center justify-between">
        <div>
          {fixed ? (
            <Link to={"/"}>
              <h1 className="flex text-4xl text-[#BB926B]">Mentallize</h1>
            </Link>
          ) : (
            <Link to={"/"}>
              <h1 className="flex text-4xl text-white/90 tracking-[2px]">
                JEAN <h1 className="text-[#BB926B]">CARLO</h1> CARDOZO
              </h1>
            </Link>
          )}
        </div>
        <div className="text-lg text-white/90">
          <NavItem href="#service" content="Serviços" />
          <Link to={"/tests"}>
            <NavItem content="Testes" />
          </Link>
          <NavItem href="#contact" content="Contato" />
          <AuthNavItems />
        </div>
      </div>
    </header>
  );
};
