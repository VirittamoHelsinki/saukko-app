import { createContext, useContext, useState } from 'react';

const CriteriaFieldsContext = createContext();

export function useCriteriaFieldsContext() {
  return useContext(CriteriaFieldsContext);
}

export function CriteriaFieldsContextProvider({ children, maxSteps }) {
  const [criteriaFields, setCriteriaFields] = useState(
    Array.from({ length: 3 }, () => [''])
  );
  return (
    <CriteriaFieldsContext.Provider
      value={{ criteriaFields, setCriteriaFields }}
    >
      {children}
    </CriteriaFieldsContext.Provider>
  );
}

export default CriteriaFieldsContext;
