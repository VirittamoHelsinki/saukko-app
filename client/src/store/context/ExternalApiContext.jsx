import React, { useEffect, useState, createContext } from 'react';
import useUnitsStore from '../zustand/unitsStore';
import { fetchDegreesFromEperusteet, fetchDegreeByIdFromEperusteet } from '../../api/degree.js';
import { CircularProgress } from '@mui/material';
import { useAuthContext } from './authContextProvider.jsx';

const ExternalApiContext = createContext();

// Purpose of this Provider is to give manage data fetched from external APIs
// Currently used for fetching degrees from ePerusteet.
// Also could be used when fetching comopany data from avoin data.
export const ExternalApiContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState([]);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');

  const [allloading, setallLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const { loggedIn, currentUser } = useAuthContext()


  // Fetch all degrees from ePerusteet
  useEffect(() => {
    const getDegrees = async () => {
      if (!loggedIn || currentUser.role !== "teacher") return;

      try {
        setallLoading(true);
        const response = await fetchDegreesFromEperusteet();
        setAllDegrees(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setallLoading(false)
      }

    };
    getDegrees();
  }, [loggedIn, currentUser]);



  // Fetch degree by id
  useEffect(() => {
    const getDegree = async () => {
      if (!loggedIn || currentUser.role !== "teacher") return;
      try {
        setLoading(true);
        const degreeResponse = await fetchDegreeByIdFromEperusteet(degreeId);
        setDegree(degreeResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false)
      }
    };
    setDegree({});
    getDegree();
  }, [degreeId, currentUser]);

  // Check if degree object is empty  
  const degreeFound = Object.keys(degree).length > 0 ? true : false

  // Clear checked units, assessments, degree data when degreeId changes
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
    setDegree({});
  }, [degreeId]);

  if (allloading || loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <ExternalApiContext.Provider value={{ degree, allDegrees, setDegreeId, degreeFound }}>
      {props.children}
    </ExternalApiContext.Provider>
  );
};

export default ExternalApiContext;












