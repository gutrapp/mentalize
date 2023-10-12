import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="text-[#414042]">
      <Header />
      <Sidebar>{children}</Sidebar>
    </main>
  );
};
