import { AiOutlineInfoCircle } from "react-icons/ai";
import { KeyResponse } from "../../types/keys.types";
import { Life } from "../../../../models/life";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getGreatesValue(life: Life): (string | number)[] {
  var greatestValueTrait = ["", 0];
  Object.keys(life).map((trait) => {
    if (
      !(
        trait === "id" ||
        trait === "average" ||
        trait === "total" ||
        trait === "clinic" ||
        trait === "result"
      )
    ) {
      if (life[trait as keyof Life] > (greatestValueTrait[1] as number)) {
        greatestValueTrait[0] = trait;
        greatestValueTrait[1] = life[trait as keyof Life];
      }
    }
  });
  return greatestValueTrait;
}

function getMinimumValue(life: Life): (string | number)[] {
  var minimumValueTrait = ["", 999999];
  Object.keys(life).map((trait) => {
    if (
      !(
        trait === "id" ||
        trait === "average" ||
        trait === "total" ||
        trait === "clinic" ||
        trait === "result"
      )
    ) {
      if (life[trait as keyof Life] < (minimumValueTrait[1] as number)) {
        minimumValueTrait[0] = trait;
        minimumValueTrait[1] = life[trait as keyof Life];
      }
    }
  });
  return minimumValueTrait;
}

export const LifeResultSimplified = ({ data }: { data: KeyResponse }) => {
  return (
    data.test === "LI" && (
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559] ">
            Estatísticas:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> A média de todos os elementos, e a
            soma de todos eles
          </p>
          <div className="flex flex-col gap-2 mx-2 font-light">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#BB926B] w-full font-bold hover:scale-105 duration-300 ease-in-out">
              Média: {data.life.average}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out ">
              Total: {data.life.total}
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
            Maior e menor:
          </h1>
          <p className="font-light text-sm flex items-center gap-1 mb-[1rem]">
            <AiOutlineInfoCircle size={15} /> Mostra qual elemento o usuário deu
            a maior nota e qual ele deu a menor
          </p>
          <div className="flex flex-col gap-2 mx-2 font-light">
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#BB926B] font-bold hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {capitalizeFirstLetter(getGreatesValue(data.life)[0] as string)}:{" "}
              {getGreatesValue(data.life)[1]}
            </label>
            <label className="hover:bg-[#e1e1e1] rounded-md px-2 py-1 border-b hover:text-[#534559] hover:font-medium hover:scale-105 duration-300 ease-in-out">
              {capitalizeFirstLetter(getMinimumValue(data.life)[0] as string)}:{" "}
              {getMinimumValue(data.life)[1]}
            </label>
          </div>
        </div>
      </div>
    )
  );
};
