import { ResponseLifeOne } from "../../types/tests.type";

export const LifeTestResult = ({ result }: { result: ResponseLifeOne }) => {
  return (
    <div className="text-[#414042] bg-white rounded-md border w-full p-5">
      <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Resultado</h1>
      <div className="w-full h-full grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Total: {result.total}
          </h1>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Média das pontuações: {result.total}
          </h1>
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-5 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Amor:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.amor}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Carreira:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.carreira}
          </label>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Dinheiro:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.dinheiro}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Disciplina:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.disciplina}
          </label>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Diversão:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.diversao}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Espiritual:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.espiritual}
          </label>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Felicidade:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.felicidade}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Mente:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.mente}
          </label>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Propósito:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.proposito}
          </label>
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] mb-[1rem]">
            Saúde:
          </h1>
          <label className="border-b rounded-md px-2 py-1">
            Pontuação: {result.saude}
          </label>
        </div>
      </div>
    </div>
  );
};
