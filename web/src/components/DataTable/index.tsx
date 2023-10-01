import React from "react";

type DataTableProps = {
  children: React.ReactNode;
};

export function DataTable({ children }: DataTableProps) {
  return <table className="rounded-full border p-2">{children}</table>;
}
