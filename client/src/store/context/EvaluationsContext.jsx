import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvaluations } from '../../api/evaluation';

// Create the context
const EvaluationsContext = createContext({
  evaluations: [],
  evaluation: {},
  setEvaluation: () => { },
  isLoading: false,
  error: null,
});

// Create a provider component
export const EvaluationsProvider = ({ children }) => {
  const { data: evaluations, isLoading, error } = useQuery({
    queryKey: ['evaluations'],
    queryFn: fetchAllEvaluations,
  });

  const [evaluation, setEvaluation] = useState({});

  useEffect(() => console.log('evaluation zzz: ', evaluation))

  return (
    <EvaluationsContext.Provider value={{ evaluations, isLoading, error, evaluation, setEvaluation }}>
      {children}
    </EvaluationsContext.Provider>
  );
};

// Custom hook for using the Evaluations context
export const useEvaluations = () => {
  return useContext(EvaluationsContext);
};
