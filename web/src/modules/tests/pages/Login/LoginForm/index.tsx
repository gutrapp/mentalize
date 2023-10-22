import { Input } from "../../../../../components/Input";
import { FormEvent, useContext, useState } from "react";
import api from "../../../../../api/api.config";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Button/Button";
import { PersonContext } from "../../../../../context/PersonContext";

type LoginData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useNavigate();

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { setCurrentPerson } = useContext(PersonContext);

  const [error, setError] = useState<string>("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .get("auth/csrf")
      .then(() =>
        api.post("auth/login", data).then((response) => {
          if (response.status === 200) setCurrentPerson(response.data);
          else setError("Não foi possivel fazer login");
        })
      )
      .then(() => router("/tests"));
  };

  return (
    <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e1e1e1] to-white border-r-2 flex justify-center items-center w-full h-full">
      <main className="max-h-full min-h-screen w-full flex justify-center flex-col gap-4 items-center text-[#414042] px-2 py-7 xl:px-0 xl:py-0">
        <h1 className="text-3xl font-bold text-[#BB926B]">Login</h1>
        <form
          className="flex flex-col justify-center items-center gap-[2.5rem] bg-white rounded-md px-10 py-7 shadow-2xl border"
          onSubmit={(e) => handleLogin(e)}
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
    </div>
  );
};
