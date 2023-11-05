import { useState } from "react";
import { BsSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/Button/Button";
import { DataTable } from "../../../../components/DataTable";
import { DataTableBody } from "../../../../components/DataTable/DataTableBody";
import { DataTableFooter } from "../../../../components/DataTable/DataTableFooter";
import { DataTableHead } from "../../../../components/DataTable/DataTableHead";
import { DataTableHeadFilters } from "../../../../components/DataTable/DataTableHead/DataTableHeadFilters";
import { DataTableHeadLabels } from "../../../../components/DataTable/DataTableHead/DataTableHeadLabels";
import { DataTableInput } from "../../../../components/DataTable/Input";
import { PAGINATION_CHOICES } from "../../../../helpers/choices.helper";
import { useLife } from "../../hooks/useTests";
import { Redirect } from "../../types/keys.types";
import { ParamsLife } from "../../types/tests.type";

export const LifeTable = () => {
  const router = useNavigate();

  const [params, setParams] = useState<ParamsLife>({
    full_name: "",
    email: "",
    key: "",
    limit: "25",
    offset: "0",
    average: "",
    total: "",
  });

  const { tests, filterTests } = useLife(params);

  const handleTestRedirect = ({ id }: Redirect) => {
    router(`/clinic/tests/${id}/LO`);
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
            <td className="border-r px-2 pb-1">Total:</td>
            <td className="border-r px-2 pb-1">Média:</td>
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
              <DataTableInput
                value={params.total}
                onChange={(e) =>
                  setParams({
                    ...params,
                    total: e.target.value,
                  })
                }
              />
            </td>
            <td className="border-r px-2 pb-1">
              <DataTableInput
                value={params.average}
                onChange={(e) =>
                  setParams({
                    ...params,
                    average: e.target.value,
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
                {test.user.full_name}
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
                {test.total}
              </td>
              <td
                className="text-center border"
                onClick={() => handleTestRedirect(test)}
              >
                {test.average}
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
