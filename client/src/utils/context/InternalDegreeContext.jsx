import React, { createContext, useEffect, useState, useContext } from 'react';
import useUnitsStore from '../../store/unitsStore';
import {
  fetchAllInternalDegrees, fetchInternalDegreeById
} from '../../api/degree.js';
import AuthContext from '../../utils/context/AuthContext';

const InternalDegreeContext = createContext();

export const InternalDegreeContextProvider = (props) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setinternalDegreeId] = useState('');

  const { loggedIn } = useContext(AuthContext);

  //fetch all degrees from internal saukko database
  useEffect(() => {
    const getInternalDegrees = async () => {
      try {
        const internalDegrees = await fetchAllInternalDegrees();
        setAllInternalDegrees(internalDegrees)
      } catch (err) {
        console.log(err)
      }
    };
    getInternalDegrees();
  }, [loggedIn]);

  // Fetch degree by id
  useEffect(() => {
    const getInternalDegree = async () => {
      try {
        const degree = await fetchInternalDegreeById(internalDegreeId);
        // Set state
        setInternalDegree(degree);
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
      <InternalDegreeContext.Provider value={{
        internalDegree, allInternalDegrees, setinternalDegreeId, degreeFound, internalDegreeId,
        setAllInternalDegrees
      }}>
        {props.children}
      </InternalDegreeContext.Provider>
    </div>
  );
};

export default InternalDegreeContext;