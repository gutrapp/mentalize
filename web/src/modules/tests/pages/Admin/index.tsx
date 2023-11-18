import { FormEvent, useContext, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../../../context/AdminContext";
import api from "../../../../api/api.config";

type LoginData = {
  email: string;
  password: string;
};

export const AdminLogin = () => {
  const router = useNavigate();

  const { setCurrentAdmin } = useContext(AdminContext);

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleLoginAdmin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      return api.get("auth/csrf").then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        api.post("auth/login", data).then((response) => {
          if (response.status !== 200) throw new Error(response.statusText);
          const { id, group, role } = response.data;
          setCurrentAdmin({ id, group, role });
          router("/clinic");
        });
      });
    } catch (error) {
      setError("Erro ao fazer login");
      return Promise.reject();
    }
  };

  return (
    <main className="max-h-full min-h-screen w-full flex justify-center flex-col gap-4 items-center text-[#414042] px-2 py-7 xl:px-0 xl:py-0">
      <h1 className="text-3xl font-bold text-[#BB926B]">Administradora</h1>
      <form
        className="flex flex-col justify-center items-center gap-[2.5rem] rounded-md px-10 py-7 shadow-2xl border"
        onSubmit={(e) => handleLoginAdmin(e)}
      >
        <div className="flex flex-col gap-[2rem]">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 text-[#534559]">
            Informações de login:
          </h1>
          {error && (
            <h1 className="text-md px-2 font-semibold text-red-500 ring-2 ring-red-500 ring-offset-2 rounded-md">
              {error}
            </h1>
          )}
          <Input
            title="Email:"
            type="text"
            value={data.email}
            onChange={(e) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
          />
          <Input
            title="Senha:"
            type="password"
            value={data.password}
            onChange={(e) => {
              setData({
                ...data,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <Button size="default" variant="default">
            Entrar
          </Button>
        </div>
      </form>
    </main>
  );
};
