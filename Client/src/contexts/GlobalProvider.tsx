import { ReactNode, createContext } from "react";

const globalContext = createContext("Default");

type GlobalProviderProps = {
  children: ReactNode;
};

export default function GlobalProvider({ children }: GlobalProviderProps) {
  <globalContext.Provider value={"Hello world"}>
    {children}
  </globalContext.Provider>;
}
