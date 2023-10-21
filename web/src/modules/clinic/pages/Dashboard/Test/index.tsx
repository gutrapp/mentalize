import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { useTest } from "../../../hooks/useTest";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import {
  SEX_DICT,
  TELEFONE_DICT,
  STATE_DICT,
} from "../../../../../helpers/dict.helper";
import {
  cpfFormatacao,
  cepFormatacao,
} from "../../../../../helpers/formatters.helper";
import { MbtiTestResult } from "../../../components/ResultFull/mbti";
import { ResponseMbtiOne } from "../../../types/tests.type";

export const Test = () => {
  const router = useNavigate();

  const { test, id } = useParams();

  const { result } = useTest(id as string, test as string);

  const handleCopyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        {test === "MB" && <MbtiTestResult result={result as ResponseMbtiOne} />}
        {test === "SK" && <MbtiTestResult result={result as ResponseMbtiOne} />}
        {test === "LO" && <MbtiTestResult result={result as ResponseMbtiOne} />}
        {test === "LI" && <MbtiTestResult result={result as ResponseMbtiOne} />}
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <div
            className="mb-12"
            onClick={() => router(`/clinic/people/${result.person.id}`)}
          >
            <h1 className="text-[#BB926B] text-4xl font-bold flex items-center gap-2 hover:cursor-pointer hover:border-[#BB926B] border-white border-b-2 w-fit ease-in-out duration-300">
              {result.person.user.first_name} {result.person.user.last_name}
              <HiOutlineMagnifyingGlass size={35} />
            </h1>
            <p className="font-light text-sm flex items-center gap-1">
              <AiOutlineInfoCircle size={15} /> Pessoa que fez o teste
            </p>
          </div>
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
                      `${result.person.user.first_name} ${result.person.user.last_name}`
                    )
                  }
                >
                  Nome: {result.person.user.first_name}{" "}
                  {result.person.user.last_name}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() =>
                    handleCopyText(cpfFormatacao(result.person.cpf))
                  }
                >
                  CPF: {cpfFormatacao(result.person.cpf)}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(result.person.user.email)}
                >
                  Email: {result.person.user.email}
                </label>
                <label
                  onClick={() => handleCopyText(result.person.age.toString())}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Idade: {result.person.age}
                </label>
                <label
                  onClick={() => handleCopyText(SEX_DICT[result.person.sex])}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Sexo: {SEX_DICT[result.person.sex]}
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
                    handleCopyText(TELEFONE_DICT[result.person.cellphone.type])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                >
                  Tipo: {TELEFONE_DICT[result.person.cellphone.type]}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() =>
                    handleCopyText(
                      `(${result.person.cellphone.ddd}) ${result.person.cellphone.telefone}`
                    )
                  }
                >
                  Telefone: ({result.person.cellphone.ddd}){" "}
                  {result.person.cellphone.telefone}
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
                    handleCopyText(cepFormatacao(result.person.address.cep))
                  }
                >
                  CEP: {cepFormatacao(result.person.address.cep)}
                </label>
                <label
                  onClick={() => handleCopyText(result.person.address.number)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Número: {result.person.address.number}
                </label>
                <label
                  onClick={() => handleCopyText(result.person.address.street)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Rua: {result.person.address.street}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(result.person.address.neighboorhood)
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Bairro: {result.person.address.neighboorhood}
                </label>
                <label
                  onClick={() => handleCopyText(result.person.address.city)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Cidade: {result.person.address.city}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(STATE_DICT[result.person.address.state])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Estado: {STATE_DICT[result.person.address.state]}
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
