import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';

const DegreeContext = createContext();

const DegreeContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [path, setPath] = useState('');
  
  // Fetch all degrees from server
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

  useEffect(() => {
    getDegrees();
  }, []);

  // Fetch degree by id
  const getDegree = async () => {
    try {
      const degreeResponse = await axios.get(
        `http://localhost:5000/api/degree/${path}`
      );
      // Set state
      setDegree(degreeResponse.data);
    } catch (err) {
      setDegree({})
      console.error(err);
    }
  };

  useEffect(() => {
    getDegree();
  }, [path]);

  return (
    <DegreeContext.Provider value={{ degree, allDegrees, setPath }}>
      {props.children}
    </DegreeContext.Provider>
  );
};

export default DegreeContext;
export { DegreeContextProvider };
