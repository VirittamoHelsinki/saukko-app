import { createContext, useContext, useState } from 'react';

const CriteriaFieldsContext = createContext();

export function useCriteriaFieldsContext() {
  return useContext(CriteriaFieldsContext);
}

export function CriteriaFieldsContextProvider({ children }) {
  const [criteriaFields, setCriteriaFields] = useState([]); // Rename CriteriaFields to criteriaFields

  return (
    <CriteriaFieldsContext.Provider
      value={{ criteriaFields, setCriteriaFields }}
    >
      {children}
    </CriteriaFieldsContext.Provider>
  );
}
