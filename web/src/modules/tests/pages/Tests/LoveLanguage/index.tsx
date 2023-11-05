import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Button/Button";
import { useContext, useEffect, useState } from "react";
import { KeyContext } from "../../../context/KeyContext";
import { Layout } from "../../../../../components/Layout";
import { BiLogOutCircle } from "react-icons/bi";
import api from "../../../../../api/api.config";
import { LO_DICT } from "../../../../../helpers/dict.helper";

const PHRASES = [
  {
    afirmation:
      "Uma pessoa diz: Você realmente fez um ótimo trabalho. Parabéns!",
    service:
      "Uma pessoa, inesperadamente, faz alguma coisa no escritório que você aprecia.",
    presents: "Uma pessoa traz pra você um presente surpresa.",
    time: "Uma pessoa te convida para uma caminhada, apenas para conversar.",
    touch:
      "Uma pessoa faz um esforço apenas para te dar um abraço antes de deixar o local onde estão.",
  },

  {
    afirmation: "Uma pessoa te diz o quanto ele te aprecia.",
    service:
      "Uma pessoa faz uma tarefa chata que você deveria fazer e te deixa descansar.",
    presents: "Uma pessoa traz pra você uma guloseima especial da padaria.",
    time: "Uma pessoa te convida para sentar e conversar sobre o seu dia.",
    touch:
      "Uma pessoa gosta de te dar um abraço quando você está apenas passando por ele em algum lugar.",
  },
  {
    afirmation:
      "Durante uma festa, uma pessoa compartilha com as pessoas ao redor sobre um recente sucesso seu.",
    service:
      "Uma pessoa leva o seu carro para o lava jato (lava rápido/lavação) num dia que você está sem tempo.",
    presents: "Uma pessoa surpreende você com um presente inesperado.",
    time: "Uma pessoa te chama para dar um passeio a tarde.",
    touch:
      "Uma pessoa anda de braço dado com você ou te abraça em algum lugar por alguns instantes enquanto estão andando.",
  },
  {
    afirmation:
      "Uma pessoa te elogia por causa de uma de suas qualidades especiais.",
    service: "Uma pessoa prepara um lanche e leva para você onde você está.",
    presents:
      "Uma pessoa, que tem boas condições, te ajuda pagando um curso para você por 2 meses.",
    time: "Uma pessoa planeja uma saída legal para vocês.",
    touch:
      "Uma pessoa te dá uma carona, e te poupa de ter que pegar aquele ônibus lotado, que só muita paciência pra aguentar!",
  },
  {
    afirmation: "Uma pessoa te diz o quanto seus amigos te apreciam.",
    service:
      "Uma pessoa preenche pra você aquele relatório que você odeia fazer.",
    presents: "Uma pessoa manda entregar na sua casa um presente surpresa.",
    time: "Uma pessoa convida você para almoçar, te leva para o seu restaurante favorito e paga a conta.",
    touch:
      "Uma pessoa convida você para almoçar, te leva para o seu restaurante favorito e paga a conta.",
  },
];

type SortScores = {
  afirmationScore: number;
  serviceScore: number;
  presentsScore: number;
  timeScore: number;
  touchScore: number;
};

function sortScoresWithType({
  afirmationScore,
  serviceScore,
  presentsScore,
  timeScore,
  touchScore,
}: SortScores): {
  first: "AF" | "SE" | "PE" | "TI" | "TO";
  second: "AF" | "SE" | "PE" | "TI" | "TO";
  third: "AF" | "SE" | "PE" | "TI" | "TO";
  fourth: "AF" | "SE" | "PE" | "TI" | "TO";
  fifth: "AF" | "SE" | "PE" | "TI" | "TO";
  firstScore: number;
  secondScore: number;
  thirdScore: number;
  fourthScore: number;
  fifthScore: number;
} {
  const values: {
    type: "AF" | "SE" | "PE" | "TI" | "TO";
    porcentage: number;
  }[] = [
    { type: "AF", porcentage: afirmationScore },
    { type: "SE", porcentage: serviceScore },
    { type: "PE", porcentage: presentsScore },
    { type: "TI", porcentage: timeScore },
    { type: "TO", porcentage: touchScore },
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
    fifth: values[4].type,
    firstScore: values[0].porcentage,
    secondScore: values[1].porcentage,
    thirdScore: values[2].porcentage,
    fourthScore: values[3].porcentage,
    fifthScore: values[4].porcentage,
  };
}

type LoveLanguageValue = {
  afirmationWeight: number;
  serviceWeight: number;
  presentsWeight: number;
  timeWeight: number;
  touchWeight: number;
};

type Word = {
  afirmation: string;
  service: string;
  presents: string;
  time: string;
  touch: string;
};

type HelperProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type ResultProps = {
  values: LoveLanguageValue;
};

type LoveLanguageWordsProps = {
  afirmation: string;
  service: string;
  presents: string;
  time: string;
  touch: string;
  values: LoveLanguageValue;
  setValues: React.Dispatch<React.SetStateAction<LoveLanguageValue>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type LoveLanguageSectionsProps = {
  words: Word[];
  values: LoveLanguageValue;
  setValues: React.Dispatch<React.SetStateAction<LoveLanguageValue>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const LoveLanguageTest = () => {
  const router = useNavigate();

  const { getCurrentKey, removeCurrentKey } = useContext(KeyContext);

  const [values, setValues] = useState<LoveLanguageValue>({
    afirmationWeight: 0,
    serviceWeight: 0,
    presentsWeight: 0,
    timeWeight: 0,
    touchWeight: 0,
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
          <LoveLanguageSections
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

function LoveLanguageWords({
  afirmation,
  service,
  presents,
  time,
  touch,
  setValues,
  values,
  step,
  setStep,
}: LoveLanguageWordsProps) {
  const [weight, setWeight] = useState<{
    afirmation: number;
    service: number;
    presents: number;
    time: number;
    touch: number;
  }>({ afirmation: 0, service: 0, presents: 0, time: 0, touch: 0 });

  const handleNext = () => {
    if (
      weight.time +
        weight.touch +
        weight.service +
        weight.afirmation +
        weight.presents ===
      15
    ) {
      setValues({
        ...values,
        presentsWeight: values.presentsWeight + weight.presents,
        afirmationWeight: values.afirmationWeight + weight.afirmation,
        serviceWeight: values.serviceWeight + weight.service,
        touchWeight: values.touchWeight + weight.touch,
        timeWeight: values.timeWeight + weight.time,
      });
      setStep(step + 1);
    }
  };

  return (
    <main className="py-20 px-40">
      <div className="flex flex-col gap-x-24 gap-y-16">
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {afirmation}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.afirmation || 0}
              onChange={(e) =>
                setWeight({ ...weight, afirmation: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {presents}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.presents || 0}
              onChange={(e) =>
                setWeight({ ...weight, presents: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {time}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.time || 0}
              onChange={(e) =>
                setWeight({ ...weight, time: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {touch}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.touch || 0}
              onChange={(e) =>
                setWeight({ ...weight, touch: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="w-full h-[200px] group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-5xl hover:cursor-pointer group-hover:text-[#BB926B] font-bold text-[#534559] duration-300 ease-in-out">
            {service}
          </h1>
          <div className="flex pt-5 items-center">
            <label className="mr-2 text-lg">Pontuação: </label>
            <input
              className="flex w-[10ch] items-center justify-center outline-none text-center text-md font-medium border-b-[#534559] border-2 border-white"
              value={weight.service || 0}
              onChange={(e) =>
                setWeight({ ...weight, service: parseInt(e.target.value) })
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

function LoveLanguageSections({
  words,
  setValues,
  values,
  step,
  setStep,
}: LoveLanguageSectionsProps) {
  return (
    <div>
      {words.map(({ afirmation, service, presents, time, touch }, i) => {
        if (step === i)
          return (
            <div key={i}>
              <LoveLanguageWords
                afirmation={afirmation}
                service={service}
                presents={presents}
                time={time}
                touch={touch}
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
    first: "AF" | "SE" | "PE" | "TI" | "TO";
    second: "AF" | "SE" | "PE" | "TI" | "TO";
    third: "AF" | "SE" | "PE" | "TI" | "TO";
    fourth: "AF" | "SE" | "PE" | "TI" | "TO";
    fifth: "AF" | "SE" | "PE" | "TI" | "TO";
    firstScore: number;
    secondScore: number;
    thirdScore: number;
    fourthScore: number;
    fifthScore: number;
  }>({
    first: "AF",
    second: "AF",
    third: "AF",
    fourth: "AF",
    fifth: "AF",
    firstScore: 0,
    secondScore: 0,
    thirdScore: 0,
    fourthScore: 0,
    fifthScore: 0,
  });

  useEffect(() => {
    const data = sortScoresWithType({
      afirmationScore: values.afirmationWeight,
      serviceScore: values.serviceWeight,
      presentsScore: values.presentsWeight,
      timeScore: values.timeWeight,
      touchScore: values.touchWeight,
    });

    async function createResultLoveLanguage() {
      await api.post(`result/create_result`, {
        ll: {
          ...data,
          result: getCurrentKey().id,
          clinic: getCurrentKey().clinic,
        },
        result: {
          id: getCurrentKey().id,
          test: "LO",
          testTaken: "US",
        },
      });
    }

    setResult(data);
    createResultLoveLanguage();
  }, []);

  return (
    <div>
      <h1 className="text-9xl text-[#bfa15e] uppercase">
        {LO_DICT[result.first]}
      </h1>
    </div>
  );
};
