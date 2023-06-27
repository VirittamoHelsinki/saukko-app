import React, { useEffect, useState, createContext } from 'react';
import useUnitsStore from '../../unitsStore';
import axios from 'axios';

const DegreeContext = createContext();

const DegreeContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');
  
  // Fetch all degrees from server
  useEffect(() => {
    const getDegrees = async () => {
      try {
        const degreesResponse = await axios.get(
          'http://localhost:5000/api/degrees'
        );
        // Set state
        setAllDegrees(degreesResponse.data);
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
        const degreeResponse = await axios.get(
          `http://localhost:5000/api/degree/${degreeId}`
        );
        // Set state
        setDegree(degreeResponse.data);
      } catch (err) {
        setDegree({});
        console.error(err);
      }
    };
  
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
