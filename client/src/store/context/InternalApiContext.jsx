import React, { createContext, useEffect, useState, useContext } from 'react';

// Internal API calls
import {
  fetchInternalDegrees,
  fetchInternalDegreeById,
} from '../../api/degree.js';
import { fetchAllInternalWorkplaces } from '../../api/workplace.js';

// Internal state variable access.
import useUnitsStore from '../zustand/unitsStore.js';
import AuthContext from './AuthContext';

const InternalApiContext = createContext();

// Meant to be used with data coming from internal saukko database.
export const InternalApiContextProvider = (props) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setinternalDegreeId] = useState('');

  const [workplaces, setWorkplaces] = useState([]);
  const [workplace, setWorkplace] = useState({});

  const { loggedIn, role } = useContext(AuthContext);

  // Runs on each reload of the page and when the user logs in.
  useEffect(() => {
    // Fetch degrees from saukko database
    const getInternalDegrees = async () => {
      if(!loggedIn || role !== "teacher") return;
      try {
        const internalDegrees = await fetchInternalDegrees();
        setAllInternalDegrees(internalDegrees);
      } catch (err) {
        console.log(err);
      }
    };
    getInternalDegrees();

    // Fetch all workplaces from saukko database
    const getWorkplaces = async () => {
      if(!loggedIn || role !== "teacher") return;
      try {
        const workplaces = await fetchAllInternalWorkplaces();
        setWorkplaces(workplaces);
      } catch (err) {
        console.log(err);
      }
    };
    getWorkplaces();
  }, [loggedIn, role]);

  // Fetch degree by id
  useEffect(() => {
    const getInternalDegree = async () => {
      if (!loggedIn || role !== "teacher") return;

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
  }, [internalDegreeId,loggedIn, role]);

  const degreeFound = Object.keys(internalDegree).length > 0 ? true : false;
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  return (
    <div>
      <InternalApiContext.Provider
        value={{
          internalDegree,
          allInternalDegrees,
          setinternalDegreeId,
          degreeFound,
          internalDegreeId,
          setAllInternalDegrees,
          workplaces,
          setWorkplaces,
          workplace,
          setWorkplace,
        }}
      >
        {props.children}
      </InternalApiContext.Provider>
    </div>
  );
};

export default InternalApiContext;