import { SK_DICT } from "../../../../helpers/dict.helper";
import { ResponseSelfKnowledgeOne } from "../../types/tests.type";

export const SelfKnowledgeTestResult = ({
  result,
}: {
  result: ResponseSelfKnowledgeOne;
}) => {
  return (
    <div className="text-[#414042] bg-white rounded-md border w-full p-5">
      <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Resultado</h1>
      <div className="w-full h-full grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Dominante:
          </h1>
          <label className="border-b rounded-md px-2 py-1 border-t">
            1°: {SK_DICT[result.first]}
          </label>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.firstScore}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Sub-Dominante:
          </h1>
          <label className="border-b rounded-md px-2 py-1 border-t">
            2°: {SK_DICT[result.second]}
          </label>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.secondScore}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Terceiro:
          </h1>
          <label className="border-b rounded-md px-2 py-1 border-t">
            3°: {SK_DICT[result.third]}
          </label>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.thirdScore}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Quarto:
          </h1>
          <label className="border-b rounded-md px-2 py-1 border-t">
            4°: {SK_DICT[result.fourth]}
          </label>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.fourthScore}
          </label>
        </div>
      </div>
    </div>
  );
};
