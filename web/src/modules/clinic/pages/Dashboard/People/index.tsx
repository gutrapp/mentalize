import { useNavigate } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { useState } from "react";
import { Params } from "../../../types/person.types";
import { usePeople } from "../../../hooks/usePeople";
import { Redirect } from "../../../types/keys.types";
import { Button } from "../../../../../components/Button/Button";
import { DataTable } from "../../../../../components/DataTable";
import { DataTableHead } from "../../../../../components/DataTable/DataTableHead";
import { DataTableHeadLabels } from "../../../../../components/DataTable/DataTableHead/DataTableHeadLabels";
import { BsSquare } from "react-icons/bs";
import { DataTableHeadFilters } from "../../../../../components/DataTable/DataTableHead/DataTableHeadFilters";
import { DataTableSelect } from "../../../../../components/DataTable/Select";
import { DataTableInput } from "../../../../../components/DataTable/Input";
import { DataTableBody } from "../../../../../components/DataTable/DataTableBody";
import { DataTableFooter } from "../../../../../components/DataTable/DataTableFooter";
import {
  PAGINATION_CHOICES,
  SEX_CHOICES_EMPTY,
} from "../../../../../helpers/choices.helper";
import { SEX_DICT } from "../../../../../helpers/dict.helper";

export const People = () => {
  const router = useNavigate();

  const [params, setParams] = useState<Params>({
    offset: "0",
    limit: "25",
    cpf: "",
    age: "",
    sex: "",
    full_name: "",
    email: "",
    telefone: "",
  });

  const { people, filterPeople } = usePeople(params);

  const handlePersonRedirect = ({ id }: Redirect) => {
    router(`/clinic/people/${id}`);
  };

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-10 font-bold">Pessoas</h1>
          <div className="mb-2 w-full flex justify-end gap-2">
            <Button onClick={filterPeople}>Filtrar</Button>
          </div>
          <DataTable>
            <DataTableHead>
              <DataTableHeadLabels>
                <td rowSpan={2} className="border-r px-4 justify-center">
                  <BsSquare />
                </td>
                <td className="border-r px-2 pb-1">Nome:</td>
                <td className="border-r px-2 pb-1">CPF:</td>
                <td className="border-r px-2 pb-1">Email:</td>
                <td className="border-r px-2 pb-1">Sexo:</td>
                <td className="border-r px-2 pb-1">Idade:</td>
                <td className="border-r px-2 pb-1">Telefone:</td>
              </DataTableHeadLabels>
              <DataTableHeadFilters>
                <td className="border-r px-2 pb-1">
                  <DataTableInput
                    value={params.full_name}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        full_name: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border-r px-2 pb-1">
                  <DataTableInput
                    value={params.cpf}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        cpf: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border-r">
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
                  <DataTableSelect
                    choices={SEX_CHOICES_EMPTY}
                    value={params.sex}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        sex: e.target.value as "M" | "F" | "",
                      })
                    }
                  />
                </td>
                <td className="border-r px-2 pb-1">
                  <DataTableInput
                    value={params.age}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        age: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border-r px-2 pb-1">
                  <DataTableInput
                    value={params.telefone}
                    onChange={(e) =>
                      setParams({
                        ...params,
                        telefone: e.target.value,
                      })
                    }
                  />
                </td>
              </DataTableHeadFilters>
            </DataTableHead>
            <DataTableBody>
              {people.map((person, index) => (
                <tr key={index}>
                  <td className="border pl-4 justify-center">
                    <BsSquare />
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {person.user.full_name}
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {person.cpf}
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {person.user.email}
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {SEX_DICT[person.sex]}
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {person.age}
                  </td>
                  <td
                    className="text-center border"
                    onClick={() => handlePersonRedirect(person)}
                  >
                    {person.cellphone.telefone}
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
      </main>
    </Layout>
  );
};
