import React from "react";
import { DataTableSelect } from "../Select";

type Choice = {
  choice: string;
  value: string;
};

type DataTableFooterProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  choices: Choice[];
  colSpan: number;
  resource: string;
  variant: "default" | "min-w";
};

export const DataTableFooter = ({
  value,
  onChange,
  choices,
  colSpan,
  resource,
  variant,
}: DataTableFooterProps) => {
  return (
    <tfoot className="border-t">
      <tr>
        <td className="px-2 py-1" colSpan={colSpan}>
          Quantidade de {resource}:
          <DataTableSelect
            value={value}
            onChange={onChange}
            choices={choices}
            variant={variant}
          />
        </td>
      </tr>
    </tfoot>
  );
};
