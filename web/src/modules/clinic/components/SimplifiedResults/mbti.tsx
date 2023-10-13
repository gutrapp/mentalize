import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  MBTI_DICT,
  REVIEW_DICT,
  USABILITY_DICT,
} from "../../../../helpers/dict.helper";
import { KeyResponse } from "../../types/keys.types";

export const MbtiResultSimplified = ({ data }: { data: KeyResponse }) => {
  return (
    data.test === "MB" && (
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Ranking dos tipos:
          </h1>
          <div className="flex flex-col gap-2 mx-2">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              1°: {MBTI_DICT[data.mbti.first]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              2°: {MBTI_DICT[data.mbti.second]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              3°: {MBTI_DICT[data.mbti.third]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              4°: {MBTI_DICT[data.mbti.fourth]}
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Porcentagens de cada tipo:
          </h1>
          <div className="flex flex-col gap-2 mx-2">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              {MBTI_DICT[data.mbti.first]}: {data.mbti.firstScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              {MBTI_DICT[data.mbti.second]}: {data.mbti.secondScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              {MBTI_DICT[data.mbti.third]}: {data.mbti.thirdScore}%
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b">
              {MBTI_DICT[data.mbti.fourth]}: {data.mbti.fourthScore}%
            </label>
          </div>
        </div>
      </div>
    )
  );
};
