import { createContext, useContext, useState } from "react";

const Ctx = createContext(null);

export const useHeadingContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error('Call "useHeadingContext" only inside a "HeadingContextProvider"');
  }
  return ctx;
}

const HeadingContextProvider = ({children}) => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <Ctx.Provider value={{
      heading,
      setHeading,
      subHeading,
      setSubHeading,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export default HeadingContextProvider;
