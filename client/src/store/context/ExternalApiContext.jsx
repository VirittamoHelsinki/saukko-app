import React, { useEffect, useState, createContext, useContext } from 'react';
import useUnitsStore from '../zustand/unitsStore';
import { fetchDegreesFromEperusteet, fetchDegreeByIdFromEperusteet } from '../../api/degree.js';
import AuthContext from './AuthContext';

const ExternalApiContext = createContext();

export const ExternalApiContextProvider = (props) => {
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');
  const { loggedIn, role } = useContext(AuthContext);

  useEffect(() => {
    const getDegrees = async () => {
      if (!loggedIn || role !== "teacher") return;
      try {
        const response = await fetchDegreesFromEperusteet();
        console.log('ePerusteet degrees: ', response.data)
        setAllDegrees(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getDegrees();
  }, [loggedIn]); // Added loggedIn to the dependency array

  useEffect(() => {
    const getDegree = async () => {
      if (!loggedIn || role !== "teacher") return;

      try {
        const degreeResponse = await fetchDegreeByIdFromEperusteet(degreeId);
        console.log('ePerusteet degree: ', degreeResponse.data)
        setDegree(degreeResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    setDegree({});
    getDegree();
  }, [degreeId, loggedIn]);

  const degreeFound = Object.keys(degree).length > 0 ? true : false;

  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
    setDegree({});
  }, [degreeId]);

  return (
    <ExternalApiContext.Provider value={{ degree, allDegrees, setDegreeId, degreeFound }}>
      {props.children}
    </ExternalApiContext.Provider>
  );
};

export default ExternalApiContext;