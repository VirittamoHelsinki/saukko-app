import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';

const DegreeContext = createContext();

const DegreeContextProvider = (props) => {

  // Initialize state
  const [degreeData, setDegreeData] = useState([]);
  
  // Fetch degree data from server
  const getDegrees = async () => {
    try {
      const degreesResponse = await axios.get(
        'http://localhost:5000/api/degrees'
      );
      // Set state
      setDegreeData(degreesResponse.data);
      console.log('DegreeContext', degreeData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDegrees();
  }, []);

  return (
    <DegreeContext.Provider value={{ degreeData }}>
      {props.children}
    </DegreeContext.Provider>
  );
};

export default DegreeContext;
export { DegreeContextProvider };
