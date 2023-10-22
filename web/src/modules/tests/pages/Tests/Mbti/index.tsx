import { SetStateAction, useContext, useEffect, useState } from "react";
import api from "../../../../../api/api.config";
import { useNavigate } from "react-router-dom";
import { MBTI_DICT } from "../../../../../helpers/dict.helper";
import { Button } from "../../../../../components/Button/Button";
import { Layout } from "../../../../../components/Layout";
import { KeyContext } from "../../../context/KeyContext";
import { BiLogOutCircle } from "react-icons/bi";

const WORDS = [
  {
    air: "Idealismo",
    earth: "Meticulosidade",
    water: "Diversão",
    fire: "Persistência",
  },
  {
    air: "Inovação",
    earth: "Organização",
    water: "Integração",
    fire: "Execução",
  },
  {
    air: "Antecipação",
    earth: "Regras",
    water: "Acordo",
    fire: "Persistência",
  },
  {
    air: "Complexidade",
    earth: "Sistematização",
    water: "Interatividade",
    fire: "Objetividade",
  },
  {
    air: "Curiosidade",
    earth: "Planejamento",
    water: "Relacionamento",
    fire: "Direção",
  },
  {
    air: "Questionamento",
    earth: "Detalhamento",
    water: "Participação",
    fire: "Impulsividade",
  },
  {
    air: "Liberdade",
    earth: "Controle",
    water: "Compreensão",
    fire: "Paciência",
  },
  {
    air: "Descobertas",
    earth: "Previsão",
    water: "Naturalidade",
    fire: "Determinação",
  },
  {
    air: "Irrelevância",
    earth: "Inevitabilidade",
    water: "Socialização",
    fire: "Facilidade",
  },
  { air: "Revolução", earth: "Lógica", water: "Tradição", fire: "Quantidade" },
  {
    air: "Independência",
    earth: "Acúmulo",
    water: "Assistência",
    fire: "Empreendimento",
  },
  { air: "Escolha", earth: "Melhoria", water: "Lazer", fire: "Autonomia" },
  { air: "Aventura", earth: "Ordem", water: "Cooperação", fire: "Execução" },
  {
    air: "Novidade",
    earth: "Controle",
    water: "Solidariedade",
    fire: "Atuação",
  },
  {
    air: "Criatividade",
    earth: "Pontualidade",
    water: "Parceria",
    fire: "Vantagem",
  },
  { air: "Adaptação", earth: "Consistência", water: "Equipe", fire: "Líder" },
  { air: "Desafio", earth: "Estratégia", water: "Percurso", fire: "Chegada" },
  { air: "Desconfiança", earth: "Prevenção", water: "União", fire: "Ataque" },
  {
    air: "Mistério",
    earth: "Compreensão",
    water: "Reencontro",
    fire: "Pressa",
  },
  { air: "Mudança", earth: "Rotina", water: "Amizade", fire: "Produtividade" },
  {
    air: "Estranheza",
    earth: "Perfeição",
    water: "Envolvimento",
    fire: "Foco",
  },
  { air: "Eficácia", earth: "Perícia", water: "Experiência", fire: "Sucesso" },
  { air: "Desligado", earth: "Gradativo", water: "Justiça", fire: "Firmeza" },
  {
    air: "Multiplicidade",
    earth: "Cautela",
    water: "Conjunto",
    fire: "Competição",
  },
];

function calculatePorcentages({
  air,
  airWeight,
  earth,
  earthWeight,
  fire,
  fireWeight,
  water,
  waterWeight,
}: MbtiValue) {
  const AIR_SCORE = air * airWeight;
  const FIRE_SCORE = fire * fireWeight;
  const WATER_SCORE = water * waterWeight;
  const EARTH_SCORE = earth * earthWeight;
  const TOTAL = AIR_SCORE + EARTH_SCORE + WATER_SCORE + FIRE_SCORE;

  return {
    airPorcentage: (AIR_SCORE / TOTAL) * 100,
    firePorcentage: (FIRE_SCORE / TOTAL) * 100,
    waterPorcentage: (WATER_SCORE / TOTAL) * 100,
    earthPorcentage: (EARTH_SCORE / TOTAL) * 100,
  };
}

function sortPorcentagesWithType({
  airPorcentage,
  earthPorcentage,
  firePorcentage,
  waterPorcentage,
}: ReturnType<typeof calculatePorcentages>): {
  first: "AR" | "EA" | "FI" | "WA";
  second: "AR" | "EA" | "FI" | "WA";
  third: "AR" | "EA" | "FI" | "WA";
  fourth: "AR" | "EA" | "FI" | "WA";
  firstScore: number;
  secondScore: number;
  thirdScore: number;
  fourthScore: number;
} {
  const values: { type: "AR" | "EA" | "FI" | "WA"; porcentage: number }[] = [
    { type: "AR", porcentage: airPorcentage },
    { type: "WA", porcentage: waterPorcentage },
    { type: "EA", porcentage: earthPorcentage },
    { type: "FI", porcentage: firePorcentage },
  ];

  for (var i = 0; i <= values.length - 1; i++) {
    for (var j = 0; j < values.length - i - 1; j++) {
      if (values[j].porcentage < values[j + 1].porcentage) {
        const temp = values[j];
        values[j] = values[j + 1];
        values[j + 1] = temp;
      }
    }
  }

  return {
    first: values[0].type,
    second: values[1].type,
    third: values[2].type,
    fourth: values[3].type,
    firstScore: values[0].porcentage,
    secondScore: values[1].porcentage,
    thirdScore: values[2].porcentage,
    fourthScore: values[3].porcentage,
  };
}

type MbtiValue = {
  air: number;
  airWeight: number;
  water: number;
  waterWeight: number;
  earth: number;
  earthWeight: number;
  fire: number;
  fireWeight: number;
};

type Word = {
  air: string;
  earth: string;
  fire: string;
  water: string;
};

type HelperProps = {
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
};

type ResultProps = {
  values: MbtiValue;
};

type MbtiWordsProps = {
  air: string;
  earth: string;
  fire: string;
  water: string;
  values: MbtiValue;
  setValues: React.Dispatch<SetStateAction<MbtiValue>>;
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
};

type MbtiSectionsProps = {
  words: Word[];
  values: MbtiValue;
  setValues: React.Dispatch<SetStateAction<MbtiValue>>;
  step: number;
  setStep: React.Dispatch<SetStateAction<number>>;
};

export const MbtiTest = () => {
  const router = useNavigate();

  const { getCurrentKey, removeCurrentKey } = useContext(KeyContext);

  const [values, setValues] = useState<MbtiValue>({
    air: 1,
    airWeight: 1,
    water: 1,
    waterWeight: 1,
    earth: 1,
    earthWeight: 1,
    fire: 1,
    fireWeight: 1,
  });

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!getCurrentKey().id) router("/tests");
  }, []);

  return (
    <Layout display={false}>
      <Button
        onClick={(e) => {
          e.preventDefault();
          removeCurrentKey();
          router("/tests");
        }}
        Icon={BiLogOutCircle}
        variant="outline"
        className="mt-[80px] ml-[20px]"
      >
        Sair
      </Button>
      <main className="mt-5 h-full w-full bg-white flex flex-col justify-center items-center text-[#414042] font-bold">
        {step === 0 && <Helper step={step} setStep={setStep} />}
        {step <= 24 && step > 0 && (
          <MbtiSections
            words={WORDS}
            step={step}
            setStep={setStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 24 && <Result values={values} />}
      </main>
    </Layout>
  );
};

function MbtiWords({
  air,
  earth,
  fire,
  water,
  setValues,
  values,
  step,
  setStep,
}: MbtiWordsProps) {
  const [choice, setChoice] = useState<"air" | "earth" | "water" | "fire">(
    "air"
  );

  const [weight, setWeight] = useState<{
    air: number;
    water: number;
    earth: number;
    fire: number;
  }>({ air: 0, water: 0, earth: 0, fire: 10 });

  const handleNext = () => {
    if (weight.air + weight.water + weight.earth + weight.fire === 10) {
      setValues({
        ...values,
        [choice]: values[choice] + 1,
        fireWeight: values.fireWeight + weight.fire,
        waterWeight: values.waterWeight + weight.water,
        earthWeight: values.earthWeight + weight.earth,
        airWeight: values.airWeight + weight.air,
      });
      setStep(step + 1);
    }
  };

  return (
    <main className="pt-20">
      <div className="grid grid-cols-2 gap-x-24 gap-y-16">
        <div
          className={
            choice === "air"
              ? "w-[400px] h-[200px] group ring-2 ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              : "w-[400px] h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
          }
          onClick={() => setChoice("air")}
        >
          <h1
            className={
              choice === "air"
                ? "text-5xl hover:cursor-pointer text-[#BB926B] font-bold duration-300 ease-in-out"
                : "text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out"
            }
          >
            {air}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[20%] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.air || 0}
              onChange={(e) =>
                setWeight({ ...weight, air: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div
          className={
            choice === "earth"
              ? "w-[400px] h-[200px] group ring-2 ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              : "w-[400px] h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
          }
          onClick={() => setChoice("earth")}
        >
          <h1
            className={
              choice === "earth"
                ? "text-5xl hover:cursor-pointer text-[#BB926B] font-bold duration-300 ease-in-out"
                : "text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out"
            }
          >
            {earth}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[20%] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.earth || 0}
              onChange={(e) =>
                setWeight({ ...weight, earth: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div
          className={
            choice === "fire"
              ? "w-[400px] h-[200px] group ring-2 ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              : "w-[400px] h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
          }
          onClick={() => setChoice("fire")}
        >
          <h1
            className={
              choice === "fire"
                ? "text-5xl hover:cursor-pointer text-[#BB926B] font-bold duration-300 ease-in-out"
                : "text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out"
            }
          >
            {fire}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[20%] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.fire || 0}
              onChange={(e) =>
                setWeight({ ...weight, fire: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div
          className={
            choice === "water"
              ? "w-[400px] h-[200px] group ring-2 ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              : "w-[400px] h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
          }
          onClick={() => setChoice("water")}
        >
          <h1
            className={
              choice === "water"
                ? "text-5xl hover:cursor-pointer text-[#BB926B] font-bold duration-300 ease-in-out"
                : "text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out"
            }
          >
            {water}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[20%] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.water || 0}
              onChange={(e) =>
                setWeight({ ...weight, water: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center pt-8">
        <Button onClick={() => handleNext()}>Próximo</Button>
      </div>
    </main>
  );
}

function MbtiSections({
  words,
  setValues,
  values,
  step,
  setStep,
}: MbtiSectionsProps) {
  return (
    <div>
      {words.map(({ air, earth, fire, water }, i) => {
        if (step === i)
          return (
            <div key={i}>
              <MbtiWords
                air={air}
                earth={earth}
                water={water}
                fire={fire}
                setValues={setValues}
                values={values}
                step={step}
                setStep={setStep}
              />
            </div>
          );
      })}
    </div>
  );
}

const Helper = ({ step, setStep }: HelperProps) => {
  return (
    <div className="mx-36 h-full w-[70%] flex flex-col justify-center items-center gap-y-12 pt-40">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-14 text-6xl text-[#bfa15e]">COMO FUNCIONA</h1>
        <p className="font-semibold text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia
          lacus pharetra diam sodales, non ultrices augue egestas. Suspendisse
          sed ultrices lacus. Cras egestas maximus euismod. Sed et mi mollis,
          porta diam eget, vulputate nunc. Aliquam eleifend tincidunt neque,
          eget tincidunt metus feugiat quis. Ut ac suscipit augue. Integer
          posuere aliquet magna ut condimentum. Mauris et viverra augue, non
          pellentesque sem. Ut ultrices sodales mauris. Ut quis mi viverra ex
          consequat placerat id vitae ex. Nulla facilisi. Pellentesque
          sollicitudin hendrerit sem vel dictum. Pellentesque convallis, ante
        </p>
      </div>
      <div>
        <Button onClick={() => setStep(step + 1)}>Próximo</Button>
      </div>
    </div>
  );
};

const Result = ({ values }: ResultProps) => {
  const { getCurrentKey } = useContext(KeyContext);

  const [result, setResult] = useState<{
    first: "AR" | "EA" | "WA" | "FI";
    second: "AR" | "EA" | "WA" | "FI";
    third: "AR" | "EA" | "WA" | "FI";
    fourth: "AR" | "EA" | "WA" | "FI";
    firstScore: number;
    secondScore: number;
    thirdScore: number;
    fourthScore: number;
  }>({
    first: "AR",
    second: "AR",
    third: "AR",
    fourth: "AR",
    firstScore: 0,
    secondScore: 0,
    thirdScore: 0,
    fourthScore: 0,
  });

  useEffect(() => {
    const { airPorcentage, earthPorcentage, firePorcentage, waterPorcentage } =
      calculatePorcentages(values);
    const data = sortPorcentagesWithType({
      airPorcentage: parseInt(airPorcentage.toFixed(3)),
      earthPorcentage: parseInt(earthPorcentage.toFixed(3)),
      firePorcentage: parseInt(firePorcentage.toFixed(3)),
      waterPorcentage: parseInt(waterPorcentage.toFixed(3)),
    });

    async function createResultMbti() {
      await api.post(`create_result`, {
        mbti: {
          ...data,
          result: getCurrentKey().id,
          clinic: getCurrentKey().clinic,
        },
        result: {
          id: getCurrentKey().id,
          test: "MB",
          testTaken: "US",
        },
      });
    }

    setResult(data);
    createResultMbti();
  }, []);

  return (
    <div>
      <h1 className="text-9xl text-[#bfa15e] uppercase">
        {MBTI_DICT[result.first]}
      </h1>
    </div>
  );
};
