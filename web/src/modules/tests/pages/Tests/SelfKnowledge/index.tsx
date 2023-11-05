import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { KeyContext } from "../../../context/KeyContext";
import { Layout } from "../../../../../components/Layout";
import { BiLogOutCircle } from "react-icons/bi";
import api from "../../../../../api/api.config";
import { SK_DICT } from "../../../../../helpers/dict.helper";

const PHRASES = [
  {
    visual: "Intuição.",
    auditory: "O que me soa melhor.",
    digital: "O que me parece melhor.",
    kinesthetic: "Um estudo precioso e minucioso do assunto.",
  },
  {
    visual: "O tom de voz da outra pessoa.",
    auditory: "O tom de voz da outra pessoa.",
    digital: "A lógica do argumento da outra pessoa.",
    kinesthetic:
      "Se eu entro em contato ou não com os sentimentos reais do outro.",
  },
  {
    visual: "Através do modo como me visto e aparento.",
    auditory: "Pelos sentimentos que compartilho.",
    digital: "Pelas palavras que escolho.",
    kinesthetic: "Pelo tom da minha voz.",
  },
  {
    visual: "Achar o volume e a sintonia ideais num sistema de som.",
    auditory:
      "Selecionar o ponto mais relevante relativo a um assunto interessante.",
    digital: "Escolher os móveis mais confortáveis.",
    kinesthetic: "Escolher as combinações de cores mais ricas e atraentes.",
  },
  {
    visual: "Eu estou muito em sintonia com os sons do ambiente.",
    auditory: "Eu sou muito capaz de raciocinar com fatos e dados novos.",
    digital: "Eu sou muito sensível à maneira como a veste o meu corpo.",
    kinesthetic: "Eu respondo fortemente às cores e a aparência de uma sala.",
  },
];

type SortScores = {
  visualScore: number;
  digitalScore: number;
  kinestheticScore: number;
  auditoryScore: number;
};

function sortScoresWithType({
  visualScore,
  digitalScore,
  kinestheticScore,
  auditoryScore,
}: SortScores): {
  first: "VI" | "AU" | "DI" | "KI";
  second: "VI" | "AU" | "DI" | "KI";
  third: "VI" | "AU" | "DI" | "KI";
  fourth: "VI" | "AU" | "DI" | "KI";
  firstScore: number;
  secondScore: number;
  thirdScore: number;
  fourthScore: number;
} {
  const values: {
    type: "VI" | "AU" | "DI" | "KI";
    porcentage: number;
  }[] = [
    { type: "VI", porcentage: visualScore },
    { type: "DI", porcentage: digitalScore },
    { type: "KI", porcentage: kinestheticScore },
    { type: "AU", porcentage: auditoryScore },
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

type SelfKnowledgeValue = {
  visualWeight: number;
  kinestheticWeight: number;
  auditoryWeight: number;
  digitalWeight: number;
};

type Word = {
  visual: string;
  auditory: string;
  digital: string;
  kinesthetic: string;
};

type HelperProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type ResultProps = {
  values: SelfKnowledgeValue;
};

type SelfKnowledgeWordsProps = {
  visual: string;
  kinesthetic: string;
  auditory: string;
  digital: string;
  values: SelfKnowledgeValue;
  setValues: React.Dispatch<React.SetStateAction<SelfKnowledgeValue>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type SelfKnowledgeSectionsProps = {
  words: Word[];
  values: SelfKnowledgeValue;
  setValues: React.Dispatch<React.SetStateAction<SelfKnowledgeValue>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const SelfKnowledgeTest = () => {
  const router = useNavigate();

  const { getCurrentKey, removeCurrentKey } = useContext(KeyContext);

  const [values, setValues] = useState<SelfKnowledgeValue>({
    visualWeight: 0,
    kinestheticWeight: 0,
    auditoryWeight: 0,
    digitalWeight: 0,
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
        {step <= 4 && step > 0 && (
          <SelfKnowledgeSections
            words={PHRASES}
            step={step}
            setStep={setStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 5 && <Result values={values} />}
      </main>
    </Layout>
  );
};

function SelfKnowledgeWords({
  visual,
  kinesthetic,
  auditory,
  digital,
  setValues,
  values,
  step,
  setStep,
}: SelfKnowledgeWordsProps) {
  const [weight, setWeight] = useState<{
    visual: number;
    kinesthetic: number;
    auditory: number;
    digital: number;
  }>({ visual: 0, kinesthetic: 0, auditory: 0, digital: 0 });

  const handleNext = () => {
    if (
      weight.visual + weight.kinesthetic + weight.digital + weight.auditory ===
      10
    ) {
      setValues({
        ...values,
        auditoryWeight: values.auditoryWeight + weight.auditory,
        digitalWeight: values.digitalWeight + weight.digital,
        kinestheticWeight: values.kinestheticWeight + weight.kinesthetic,
        visualWeight: values.visualWeight + weight.visual,
      });
      setStep(step + 1);
    }
  };

  return (
    <main className="py-20">
      <div className="flex flex-col gap-x-24 gap-y-16">
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {visual}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.visual || 0}
              onChange={(e) =>
                setWeight({ ...weight, visual: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {kinesthetic}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.kinesthetic || 0}
              onChange={(e) =>
                setWeight({ ...weight, kinesthetic: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {auditory}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.auditory || 0}
              onChange={(e) =>
                setWeight({ ...weight, auditory: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {digital}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.digital || 0}
              onChange={(e) =>
                setWeight({ ...weight, digital: parseInt(e.target.value) })
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

function SelfKnowledgeSections({
  words,
  setValues,
  values,
  step,
  setStep,
}: SelfKnowledgeSectionsProps) {
  return (
    <div>
      {words.map(({ auditory, digital, kinesthetic, visual }, i) => {
        if (step === i)
          return (
            <div key={i}>
              <SelfKnowledgeWords
                visual={visual}
                kinesthetic={digital}
                auditory={kinesthetic}
                digital={auditory}
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
    first: "VI" | "AU" | "DI" | "KI";
    second: "VI" | "AU" | "DI" | "KI";
    third: "VI" | "AU" | "DI" | "KI";
    fourth: "VI" | "AU" | "DI" | "KI";
    firstScore: number;
    secondScore: number;
    thirdScore: number;
    fourthScore: number;
  }>({
    first: "VI",
    second: "VI",
    third: "VI",
    fourth: "VI",
    firstScore: 0,
    secondScore: 0,
    thirdScore: 0,
    fourthScore: 0,
  });

  useEffect(() => {
    const data = sortScoresWithType({
      visualScore: values.visualWeight,
      digitalScore: values.digitalWeight,
      kinestheticScore: values.kinestheticWeight,
      auditoryScore: values.auditoryWeight,
    });

    async function createResultSelfKnowledge() {
      await api.post(`result/create_result`, {
        sk: {
          ...data,
          result: getCurrentKey().id,
          clinic: getCurrentKey().clinic,
        },
        result: {
          id: getCurrentKey().id,
          test: "SK",
          testTaken: "US",
        },
      });
    }

    setResult(data);
    createResultSelfKnowledge();
  }, []);

  return (
    <div>
      <h1 className="text-9xl text-[#bfa15e] uppercase">
        {SK_DICT[result.first]}
      </h1>
    </div>
  );
};
