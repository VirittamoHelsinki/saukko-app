import React, { createContext, useEffect, useState } from 'react';
import useUnitsStore from '../../unitsStore';
import { fetchAll, fetchById } from '../../api/degree.js';

const InternalDegreeContext = createContext();

export const InternalDegreeContextProvider = (props) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setinternalDegreeId] = useState('');

  //fetch all degrees from internal saukko database
  useEffect(() => {
    const getInternalDegrees = async () => {
      try {
        const internalDegreesRes = await fetchAll();
        setAllInternalDegrees(internalDegreesRes.data)
      } catch (err) {
        console.log(err)
      }
    };
    getInternalDegrees();
  }, []);

  // Fetch degree by id
  useEffect(() => {
    const getInternalDegree = async () => {
      try {
        const degreeResponse = await fetchById(internalDegreeId);
        // Set state
        setInternalDegree(degreeResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    setInternalDegree({});
    getInternalDegree();
  }, [internalDegreeId]);

  const degreeFound = Object.keys(internalDegree).length > 0 ? true : false;
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits)

  return (
    <div>
      <InternalDegreeContext.Provider value={{ internalDegree, allInternalDegrees, setinternalDegreeId, degreeFound, internalDegreeId }}>
        {props.children}
      </InternalDegreeContext.Provider>
    </div>
  );
};

export default InternalDegreeContext;