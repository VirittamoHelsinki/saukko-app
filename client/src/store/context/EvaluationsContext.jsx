import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvaluations } from '../../api/evaluation';

// Create the context
const EvaluationsContext = createContext({
  evaluations: [],
  isLoading: false,
  error: null,
});

// Create the context for the current evaluation
const CurrentEvaluationContext = createContext({
  currentEvaluation: null,
  setCurrentEvaluation: () => { },
});

// Create a provider component
export const EvaluationsProvider = ({ children }) => {
  const { data: evaluations, isLoading, error } = useQuery({
    queryKey: ['evaluations'],
    queryFn: fetchAllEvaluations,
  });

  return (
    <EvaluationsContext.Provider value={{ evaluations, isLoading, error }}>
      {children}
    </EvaluationsContext.Provider>
  );
};

export const CurrentEvaluationProvider = ({ children }) => {
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  return (
    <CurrentEvaluationContext.Provider value={{ currentEvaluation, setCurrentEvaluation }}>
      {children}
    </CurrentEvaluationContext.Provider>
  );
};

// Custom hook for using the Evaluations context
export const useEvaluations = () => {
  return useContext(EvaluationsContext);
};

export const useCurrentEvaluation = () => {
  return useContext(CurrentEvaluationContext);
};
