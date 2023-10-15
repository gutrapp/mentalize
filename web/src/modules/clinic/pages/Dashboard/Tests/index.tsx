import { useState } from "react";
import { Layout } from "../../../components/Layout";
import { DataTable } from "../../../../../components/DataTable";
import { DataTableHead } from "../../../../../components/DataTable/DataTableHead";
import { DataTableHeadLabels } from "../../../../../components/DataTable/DataTableHead/DataTableHeadLabels";
import { BsSquare } from "react-icons/bs";
import { DataTableHeadFilters } from "../../../../../components/DataTable/DataTableHead/DataTableHeadFilters";
import { DataTableInput } from "../../../../../components/DataTable/Input";
import { DataTableSelect } from "../../../../../components/DataTable/Select";
import {
  MBTI_CHOICES_EMPTY,
  PAGINATION_CHOICES,
} from "../../../../../helpers/choices.helper";
import { Params, ResponseMbti } from "../../../types/tests.type";
import { useTests } from "../../../hooks/useTests";
import { DataTableBody } from "../../../../../components/DataTable/DataTableBody";
import { DataTableFooter } from "../../../../../components/DataTable/DataTableFooter";
import { Redirect } from "../../../types/keys.types";
import { useNavigate } from "react-router-dom";
import { MBTI_DICT } from "../../../../../helpers/dict.helper";
import { Button } from "../../../../../components/Button/Button";

export const Tests = () => {
  const [selectTest, setSelectTest] = useState<"MB" | "LI" | "LO" | "SK">("MB");

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">
            Devolutórias
          </h1>
          <div className=" flex font-light text-sm mb-5">
            <label
              onClick={() => setSelectTest("MB")}
              className={
                selectTest === "MB"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Four Elements
            </label>
            <label
              onClick={() => setSelectTest("LI")}
              className={
                selectTest === "LI"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Vida
            </label>
            <label
              onClick={() => setSelectTest("SK")}
              className={
                selectTest === "SK"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Auto Conhecimento
            </label>
            <label
              onClick={() => setSelectTest("LO")}
              className={
                selectTest === "LO"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Linguagem Amorosa
            </label>
          </div>
          {selectTest === "MB" && <MbtiTable />}
        </div>
      </main>
    </Layout>
  );
};

const MbtiTable = () => {
  const router = useNavigate();

  const [params, setParams] = useState<Params>({
    first: "",
    second: "",
    firstScore: "",
    secondScore: "",
    first_name: "",
    last_name: "",
    email: "",
    key: "",
    limit: "25",
    offset: "0",
  });

  const { tests, filterTests } = useTests("MB", params);

  const handleTestRedirect = ({ id }: Redirect) => {
    router(`/clinic/tests/${id}/MB`);
  };

  return (
    <div>
      <div className="mb-2 w-full flex justify-end gap-2">
        <Button onClick={filterTests}>Filtrar</Button>
      </div>
      <DataTable>
        <DataTableHead>
          <DataTableHeadLabels>
            <td rowSpan={2} className="border-r px-4 justify-center">
              <BsSquare />
            </td>
            <td className="border-r px-2 pb-1">Nome:</td>
            <td className="border-r px-2 pb-1">Email:</td>
            <td className="border-r px-2 pb-1">Chave:</td>
            <td className="border-r px-2 pb-1">Dominante:</td>
            <td className="border-r px-2 pb-1">Sub-dominante:</td>
            <td className="border-r px-2 pb-1">Porcentagem Dominante:</td>
            <td className="border-r px-2 pb-1">Porcentagem Sub-dominante:</td>
          </DataTableHeadLabels>
          <DataTableHeadFilters>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.first_name}
                onChange={(e) =>
                  setParams({
                    ...params,
                    first_name: e.target.value,
                    last_name: e.target.value,
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.email}
                onChange={(e) =>
                  setParams({
                    ...params,
                    email: e.target.value,
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.key}
                onChange={(e) =>
                  setParams({
                    ...params,
                    key: e.target.value,
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableSelect
                choices={MBTI_CHOICES_EMPTY}
                value={params.first}
                onChange={(e) =>
                  setParams({
                    ...params,
                    first: e.target.value as "AR" | "EA" | "" | "FI" | "WA",
                  })
                }
              />
            </td>

            <td className="border-r px-2 pb-1">
              <DataTableSelect
                choices={MBTI_CHOICES_EMPTY}
                value={params.second}
                onChange={(e) =>
                  setParams({
                    ...params,
                    second: e.target.value as "AR" | "EA" | "" | "FI" | "WA",
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.firstScore}
                onChange={(e) =>
                  setParams({
                    ...params,
                    firstScore: e.target.value,
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.secondScore}
                onChange={(e) =>
                  setParams({
                    ...params,
                    secondScore: e.target.value,
                  })
                }
              />
            </td>
          </DataTableHeadFilters>
        </DataTableHead>
        <DataTableBody>
          {tests.map((test, index) => (
            <tr key={index}>
              <td className="border pl-4 justify-center">
                <BsSquare />
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.user.first_name} {test.user.last_name}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.user.email}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.result.key}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {MBTI_DICT[test.first]}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {MBTI_DICT[test.second]}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.firstScore} %
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.secondScore} %
              </td>
            </tr>
          ))}
        </DataTableBody>
        <DataTableFooter
          value={params.limit}
          resource="chaves"
          colSpan={6}
          onChange={(e) => setParams({ ...params, limit: e.target.value })}
          choices={PAGINATION_CHOICES}
          variant="min-w"
        />
      </DataTable>
    </div>
  );
};
