import { AiOutlineInfoCircle } from "react-icons/ai";
import { MBTI_DICT } from "../../../../helpers/dict.helper";
import { KeyResponse } from "../../types/keys.types";

export const MbtiResultSimplified = ({ data }: { data: KeyResponse }) => {
  return (
    data.test === "MB" && (
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
            Ranking dos tipos:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> Ranking dos tipos do cliente, o
            primeiro e o dominante
          </p>
          <div className="flex flex-col gap-2 mx-2">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b w-full text-[#BB926B]">
              1°: {MBTI_DICT[data.mbti.first]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b text-[#534559]">
              2°: {MBTI_DICT[data.mbti.second]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              3°: {MBTI_DICT[data.mbti.third]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b font-light">
              4°: {MBTI_DICT[data.mbti.fourth]}
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
            Porcentagens de cada tipo:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> Qual a porcentagem de cada tipo
          </p>
          <div className="flex flex-col gap-2 mx-2">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b text-[#BB926B]">
              {MBTI_DICT[data.mbti.first]}: {data.mbti.firstScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b text-[#534559]">
              {MBTI_DICT[data.mbti.second]}: {data.mbti.secondScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              {MBTI_DICT[data.mbti.third]}: {data.mbti.thirdScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b font-light">
              {MBTI_DICT[data.mbti.fourth]}: {data.mbti.fourthScore}%
            </label>
          </div>
        </div>
      </div>
    )
  );
};
