import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { useKey } from "../../../hooks/useKey";
import {
  EXPIRATION_DICT,
  REVIEW_DICT,
  SEX_DICT,
  STATE_DICT,
  TELEFONE_DICT,
  TEST_DICT,
  USABILITY_DICT,
} from "../../../../../helpers/dict.helper";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import {
  cepFormatacao,
  cpfFormatacao,
} from "../../../../../helpers/formatters.helper";
import { MbtiResultSimplified } from "../../../components/SimplifiedResults/mbti";
import { SelfKnowledgeResultSimplified } from "../../../components/SimplifiedResults/selfKnowledge";
import { LoveLanguageResultSimplified } from "../../../components/SimplifiedResults/loveLanguage";
import { LifeResultSimplified } from "../../../components/SimplifiedResults/life";

export const Key = () => {
  const router = useNavigate();

  const { id } = useParams();

  const { key } = useKey(id as string);

  const handleCopyText = (text: string) => {
    window.navigator.clipboard.writeText(text);
  };

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Chave</h1>
          <div className="grid grid-cols-3 gap-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Informações da Chave:
              </h1>
              <div className="flex flex-col gap-2 mx-2">
                <div>
                  <label>Chave: {key.key}</label>
                  <p className="font-light text-sm flex items-center gap-1">
                    <AiOutlineInfoCircle size={15} /> Esta a chave que o usuário
                    irá usar para fazer seu teste
                  </p>
                </div>
                <div>
                  <label>Tipo de teste: {TEST_DICT[key.test]}</label>
                  <p className="font-light text-sm flex items-center gap-1">
                    <AiOutlineInfoCircle size={15} /> Tipo do teste
                    correspondente a chave
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Status da Chave:
              </h1>
              <div className="flex flex-col gap-2 mx-2">
                <div>
                  <label>Chave usada: {USABILITY_DICT[key.testTaken]}</label>
                  <p className="font-light text-sm flex items-center gap-1">
                    <AiOutlineInfoCircle size={15} /> Se já foi usado pelo dono
                  </p>
                </div>
                <div>
                  <label>Review: {REVIEW_DICT[key.seen]}</label>
                  <p className="font-light text-sm flex items-center gap-1">
                    <AiOutlineInfoCircle size={15} /> Se alguma profissional já
                    analisou o resultado do teste
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
                Situação da Chave:
              </h1>
              <div className="flex flex-col gap-2 mx-2">
                <div>
                  <label>Situação: {EXPIRATION_DICT[key.expired]}</label>
                  <p className="font-light text-sm flex items-center gap-1">
                    <AiOutlineInfoCircle size={15} /> Se a chave ainda pode ser
                    usada
                  </p>
                </div>
                <div>
                  <label>Data de criação: {key.created_at}</label>
                </div>
                <div>
                  <label>Data de vencimento: {key.expires_at}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <div
            className="mb-12"
            onClick={() => router(`/clinic/people/${key.person.id}`)}
          >
            <h1 className="text-[#BB926B] text-4xl font-bold flex items-center gap-2 hover:cursor-pointer hover:border-[#BB926B] border-white border-b-2 w-fit ease-in-out duration-300">
              {key.person.user.full_name}
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
                  onClick={() => handleCopyText(`${key.person.user.full_name}`)}
                >
                  Nome: {key.person.user.full_name}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(cpfFormatacao(key.person.cpf))}
                >
                  CPF: {cpfFormatacao(key.person.cpf)}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() => handleCopyText(key.person.user.email)}
                >
                  Email: {key.person.user.email}
                </label>
                <label
                  onClick={() => handleCopyText(key.person.age.toString())}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Idade: {key.person.age}
                </label>
                <label
                  onClick={() => handleCopyText(SEX_DICT[key.person.sex])}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Sexo: {SEX_DICT[key.person.sex]}
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
                    handleCopyText(TELEFONE_DICT[key.person.cellphone.type])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-y"
                >
                  Tipo: {TELEFONE_DICT[key.person.cellphone.type]}
                </label>
                <label
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                  onClick={() =>
                    handleCopyText(
                      `(${key.person.cellphone.ddd}) ${key.person.cellphone.telefone}`
                    )
                  }
                >
                  Telefone: ({key.person.cellphone.ddd}){" "}
                  {key.person.cellphone.telefone}
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
                    handleCopyText(cepFormatacao(key.person.address.cep))
                  }
                >
                  CEP: {cepFormatacao(key.person.address.cep)}
                </label>
                <label
                  onClick={() => handleCopyText(key.person.address.number)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Número: {key.person.address.number}
                </label>
                <label
                  onClick={() => handleCopyText(key.person.address.street)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Rua: {key.person.address.street}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(key.person.address.neighboorhood)
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Bairro: {key.person.address.neighboorhood}
                </label>
                <label
                  onClick={() => handleCopyText(key.person.address.city)}
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Cidade: {key.person.address.city}
                </label>
                <label
                  onClick={() =>
                    handleCopyText(STATE_DICT[key.person.address.state])
                  }
                  className="hover:cursor-pointer hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b"
                >
                  Estado: {STATE_DICT[key.person.address.state]}
                </label>
              </div>
            </div>
          </div>
        </div>
        {key.testTaken === "US" && (
          <div className="text-[#414042] bg-white rounded-md border w-full p-5 mb-7">
            <div
              className="mb-12"
              onClick={() => {
                switch (key.test) {
                  case "MB":
                    router(`/clinic/tests/${key.mbti.id}/${key.test}`);
                    break;
                  case "LI":
                    router(`/clinic/tests/${key.life.id}/${key.test}`);
                    break;
                  case "LO":
                    router(`/clinic/tests/${key.love_language.id}/${key.test}`);
                    break;
                  case "SK":
                    router(
                      `/clinic/tests/${key.self_knowledge.id}/${key.test}`
                    );
                    break;
                }
              }}
            >
              <h1 className="text-[#BB926B] text-4xl font-bold flex items-center gap-2 hover:cursor-pointer hover:border-[#BB926B] border-white border-b-2 w-fit ease-in-out duration-300">
                {TEST_DICT[key.test]}
                <HiOutlineMagnifyingGlass size={35} />
              </h1>
              <p className="font-light text-sm flex items-center gap-1">
                <AiOutlineInfoCircle size={15} /> Resultado relacionado a chave
              </p>
            </div>
            {key.test === "MB" && <MbtiResultSimplified data={key} />}
            {key.test === "SK" && <SelfKnowledgeResultSimplified data={key} />}
            {key.test === "LO" && <LoveLanguageResultSimplified data={key} />}
            {key.test === "LI" && <LifeResultSimplified data={key} />}
          </div>
        )}
      </main>
    </Layout>
  );
};
