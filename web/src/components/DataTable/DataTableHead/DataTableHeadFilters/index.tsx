type DataTableHeadFiltersProps = {
  children: React.ReactNode;
};

export const DataTableHeadFilters = ({
  children,
}: DataTableHeadFiltersProps) => {
  return <tr className="border-b text-sm">{children}</tr>;
};
