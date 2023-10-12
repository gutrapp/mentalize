import React from "react";

type DataTableProps = {
  children: React.ReactNode;
};

export function DataTable({ children }: DataTableProps) {
  return <table className="border p-2 bg-white w-full">{children}</table>;
}
