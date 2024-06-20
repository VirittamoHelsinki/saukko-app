import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllEvaluations } from '../../api/evaluation';
import { useLocation } from 'react-router-dom';

// Create the context
const EvaluationsContext = createContext({
  evaluations: [],
  evaluation: {},
  setEvaluation: () => null,
  refetchEvaluations: () => null,
  isLoading: false,
  error: null,
});

// Create a provider component
export const EvaluationsProvider = ({ children }) => {
  const { data: evaluations, isLoading, error, refetch } = useQuery({
    queryKey: ['evaluations'],
    queryFn: fetchAllEvaluations,
  });

  const [evaluation, setEvaluation] = useState(() => {
    // Retrieve the initial evaluation state from localStorage if it exists
    const savedEvaluation = localStorage.getItem('evaluation');
    return savedEvaluation ? JSON.parse(savedEvaluation) : null;
  });

  const location = useLocation();
  const previousLocation = useRef(location);

  // Save evaluation to localStorage whenever it changes
  useEffect(() => {
    if (evaluation && Object.keys(evaluation).length > 0) {
      localStorage.setItem('evaluation', JSON.stringify(evaluation));
    }
  }, [evaluation]);

  // Monitor route changes and clear localStorage if needed
  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = previousLocation.current.pathname;

    const matchesUnitListPrev = /^\/unit-list\/[a-fA-F0-9]{24}$/.test(prevPath);
    const matchesUnitListCurrent = /^\/unit-list\/[a-fA-F0-9]{24}$/.test(currentPath)
    const matchesUserPerformance = /^\/userperformance\/\d+$/.test(currentPath);
    const matchesContractInfoCurrent = /^\/contract-info\/[a-fA-F0-9]{24}$/.test(currentPath);
    const matchesContractInfoPrev = /^\/contract-info\/[a-fA-F0-9]{24}$/.test(prevPath);

    if (matchesUnitListPrev && !matchesUserPerformance && !matchesUnitListCurrent && !matchesContractInfoCurrent
      || matchesContractInfoPrev && (/^\/$/).test(currentPath)) {
      localStorage.removeItem('evaluation');
      setEvaluation(null);
      console.log('remove evaluation')
    }

    // Update previousLocation ref to current location after check
    previousLocation.current = location;
  }, [location]);

  useEffect(() => {
    console.log('evaluation context: ', evaluation);
  }, [evaluation]);

  return (
    <EvaluationsContext.Provider value={{ evaluations, isLoading, error, evaluation, setEvaluation, refetchEvaluations: refetch }}>
      {children}
    </EvaluationsContext.Provider>
  );
};

// Custom hook for using the Evaluations context
export const useEvaluations = () => {
  return useContext(EvaluationsContext);
};
