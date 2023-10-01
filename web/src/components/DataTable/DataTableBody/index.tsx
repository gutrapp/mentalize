type DataTableBodyProps = {
  children: React.ReactNode;
};

export const DataTableBody = ({ children }: DataTableBodyProps) => {
  return <tbody>{children}</tbody>;
};
