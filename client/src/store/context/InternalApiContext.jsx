import React, { createContext, useEffect, useState, useContext } from 'react';
import { fetchInternalDegrees, fetchInternalDegreeById } from '../../api/degree.js';
import { fetchAllInternalWorkplaces } from '../../api/workplace.js';
import useUnitsStore from '../zustand/unitsStore.js';
import AuthContext from './AuthContext';

const InternalApiContext = createContext();

export const InternalApiContextProvider = ({ children }) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setInternalDegreeId] = useState('');
  const [workplaces, setWorkplaces] = useState([]);
  const [workplace, setWorkplace] = useState({});
  const { loggedIn, role } = useContext(AuthContext);
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedIn || role !== "teacher") return;
      
      try {
        const internalDegrees = await fetchInternalDegrees();
        setAllInternalDegrees(internalDegrees);
      } catch (err) {
        console.error('Failed to fetch internal degrees:', err);
      }
      
      try {
        const fetchedWorkplaces = await fetchAllInternalWorkplaces();
        setWorkplaces(fetchedWorkplaces);
      } catch (err) {
        console.error('Failed to fetch workplaces:', err);
      }
    };

    fetchData();
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn || !internalDegreeId || role !== "teacher") return;

    const fetchDegree = async () => {
      try {
        const degree = await fetchInternalDegreeById(internalDegreeId);
        setInternalDegree(degree);
      } catch (err) {
        console.error('Failed to fetch internal degree:', err);
      }
    };

    setInternalDegree({});
    fetchDegree();
  }, [internalDegreeId, loggedIn]);

  const degreeFound = Object.keys(internalDegree).length > 0;

  useEffect(() => {
    if (internalDegreeId) {
      clearCheckedUnits();
      setInternalDegree({});
    }
  }, [internalDegreeId, clearCheckedUnits]);

  return (
    <InternalApiContext.Provider
      value={{
        internalDegree,
        allInternalDegrees,
        setInternalDegreeId,
        degreeFound,
        workplaces,
        workplace,
      }}
    >
      {children}
    </InternalApiContext.Provider>
  );
};

export default InternalApiContext;