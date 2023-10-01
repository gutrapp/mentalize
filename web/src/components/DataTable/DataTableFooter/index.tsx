import React from "react";
import { DataTableSelect } from "../Select";

type Choice = {
  choice: string;
  value: string;
};

type DataTableFooterProps = {
  value: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  choices: Choice[];
  colSpan: number;
  resource: string;
};

export const DataTableFooter = ({
  value,
  onChange,
  choices,
  colSpan,
  resource,
}: DataTableFooterProps) => {
  return (
    <tfoot className="border-t">
      <tr>
        <td colSpan={colSpan}>
          Quantidade de {resource}:
          <DataTableSelect
            value={value}
            onChange={onChange}
            choices={choices}
          />
        </td>
      </tr>
    </tfoot>
  );
};
