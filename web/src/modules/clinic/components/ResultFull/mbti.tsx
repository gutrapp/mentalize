import { MBTI_DICT } from "../../../../helpers/dict.helper";
import { ResponseMbtiOne } from "../../types/tests.type";

export const MbtiTestResult = ({ result }: { result: ResponseMbtiOne }) => {
  return (
    <div className="text-[#414042] bg-white rounded-md border w-full p-5">
      <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Resultado</h1>
      <div className="w-full h-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Dominante:
          </h1>
          <label>1°: {MBTI_DICT[result.first]}</label>
          <label>Porcentagem: {result.firstScore}</label>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Sub-Dominante:
          </h1>
          <label>2°: {MBTI_DICT[result.second]}</label>
          <label>Porcentagem: {result.secondScore}</label>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Terceiro:
          </h1>
          <label>3°: {MBTI_DICT[result.third]}</label>
          <label>Porcentagem: {result.thirdScore}</label>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Quarto:
          </h1>
          <label>4°: {MBTI_DICT[result.fourth]}</label>
          <label>Porcentagem: {result.fourthScore}</label>
        </div>
      </div>
    </div>
  );
};
