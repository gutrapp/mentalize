type DataTableHeadProps = {
  children: React.ReactNode;
};

export const DataTableHead = ({ children }: DataTableHeadProps) => {
  return <thead>{children}</thead>;
};
