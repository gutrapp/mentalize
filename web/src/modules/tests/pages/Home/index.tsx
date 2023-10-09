import { useState } from "react";
import { DataTable } from "../../../../components/DataTable";
import { DataTableBody } from "../../../../components/DataTable/DataTableBody";
import { DataTableFooter } from "../../../../components/DataTable/DataTableFooter";
import { DataTableHead } from "../../../../components/DataTable/DataTableHead";
import { DataTableHeadFilters } from "../../../../components/DataTable/DataTableHead/DataTableHeadFilters";
import { DataTableHeadLabels } from "../../../../components/DataTable/DataTableHead/DataTableHeadLabels";
import { DataTableInput } from "../../../../components/DataTable/Input";
import { DataTableSelect } from "../../../../components/DataTable/Select";
import { BsSquare } from "react-icons/bs";

const MOCK_KEYS = [
  {
    id: 1,
    person: "Gustavo Trapp",
    expired: "E",
    testTaken: "U",
    test: "MB",
    key: "key",
    expire_date: "28-10-203",
    created_at: "10-11-2023",
  },
  {
    id: 2,
    person: "Pedro Trapp",
    expired: "V",
    testTaken: "N",
    test: "SK",
    key: "key",
    expire_date: "28-10-203",
    created_at: "10-11-2023",
  },
];

type Params = {
  person: string;
  expired: "V" | "E";
  testTaken: "N" | "U";
  test: "MB" | "SK" | "LO" | "LI";
  key: string;
  expire_date: string;
  created_at: string;
  pagination: number;
};

export const Home = () => {
  const [params, setParams] = useState<Params>({
    person: "",
    expired: "V",
    testTaken: "N",
    test: "MB",
    key: "",
    expire_date: "",
    created_at: "",
    pagination: 50,
  });

  return (
    <main className="m-20 text-[#414042]">
      <DataTable>
        <DataTableHead>
          <DataTableHeadLabels>
            <td rowSpan={2} className="border-r px-4">
              <BsSquare />
            </td>
            <td className="border-r">Usado:</td>
            <td className="border-r">Pessoa:</td>
            <td className="border-r">Chave:</td>
            <td className="border-r">Teste:</td>
            <td className="border-r">Vencido:</td>
            <td className="border-r">Dia de vencimento:</td>
          </DataTableHeadLabels>
          <DataTableHeadFilters>
            <td className="border-r">
              <DataTableSelect
                choices={[{ choice: "Não Usado", value: "N" }]}
              />
            </td>
            <td className="border-r">
              <DataTableInput />
            </td>
            <td className="border-r">
              <DataTableInput />
            </td>
            <td className="border-r">
              <DataTableSelect
                choices={[{ choice: "Four Elements", value: "MB" }]}
              />
            </td>
            <td className="border-r">
              <DataTableSelect choices={[{ choice: "Vencido", value: "V" }]} />
            </td>
            <td className="border-r">
              <DataTableInput />
            </td>
          </DataTableHeadFilters>
        </DataTableHead>
        <DataTableBody>
          {MOCK_KEYS.map(
            ({ key, person, test, testTaken, expired, expire_date }, i) => (
              <tr key={i}>
                <td className="border pl-4">
                  <BsSquare />
                </td>
                <td className="text-center border">{testTaken}</td>
                <td className="text-center border">{person}</td>
                <td className="text-center border">{key}</td>
                <td className="text-center border">{test}</td>
                <td className="text-center border">{expired}</td>
                <td className="text-center border">{expire_date}</td>
              </tr>
            )
          )}
        </DataTableBody>
        <DataTableFooter
          value={params.pagination}
          resource="chaves"
          colSpan={6}
          onChange={(e) =>
            setParams({ ...params, pagination: parseInt(e.target.value) })
          }
          choices={[
            { choice: "5", value: "5" },
            { choice: "10", value: "10" },
            { choice: "25", value: "25" },
            { choice: "50", value: "50" },
            { choice: "100", value: "100" },
            { choice: "250", value: "250" },
            { choice: "500", value: "500" },
          ]}
        />
      </DataTable>
    </main>
  );
};
