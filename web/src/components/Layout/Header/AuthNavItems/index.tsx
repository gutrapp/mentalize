import { Link, useNavigate } from "react-router-dom";
import { NavItem } from "../NavItem";
import api from "../../../../api/api.config";
import { useContext, useEffect, useState } from "react";
import { PersonContext } from "../../../../context/PersonContext";
import Cookies from "js-cookie";

export const AuthNavItems = () => {
  const router = useNavigate();

  const { removeCurrentPerson } = useContext(PersonContext);

  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    async function useSession() {
      await api
        .get("auth/session", {
          headers: { "X-CSRFToken": Cookies.get("csrftoken") },
        })
        .then((response) => {
          if (response.status === 200) setUser(!user);
        });
    }

    useSession();
  }, []);

  const handleLogout = async () => {
    await api
      .delete("auth/logout", {
        headers: { "X-CSRFToken": Cookies.get("csrftoken") },
      })
      .then((response) => {
        if (response.status !== 200) throw new Error("Couldn't log out");
        setUser(!user);
        removeCurrentPerson();
        router("/");
      });
  };

  return user ? (
    <NavItem content="Sair" onClick={() => handleLogout()} />
  ) : (
    <Link to={"/login"}>
      <NavItem content="Entrar" />
    </Link>
  );
};
