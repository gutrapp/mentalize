import { useState } from "react";
import { Layout } from "../../../components/Layout";
import { MbtiTable } from "../../../components/ResultTables/mbti";
import { SelfKnowledgeTable } from "../../../components/ResultTables/selfKnowledge";
import { LoveLanguageTable } from "../../../components/ResultTables/loveLanguage";
import { LifeTable } from "../../../components/ResultTables/life";

export const Tests = () => {
  const [selectTest, setSelectTest] = useState<"MB" | "LI" | "LO" | "SK">("MB");

  return (
    <Layout>
      <main className="w-full flex flex-col m-5 mt-[80px] gap-5 text-base font-medium">
        <div className="text-[#414042] bg-white rounded-md border w-full p-5">
          <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">
            Devolutórias
          </h1>
          <div className=" flex font-light text-sm mb-5">
            <label
              onClick={() => setSelectTest("MB")}
              className={
                selectTest === "MB"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Four Elements
            </label>
            <label
              onClick={() => setSelectTest("LI")}
              className={
                selectTest === "LI"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Vida
            </label>
            <label
              onClick={() => setSelectTest("SK")}
              className={
                selectTest === "SK"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Auto Conhecimento
            </label>
            <label
              onClick={() => setSelectTest("LO")}
              className={
                selectTest === "LO"
                  ? "text-[#BB926B] underline-offset-4 underline-[#BB926B] underline rounded-md font-bold ease-in-out duration-300 px-2"
                  : "rounded-md hover:font-bold ease-in-out duration-300 px-2"
              }
            >
              Linguagem Amorosa
            </label>
          </div>
          {selectTest === "MB" && <MbtiTable />}
          {selectTest === "SK" && <SelfKnowledgeTable />}
          {selectTest === "LO" && <LoveLanguageTable />}
          {selectTest === "LI" && <LifeTable />}
        </div>
      </main>
    </Layout>
  );
};
