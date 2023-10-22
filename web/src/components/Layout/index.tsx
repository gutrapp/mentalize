import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  display?: boolean;
};

export const Layout = ({ children, display = true }: LayoutProps) => {
  return (
    <main className="flex flex-col w-full">
      <header className="z-10">
        <Header />
      </header>
      <main>{children}</main>
      <footer className={display ? "z-10 hidden xl:flex" : "hidden"}>
        <Footer />
      </footer>
    </main>
  );
};
