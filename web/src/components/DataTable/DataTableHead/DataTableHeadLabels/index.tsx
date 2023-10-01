type DataTableHeadLabelsProps = {
  children: React.ReactNode;
};

export const DataTableHeadLabels = ({ children }: DataTableHeadLabelsProps) => {
  return <tr className="font-bold">{children}</tr>;
};
