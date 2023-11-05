import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { KeyContext } from "../../../context/KeyContext";
import { Life } from "../../../../../models/life";
import api from "../../../../../api/api.config";
import { Button } from "../../../../../components/Button/Button";
import { Layout } from "../../../../../components/Layout";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { Input } from "../../../../../components/Input";

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type TestQuestionsProps = {
  data: MutableRefObject<{
    total: number;
    average: number;
    clinic: number;
    result: number;
  }>;
  answers: Omit<Life, "id" | "average" | "total">;
  setAnswers: React.Dispatch<
    React.SetStateAction<Omit<Life, "id" | "average" | "total">>
  >;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type HelperProps = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

type ResultProps = {
  answers: Omit<Life, "id" | "average" | "total">;
  data: {
    total: number;
    average: number;
    clinic: number;
    result: number;
  };
};

export const LifeTest = () => {
  const router = useNavigate();

  const { getCurrentKey, removeCurrentKey } = useContext(KeyContext);

  const [step, setStep] = useState<number>(0);

  const data = useRef<{
    total: number;
    average: number;
    clinic: number;
    result: number;
  }>({
    total: 0,
    average: 0,
    clinic: getCurrentKey().clinic,
    result: getCurrentKey().id,
  });

  const [answers, setAnswers] = useState<
    Omit<Life, "id" | "average" | "total">
  >({
    espiritual: 0,
    mente: 0,
    saude: 0,
    prosperidade: 0,
    carreira: 0,
    amor: 0,
    diversao: 0,
    dinheiro: 0,
    disciplina: 0,
    felicidade: 0,
    proposito: 0,
  });

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
        {step <= 1 && step > 0 && (
          <TestQuestions
            step={step}
            setStep={setStep}
            answers={answers}
            setAnswers={setAnswers}
            data={data}
          />
        )}
        {step === 2 && <Result answers={answers} data={data.current} />}
      </main>
    </Layout>
  );
};

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

const Result = ({ answers, data }: ResultProps) => {
  const { getCurrentKey } = useContext(KeyContext);

  useEffect(() => {
    const handleSubmit = async () => {
      await api.post("result/create_result", {
        life: { ...data, ...answers },
        result: { id: getCurrentKey().id, test: "LI", testTaken: "US" },
      });
    };

    handleSubmit();
  }, []);

  return (
    <div>
      <h1 className="text-9xl text-[#bfa15e] uppercase">{data.average}</h1>
    </div>
  );
};

const TestQuestions = ({
  data,
  answers,
  setAnswers,
  step,
  setStep,
}: TestQuestionsProps) => {
  const handleNextStep = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    data.current.total = Object.keys(answers)
      //@ts-expect-error
      .map((answer) => parseInt(answers[answer as keyof typeof answers]))
      .reduce((total, value) => {
        return total + value;
      }, 0);

    if (data.current.total > 110) {
      return;
    }

    data.current.average = parseInt(
      (data.current.total / Object.keys(answers).length).toFixed(3)
    );
    setStep(step + 1);
  };

  return (
    <div className="mx-36 h-full w-[70%] flex flex-col justify-center items-center gap-y-12 pt-40">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-14 text-6xl text-[#bfa15e]">Elementos da vida</h1>
        <div className="grid grid-cols-5 gap-x-10 gap-y-5">
          {Object.keys(answers).map((answer) => {
            return (
              <Input
                title={capitalizeFirstLetter(answer)}
                type="text"
                onChange={(e) =>
                  setAnswers({ ...answers, [answer]: e.target.value })
                }
                value={answers[answer as keyof typeof answers] || 0}
              />
            );
          })}
        </div>
      </div>
      <div>
        <Button onClick={(e) => handleNextStep(e)}>Próximo</Button>
      </div>
    </div>
  );
};
