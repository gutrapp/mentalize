import { useKeys } from "../../../hooks/useKeys";
import { DataTable } from "../../../../../components/DataTable";
import { DataTableBody } from "../../../../../components/DataTable/DataTableBody";
import { DataTableFooter } from "../../../../../components/DataTable/DataTableFooter";
import { DataTableHead } from "../../../../../components/DataTable/DataTableHead";
import { DataTableHeadFilters } from "../../../../../components/DataTable/DataTableHead/DataTableHeadFilters";
import { DataTableHeadLabels } from "../../../../../components/DataTable/DataTableHead/DataTableHeadLabels";
import { DataTableInput } from "../../../../../components/DataTable/Input";
import { DataTableSelect } from "../../../../../components/DataTable/Select";
import { BsSquare } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { FormEvent, useContext, useState } from "react";
import {
  EXPIRATION_CHOICES,
  PAGINATION_CHOICES,
  REVIEW_CHOICES,
  TEST_CHOICES,
  TEST_CHOICES_NO_EMPTY,
  USABILITY_CHOICES,
} from "../../../../../helpers/choices.helper";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../components/Layout";
import { Modal } from "../../../../../components/Modal/Modal";
import { Button } from "../../../../../components/Button/Button";
import { AdminContext } from "../../../../../context/AdminContext";
import { Input } from "../../../../../components/Input";
import { Select } from "../../../../../components/Select/Select";
import api from "../../../../../api/api.config";
import { Params, Redirect } from "../../../types/keys.types";
import { useAvailablePeople } from "../../../hooks/useAvailablePeople";
import { ClinicContext } from "../../../../../context/ClinicContext";
import {
  EXPIRATION_DICT,
  REVIEW_DICT,
  TEST_DICT,
  USABILITY_DICT,
} from "../../../../../helpers/dict.helper";
import { cpfFormatacao } from "../../../../../helpers/formatters.helper";

export const Keys = () => {
  const router = useNavigate();

  const { getCurrentClinic } = useContext(ClinicContext);

  const { getCurrentAdmin } = useContext(AdminContext);

  const [params, setParams] = useState<Params>({
    offset: "0",
    limit: "25",
    expired: "",
    testTaken: "",
    key: "",
    seen: "",
    created_at: "",
    expires_at: "",
    person__user__first_name: "",
    person__user__last_name: "",
    test: "",
  });

  const { keys, fetchKeys, filterKeys } = useKeys(params);

  const { people } = useAvailablePeople();

  const [open, setOpen] = useState<boolean>(false);

  const [key, setKey] = useState<{
    key: string;
    test: "MB" | "SK" | "LO" | "LI";
  }>({
    key: "",
    test: "MB",
  });

  const [personFilter, setPersonFilter] = useState<{
    cpf: string;
    email: string;
  }>({ cpf: "", email: "" });

  const handleKeyRedirect = ({ id }: Redirect) => {
    router(`/clinic/keys/${id}`);
  };

  const handleCreateKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...key,
      person: filterPeopleCPFEmail(personFilter).id,
      clinic: getCurrentClinic().id,
    };

    return await api.post("result", data).then((response) => {
      if (response.status === 201) {
        fetchKeys();
        setOpen(!open);
        setPersonFilter({ cpf: "", email: "" });
        setKey({ key: "", test: "MB" });
      }
    });
  };

  const filterPeopleCPFEmail = ({
    cpf,
    email,
  }: {
    cpf: string;
    email: string;
  }) => {
    return people.filter((p) => p.cpf === cpf && p.user.email === email)[0];
  };

  return (
    <Layout>
      <main className="text-[#414042] m-5 bg-white rounded-md border h-full w-full px-5 py-5 mt-[80px]">
        <h1 className="text-[#BB926B] text-4xl mb-10 font-bold">Chaves</h1>
        <div className="mb-2 w-full flex justify-end gap-2">
          {getCurrentAdmin().role === "A" && (
            <Modal
              label="Criar chave"
              open={open}
              Icon={AiOutlinePlus}
              setOpen={setOpen}
            >
              <form
                onSubmit={handleCreateKey}
                className="flex flex-col items-start gap-[1.2rem] w-full"
              >
                <h1 className="font-bold text-lg border-[#534559] border-b-2 w-full text-[#534559]">
                  Informações da Pessoa:
                </h1>
                <Input
                  title="CPF:"
                  type="text"
                  className="w-full"
                  value={cpfFormatacao(personFilter.cpf)}
                  onChange={(e) => {
                    setPersonFilter({
                      ...personFilter,
                      cpf: e.target.value,
                    });
                  }}
                />
                <Input
                  title="Email:"
                  type="text"
                  className="w-full"
                  value={personFilter.email}
                  onChange={(e) =>
                    setPersonFilter({ ...personFilter, email: e.target.value })
                  }
                />
                <h1 className="font-bold text-md border-[#534559] border-b-2 w-full text-[#534559]">
                  Informações da Chave:
                </h1>
                <Input
                  className="w-full"
                  title="Chave:"
                  type="text"
                  value={key.key}
                  onChange={(e) => {
                    setKey({
                      ...key,
                      key: e.target.value,
                    });
                  }}
                />
                <Select
                  title="Teste:"
                  value={key.test}
                  onChange={(e) => {
                    setKey({
                      ...key,
                      test: e.target.value as "MB" | "SK" | "LO" | "LI",
                    });
                  }}
                  choices={TEST_CHOICES_NO_EMPTY}
                />
                <div className="w-full flex items-center justify-center">
                  <Button>Criar</Button>
                </div>
              </form>
            </Modal>
          )}
          <Button onClick={filterKeys}>Filtrar</Button>
          {getCurrentAdmin().role === "A" && (
            <Button variant="secondary">Apagar chave(s)</Button>
          )}
        </div>
        <DataTable>
          <DataTableHead>
            <DataTableHeadLabels>
              <td rowSpan={2} className="border-r px-4 justify-center">
                <BsSquare />
              </td>
              <td className="border-r px-2 pb-1">Usado:</td>
              <td className="border-r px-2 pb-1">Pessoa:</td>
              <td className="border-r px-2 pb-1">Chave:</td>
              <td className="border-r px-2 pb-1">Teste:</td>
              <td className="border-r px-2 pb-1">Review:</td>
              <td className="border-r px-2 pb-1">Vencido:</td>
              <td className="border-r px-2 pb-1">Dia de vencimento:</td>
            </DataTableHeadLabels>
            <DataTableHeadFilters>
              <td className="border-r px-2 pb-1">
                <DataTableSelect
                  choices={USABILITY_CHOICES}
                  value={params.testTaken}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      testTaken: e.target.value as "US" | "NU" | "",
                    })
                  }
                />
              </td>
              <td className="border-r px-2 pb-1">
                <DataTableInput
                  value={params.person__user__first_name}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      person__user__first_name: e.target.value,
                      person__user__last_name: e.target.value,
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
                  choices={TEST_CHOICES}
                  value={params.test}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      test: e.target.value as "MB" | "SK" | "LO" | "LI" | "",
                    })
                  }
                />
              </td>
              <td className="border-r px-2 pb-1">
                <DataTableSelect
                  choices={REVIEW_CHOICES}
                  value={params.seen}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      seen: e.target.value as "VI" | "" | "NV",
                    })
                  }
                />
              </td>
              <td className="border-r px-2 pb-1">
                <DataTableSelect
                  choices={EXPIRATION_CHOICES}
                  value={params.expired}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      expired: e.target.value as "EX" | "" | "VA",
                    })
                  }
                />
              </td>
              <td className="border-r">
                <DataTableInput
                  value={params.expires_at}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      expires_at: e.target.value,
                    })
                  }
                />
              </td>
            </DataTableHeadFilters>
          </DataTableHead>
          <DataTableBody>
            {keys.map((key, index) => (
              <tr key={index}>
                <td className="border pl-4 justify-center">
                  <BsSquare />
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {USABILITY_DICT[key.testTaken]}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {key.person.user.first_name} {key.person.user.last_name}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {key.key}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {TEST_DICT[key.test]}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {REVIEW_DICT[key.seen]}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {EXPIRATION_DICT[key.expired]}
                </td>
                <td
                  className="text-center border"
                  onClick={() => handleKeyRedirect(key)}
                >
                  {key.expires_at}
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
      </main>
    </Layout>
  );
};
