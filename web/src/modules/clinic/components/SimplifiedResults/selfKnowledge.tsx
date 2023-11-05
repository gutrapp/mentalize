import { AiOutlineInfoCircle } from "react-icons/ai";
import { SK_DICT } from "../../../../helpers/dict.helper";
import { KeyResponse } from "../../types/keys.types";

export const SelfKnowledgeResultSimplified = ({
  data,
}: {
  data: KeyResponse;
}) => {
  return (
    data.test === "SK" && (
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
            Ranking dos tipos:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> Ranking dos tipos do cliente, o
            primeiro e o dominante
          </p>
          <div className="flex flex-col gap-2 mx-2 font-light">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#BB926B] w-full font-bold hover:scale-105 duration-300 ease-in-out">
              1°: {SK_DICT[data.self_knowledge.first]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out ">
              2°: {SK_DICT[data.self_knowledge.second]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              3°: {SK_DICT[data.self_knowledge.third]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              4°: {SK_DICT[data.self_knowledge.fourth]}
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
            Pontuação de cada tipo:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> A soma de cada nota que usuário
            deu para os tipos
          </p>
          <div className="flex flex-col gap-2 mx-2 font-light">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#BB926B] font-bold hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {SK_DICT[data.self_knowledge.first]}:{" "}
              {data.self_knowledge.firstScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {SK_DICT[data.self_knowledge.second]}:{" "}
              {data.self_knowledge.secondScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {SK_DICT[data.self_knowledge.third]}:{" "}
              {data.self_knowledge.thirdScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {SK_DICT[data.self_knowledge.fourth]}:{" "}
              {data.self_knowledge.fourthScore}
            </label>
          </div>
        </div>
      </div>
    )
  );
};
