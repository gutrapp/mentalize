import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { useMbti } from "../../../hooks/useTest";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import {
  SEX_DICT,
  TELEFONE_DICT,
  STATE_DICT,
  MBTI_DICT,
} from "../../../../../helpers/dict.helper";
import {
  cpfFormatacao,
  cepFormatacao,
} from "../../../../../helpers/formatters.helper";

export const Test = () => {
  const router = useNavigate();

  const { test, id } = useParams();

  const { mbti } = useMbti(id as string, test as string);

  const handleCopyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Resultado</h1>
          <div className="w-full h-full grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <h1>Dominante</h1>
              <label>1°: {MBTI_DICT[mbti.first]}</label>
              <label>Porcentagem: {mbti.firstScore}</label>
            </div>

            <div className="flex flex-col gap-2">
              <h1>Sub-dominante</h1>
              <label>2°: {MBTI_DICT[mbti.second]}</label>
              <label>Porcentagem: {mbti.secondScore}</label>
            </div>

            <div className="flex flex-col gap-2">
              <label>3°: {MBTI_DICT[mbti.third]}</label>
              <label>Porcentagem: {mbti.thirdScore}</label>
            </div>

            <div className="flex flex-col gap-2">
              <label>4°: {MBTI_DICT[mbti.fourth]}</label>
              <label>Porcentagem: {mbti.fourthScore}</label>
            </div>
          </div>
        </div>
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <div
            className="mb-12"
            onClick={() => router(`/clinic/people/${mbti.person.id}`)}
          >
            <h1 className="text-[#BB926B] text-4xl font-bold flex items-center gap-2 hover:cursor-pointer hover:border-[#BB926B] border-white border-b-2 w-fit ease-in-out duration-300">
              {mbti.person.user.first_name} {mbti.person.user.last_name}
              <HiOutlineMagnifyingGlass size={35} />
            </h1>
            <p className="font-light text-sm flex items-center gap-1">
              <AiOutlineInfoCircle size={15} /> Dono da chave
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Informações do Dono:
              </h1>
              <div className="flex flex-col gap-1">
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                  onClick={() =>
                    handleCopyText(
                      `${mbti.person.user.first_name} ${mbti.person.user.last_name}`
                    )
                  }
                >
                  Nome: {mbti.person.user.first_name}{" "}
                  {mbti.person.user.last_name}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(cpfFormatacao(mbti.person.cpf))}
                >
                  CPF: {cpfFormatacao(mbti.person.cpf)}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(mbti.person.user.email)}
                >
                  Email: {mbti.person.user.email}
                </label>
                <label
                  onClick={() => handleCopyText(mbti.person.age.toString())}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Idade: {mbti.person.age}
                </label>
                <label
                  onClick={() => handleCopyText(SEX_DICT[mbti.person.sex])}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Sexo: {SEX_DICT[mbti.person.sex]}
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
                    handleCopyText(TELEFONE_DICT[mbti.person.cellphone.type])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                >
                  Tipo: {TELEFONE_DICT[mbti.person.cellphone.type]}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() =>
                    handleCopyText(
                      `(${mbti.person.cellphone.ddd}) ${mbti.person.cellphone.telefone}`
                    )
                  }
                >
                  Telefone: ({mbti.person.cellphone.ddd}){" "}
                  {mbti.person.cellphone.telefone}
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
                    handleCopyText(cepFormatacao(mbti.person.address.cep))
                  }
                >
                  CEP: {cepFormatacao(mbti.person.address.cep)}
                </label>
                <label
                  onClick={() => handleCopyText(mbti.person.address.number)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Número: {mbti.person.address.number}
                </label>
                <label
                  onClick={() => handleCopyText(mbti.person.address.street)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Rua: {mbti.person.address.street}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(mbti.person.address.neighboorhood)
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Bairro: {mbti.person.address.neighboorhood}
                </label>
                <label
                  onClick={() => handleCopyText(mbti.person.address.city)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Cidade: {mbti.person.address.city}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(STATE_DICT[mbti.person.address.state])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Estado: {STATE_DICT[mbti.person.address.state]}
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
