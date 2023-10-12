import React, { useState } from "react";
import { User } from "../../../../models/user";
import { Person } from "../../../../models/person";
import { Address, StateChoices } from "../../../../models/address";
import { Cellphone } from "../../../../models/cellphone";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select/Select";
import { Button } from "../../../../components/Button/Button";
import api from "../../../../api/api.config";

type ErrorType = {
  section: "address" | "info" | "cellphone";
  msg: string;
};

const STATE_CHOICES = [
  { value: "SC", choice: "Santa Catarina" },
  { value: "RS", choice: "Rio Grande do Sul" },
  { value: "PR", choice: "Paraná" },
  { value: "SP", choice: "São Paulo" },
  { value: "RJ", choice: "Rio de Janeiro" },
  { value: "DF", choice: "Distrito Federal" },
  { value: "MT", choice: "Mato Grosso" },
  { value: "MS", choice: "Mato Grosso do Sul" },
  { value: "GO", choice: "Goiás" },
  { value: "AC", choice: "Acre" },
  { value: "AL", choice: "Alagoas" },
  { value: "AP", choice: "Amapá" },
  { value: "AM", choice: "Amazonas" },
  { value: "BA", choice: "Bahia" },
  { value: "CE", choice: "Ceará" },
  { value: "ES", choice: "Espirito Santo" },
  { value: "MG", choice: "Minas Gerais" },
  { value: "MA", choice: "Maranhão" },
  { value: "PA", choice: "Pará" },
  { value: "PB", choice: "Paraíba" },
  { value: "PE", choice: "Pernambuco" },
  { value: "PI", choice: "Piauí" },
  { value: "RN", choice: "Rio Grande do Norte" },
  { value: "RO", choice: "Rôndonia" },
  { value: "RR", choice: "Roraima" },
  { value: "SE", choice: "Sergipe" },
  { value: "TO", choice: "Tocantins" },
];

const TELEFONE_CHOICES = [
  {
    value: "MO",
    choice: "Celular",
  },
  {
    value: "FX",
    choice: "Fixo",
  },
];

const SEX_CHOICES = [
  {
    choice: "Masculino",
    value: "M",
  },
  {
    choice: "Feminino",
    value: "F",
  },
];

export const Register = () => {
  const router = useNavigate();

  const [user, setUser] = useState<Omit<User, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    type: "P",
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [person, setPerson] = useState<Omit<Person, "id">>({
    cpf: "",
    age: 0,
    sex: "M",
  });

  const [address, setAddress] = useState<Omit<Address, "id">>({
    cep: "",
    number: "",
    street: "",
    neighboorhood: "",
    city: "",
    state: "SC",
  });

  const [cellphone, setCellphone] = useState<Omit<Cellphone, "id">>({
    ddd: "",
    telefone: "",
    type: "FX",
  });

  const [error, setError] = useState<ErrorType>({
    section: "info",
    msg: "",
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
      setError({ section: "info", msg: "Senhas não coincidem" });
      return;
    }

    if (person.cpf.length !== 11) {
      setError({ section: "info", msg: "CPF inválido" });
      return;
    }

    if (address.cep.length !== 8) {
      setError({ section: "address", msg: "CEP inválido" });
      return;
    }

    if (
      (cellphone.type === "MO" && cellphone.telefone.length > 9) ||
      !cellphone.telefone
    ) {
      setError({ section: "cellphone", msg: "Telefone inválido" });
      return;
    }

    try {
      return api.get("auth/csrf").then((response) => {
        if (response.status !== 200) throw new Error(response.statusText);
        api
          .post("auth/register", {
            ...user,
            ...person,
            ...cellphone,
            ...address,
          })
          .then((response) => {
            if (response.status !== 200) throw new Error(response.statusText);
            router("/login");
          });
      });
    } catch (error) {
      return Promise.reject();
    }
  };

  return (
    <main className="max-h-full min-h-screen w-full flex justify-center flex-col gap-4 items-center text-[#414042] px-2 py-7 xl:px-0 xl:py-0">
      <h1 className="text-3xl font-bold text-[#BB926B]">REGISTRE-SE</h1>
      <form
        className="flex flex-col justify-center items-center gap-[2.5rem] rounded-md px-10 py-7 shadow-2xl border"
        onSubmit={(e) => handleRegister(e)}
      >
        <div className="flex flex-col xl:flex-row gap-[1.5rem] xl:gap-10">
          <div className="flex flex-col gap-[2rem]">
            <h1 className="font-bold text-lg border-[#534559] border-b-2 text-[#534559]">
              Informações Gerais:
            </h1>
            {error.msg && error.section === "info" && (
              <h1 className="text-md px-2 font-semibold text-red-500 ring-2 ring-red-500 ring-offset-2 rounded-md">
                {error.msg}
              </h1>
            )}
            <div className="flex flex-row gap-[1.2rem]">
              <Input
                title="Nome:"
                type="text"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
              <Input
                title="Sobrenome:"
                type="text"
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </div>
            <Input
              title="CPF:"
              type="text"
              value={cpfFormatacao(person.cpf)}
              onChange={(e) => {
                setPerson({
                  ...person,
                  cpf: e.target.value,
                });
              }}
            />
            <Input
              title="Email:"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className="flex flex-row">
              <Input
                title="Idade:"
                className="mr-5"
                type="text"
                value={person.age || 0}
                onChange={(e) =>
                  setPerson({ ...person, age: parseInt(e.target.value) })
                }
              />
              <Select
                title="Sexo:"
                value={person.sex}
                onChange={(e) =>
                  setPerson({
                    ...person,
                    sex: e.target.value as "M" | "F",
                  })
                }
                choices={SEX_CHOICES}
              />
            </div>
            <Input
              title="Senha:"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Input
              title="Confirmar senha:"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-[1.5rem]">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 text-[#534559]">
                Endereço:
              </h1>
              {error.msg && error.section === "address" && (
                <h1 className="text-md px-2 font-semibold text-red-500 ring-2 ring-red-500 ring-offset-2 rounded-md">
                  {error.msg}
                </h1>
              )}
              <div className="flex flex-row gap-[1.2rem]">
                <Input
                  title="Número:"
                  type="text"
                  value={address.number}
                  onChange={(e) =>
                    setAddress({ ...address, number: e.target.value })
                  }
                />
                <Input
                  title="Rua:"
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row gap-[1.2rem]">
                <Input
                  title="Bairro:"
                  type="text"
                  value={address.neighboorhood}
                  onChange={(e) =>
                    setAddress({ ...address, neighboorhood: e.target.value })
                  }
                />
                <Input
                  title="Cidade:"
                  type="text"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-row">
                <Input
                  title="CEP:"
                  className="mr-5"
                  type="text"
                  value={cepFormatacao(address.cep)}
                  onChange={(e) =>
                    setAddress({ ...address, cep: e.target.value })
                  }
                />
                <Select
                  title="Estado:"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      state: e.target.value as StateChoices,
                    })
                  }
                  choices={STATE_CHOICES}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[1.5rem]">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 text-[#534559]">
                Telefone:
              </h1>
              {error.msg && error.section === "cellphone" && (
                <h1 className="text-md px-2 font-semibold text-red-500 ring-2 ring-red-500 ring-offset-2 rounded-md">
                  {error.msg}
                </h1>
              )}
              <Select
                title="Tipo:"
                value={cellphone.type}
                onChange={(e) =>
                  setCellphone({
                    ...cellphone,
                    type: e.target.value as "MO" | "FX",
                  })
                }
                choices={TELEFONE_CHOICES}
              />
              <div className="flex flex-row gap-[1.2rem]">
                <Input
                  title="DDD:"
                  type="text"
                  value={cellphone.ddd}
                  onChange={(e) =>
                    setCellphone({ ...cellphone, ddd: e.target.value })
                  }
                />
                <Input
                  title="Celular:"
                  type="text"
                  value={cellphone.telefone}
                  onChange={(e) =>
                    setCellphone({ ...cellphone, telefone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button variant="default" size="default">
            Registrar
          </Button>
        </div>
      </form>
    </main>
  );
};

export const cpfFormatacao = (value: string) => {
  if (!value) return "";
  if (!value.match(/[0-9]+/)) return "";
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const cepFormatacao = (value: string) => {
  if (!value) return "";
  if (!value.match(/[0-9]+/)) return "";
  return value.replace(/(\d{5})(\d{3})/, "$1-$2");
};
