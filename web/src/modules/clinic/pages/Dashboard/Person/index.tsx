import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { usePerson } from "../../../hooks/usePerson";
import {
  cepFormatacao,
  cpfFormatacao,
} from "../../../../../helpers/formatters.helper";
import {
  EXPIRATION_DICT,
  MBTI_DICT,
  SEX_DICT,
  STATE_DICT,
  TELEFONE_DICT,
  TEST_DICT,
} from "../../../../../helpers/dict.helper";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useState } from "react";
import { Mbti } from "../../../../../models/mbti";
import { IoWarningOutline } from "react-icons/io5";

export const Person = () => {
  const router = useNavigate();

  const { id } = useParams();

  const { person } = usePerson(id as string);

  const handleCopyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
  };

  const [selectTest, setSelectTest] = useState<"MB" | "LI" | "LO" | "SK">("MB");

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium mb-10">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">
            {person.user.first_name} {person.user.last_name}
          </h1>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Informações da Pessoa:
              </h1>
              <div className="flex flex-col gap-1">
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                  onClick={() =>
                    handleCopyText(
                      `${person.user.first_name} ${person.user.last_name}`
                    )
                  }
                >
                  Nome: {person.user.first_name} {person.user.last_name}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(cpfFormatacao(person.cpf))}
                >
                  CPF: {cpfFormatacao(person.cpf)}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(person.user.email)}
                >
                  Email: {person.user.email}
                </label>
                <label
                  onClick={() => handleCopyText(person.age.toString())}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Idade: {person.age}
                </label>
                <label
                  onClick={() => handleCopyText(SEX_DICT[person.sex])}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Sexo: {SEX_DICT[person.sex]}
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Telefone:
              </h1>

              <div className="flex flex-col gap-1">
                <label
                  onClick={() =>
                    handleCopyText(TELEFONE_DICT[person.cellphone.type])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                >
                  Tipo: {TELEFONE_DICT[person.cellphone.type]}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() =>
                    handleCopyText(
                      `(${person.cellphone.ddd}) ${person.cellphone.telefone}`
                    )
                  }
                >
                  Telefone: ({person.cellphone.ddd}) {person.cellphone.telefone}
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Endereço:
              </h1>
              <div className="flex flex-col gap-1">
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                  onClick={() =>
                    handleCopyText(cepFormatacao(person.address.cep))
                  }
                >
                  CEP: {cepFormatacao(person.address.cep)}
                </label>
                <label
                  onClick={() => handleCopyText(person.address.number)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Número: {person.address.number}
                </label>
                <label
                  onClick={() => handleCopyText(person.address.street)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Rua: {person.address.street}
                </label>
                <label
                  onClick={() => handleCopyText(person.address.neighboorhood)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Bairro: {person.address.neighboorhood}
                </label>
                <label
                  onClick={() => handleCopyText(person.address.city)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Cidade: {person.address.city}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(STATE_DICT[person.address.state])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Estado: {STATE_DICT[person.address.state]}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl font-bold">Chaves</h1>
          <p className="font-light text-sm flex items-center gap-1 mb-12">
            <AiOutlineInfoCircle size={15} /> Irá mostrar todas as chaves não
            usadas da pessoa
          </p>
          <div className="grid grid-cols-5 gap-10 w-full">
            {person.keys.map((key, i) => {
              return (
                <div
                  onClick={() => router(`/clinic/keys/${key.id}`)}
                  key={i}
                  className="group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
                >
                  <h1 className="group-hover:text-[#BB926B] font-bold text-[#534559] text-lg duration-300 ease-in-out">
                    {TEST_DICT[key.test]}
                  </h1>
                  <label className="text-sm">
                    Situação: {EXPIRATION_DICT[key.expired]}
                  </label>
                  <p className="flex font-light text-sm items-center">
                    Data de Vencimento: {key.expires_at}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl font-bold">Devolutivas</h1>
          <p className="font-light text-sm flex items-center gap-1 mb-7">
            <AiOutlineInfoCircle size={15} /> Irá mostrar todos as devolutivas
            de teste do usuário
          </p>
          <div className=" flex mb-10 font-light text-sm">
            <label
              onClick={() => setSelectTest("MB")}
              className={
                selectTest === "MB"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Four Elements
            </label>
            <label
              onClick={() => setSelectTest("LI")}
              className={
                selectTest === "LI"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Vida
            </label>
            <label
              onClick={() => setSelectTest("SK")}
              className={
                selectTest === "SK"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Auto Conhecimento
            </label>
            <label
              onClick={() => setSelectTest("LO")}
              className={
                selectTest === "LO"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Linguagem Amorosa
            </label>
          </div>
          {selectTest === "MB" && !!person.mbtis.length ? (
            <div className="grid grid-cols-5 gap-10 w-full">
              <MbtiResultsDisplay mbtis={person.mbtis} />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center font-medium text-sm gap-2">
              <IoWarningOutline size={40} />
              <h1>
                Este usuário na tem nenhuma devolutiva do teste Four Elements
              </h1>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

const MbtiResultsDisplay = ({ mbtis }: { mbtis: Mbti[] }) => {
  const router = useNavigate();

  return mbtis.map((mbti, i) => {
    return (
      <div
        onClick={() => router(`/clinic/tests/${mbti.id}/MB`)}
        key={i}
        className="group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
      >
        <h1 className="group-hover:text-[#BB926B] font-bold text-[#534559] text-lg duration-300 ease-in-out">
          {MBTI_DICT[mbti.first]}
        </h1>
        <label className="text-sm">Porcentagem: {mbti.firstScore} %</label>
        <p className="flex font-light text-sm items-center">
          Sub-dominante: {MBTI_DICT[mbti.second]}
        </p>
      </div>
    );
  });
};
