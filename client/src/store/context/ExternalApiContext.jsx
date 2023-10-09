import React, { useEffect, useState, createContext } from 'react';
import useUnitsStore from '../zustand/unitsStore';
import { useCriteriaFieldsContext } from './CriteriaFieldsContext';
import { fetchDegreesFromEperusteet, fetchDegreeByIdFromEperusteet } from '../../api/degree.js';

const ExternalApiContext = createContext();

// Purpose of this Provider is to give manage data fetched from external APIs
// Currently used for fetching degrees from ePerusteet.
// Also could be used when fetching comopany data from avoin data.
export const ExternalApiContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');
  
  // Fetch all degrees from ePerusteet
  useEffect(() => {
    const getDegrees = async () => {
      try {
        const response = await fetchDegreesFromEperusteet();
        console.log('ePerusteet degrees: ', response.data)
        setAllDegrees(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getDegrees();
  }, []);

  // Fetch degree by id
  useEffect(() => {
    const getDegree = async () => {
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
  }, [degreeId]);

  // Check if degree object is empty  
  const degreeFound = Object.keys(degree).length > 0 ? true : false

  // Clear checked units, assessments, degree data when degreeId changes
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);
  const { setCriteriaFields } = useCriteriaFieldsContext();

  useEffect(() => {
    clearCheckedUnits();
    setCriteriaFields(Array.from({ length: 3 }, () => ['']));
    setDegree({});
  }, [degreeId]);

  return (
    <ExternalApiContext.Provider value={{ degree, allDegrees, setDegreeId, degreeFound }}>
      {props.children}
    </ExternalApiContext.Provider>
  );
};

export default ExternalApiContext;