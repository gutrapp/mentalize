import { useNavigate } from "react-router-dom";
import { Layout } from "../../../../components/Layout";
import { useUserKeys } from "../../hooks/useUserKeys";
import { EXPIRATION_DICT, TEST_DICT } from "../../../../helpers/dict.helper";
import { MouseEvent, useContext, useEffect } from "react";
import { KeyContext } from "../../context/KeyContext";
import { UserResult } from "../../types/test.types";

export const UserTests = () => {
  const router = useNavigate();

  const { getCurrentKey, setCurrentKey } = useContext(KeyContext);

  const { keys } = useUserKeys();

  const handleRedirect = (e: MouseEvent<HTMLDivElement>, key: UserResult) => {
    e.preventDefault();
    setCurrentKey(key);
    router(`/tests/${key.test}`);
  };

  useEffect(() => {
    if (getCurrentKey().id) router(`/tests/${getCurrentKey().test}`);
  }, []);

  return (
    <Layout display={false}>
      <main className="text-[#414042] m-5 bg-white rounded-md border h-full px-5 py-5 mt-[100px]">
        <h1 className="text-[#BB926B] text-4xl mb-12 font-bold">Chaves</h1>
        <div className="grid grid-cols-5 gap-10 w-full">
          {keys.map((key, i) => {
            return (
              <div
                onClick={(e) => handleRedirect(e, key)}
                key={i}
                className="group ring-2 ring-[#534559] hover:ring-[#BB926B] ring-offset-2 rounded-md p-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out"
              >
                <h1 className="group-hover:text-[#BB926B] font-bold text-[#534559] text-lg duration-300 ease-in-out">
                  {TEST_DICT[key.test]}
                </h1>
                <label className="text-sm">
                  Situação: {EXPIRATION_DICT[key.expired]}
                </label>
                <p className="flex font-light text-sm items-center">
                  Data de Vencimento: {key.expires_at}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};
