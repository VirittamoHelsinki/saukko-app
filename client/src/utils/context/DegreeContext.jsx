import React, { useEffect, useState, createContext } from 'react';
import useUnitsStore from '../../store/unitsStore';
import { fetchAll, fetchById } from '../../api/degree.js';

const DegreeContext = createContext();

const DegreeContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');
  
  // Fetch all degrees from ePerusteet
  useEffect(() => {
    const getDegrees = async () => {
      try {
        const response = await fetchAll();
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
        const degreeResponse = await fetchById(degreeId);
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

  // Clear checked units when degreeId changes
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
  }, [degreeId]);

  return (
    <DegreeContext.Provider value={{ degree, allDegrees, setDegreeId, degreeFound }}>
      {props.children}
    </DegreeContext.Provider>
  );
};

export default DegreeContext;
export { DegreeContextProvider };
