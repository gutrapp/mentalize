import { Layout } from "../../../../components/Layout";
import { Hero } from "./Hero";
import { Method } from "./Method";
import { Phrases } from "./Phrase";
import { Tests } from "./Tests";
import { Who } from "./Who";

export const Home = () => {
  return (
    <Layout>
      <Hero />
      <Who />
      <Tests />
      <Method />
      <Phrases />
    </Layout>
  );
};
