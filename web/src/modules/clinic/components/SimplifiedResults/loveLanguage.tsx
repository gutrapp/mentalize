import { AiOutlineInfoCircle } from "react-icons/ai";
import { LO_DICT } from "../../../../helpers/dict.helper";
import { KeyResponse } from "../../types/keys.types";

export const LoveLanguageResultSimplified = ({
  data,
}: {
  data: KeyResponse;
}) => {
  return (
    data.test === "LO" && (
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
              1°: {LO_DICT[data.love_language.first]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out ">
              2°: {LO_DICT[data.love_language.second]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              3°: {LO_DICT[data.love_language.third]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              4°: {LO_DICT[data.love_language.fourth]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              5°: {LO_DICT[data.love_language.fifth]}
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
              {LO_DICT[data.love_language.first]}:{" "}
              {data.love_language.firstScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {LO_DICT[data.love_language.second]}:{" "}
              {data.love_language.secondScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {LO_DICT[data.love_language.third]}:{" "}
              {data.love_language.thirdScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {LO_DICT[data.love_language.fourth]}:{" "}
              {data.love_language.fourthScore}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {LO_DICT[data.love_language.fourth]}:{" "}
              {data.love_language.fifthScore}
            </label>
          </div>
        </div>
      </div>
    )
  );
};
