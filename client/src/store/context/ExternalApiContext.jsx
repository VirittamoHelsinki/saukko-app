import { useEffect, useState, createContext, useContext } from 'react';
import useUnitsStore from '../zustand/unitsStore';
// import { fetchDegreeByIdFromEperusteet } from '../../api/degree.js';
// import { CircularProgress } from '@mui/material';
// import { useAuthContext } from './authContextProvider.jsx';

const ExternalApiContext = createContext(null);

export const useExternalApiContext = () => {
  const ctx = useContext(ExternalApiContext)
  if (!ctx) throw new Error("Use 'useExternalApiContext' only inside a 'ExternalApiContextProvider'")
  return ctx;
}

// Purpose of this Provider is to give manage data fetched from external APIs
// Currently used for fetching degrees from ePerusteet.
// Also could be used when fetching comopany data from avoin data.
export const ExternalApiContextProvider = (props) => {

  // Initialize state
  const [allDegrees, setAllDegrees] = useState(null);
  const [degree, setDegree] = useState({});
  const [degreeId, setDegreeId] = useState('');
  // const [loading, setLoading] = useState(false)

  // const { loggedIn, currentUser } = useAuthContext()

  // // Fetch degree by id
  // useEffect(() => {
  //   const getDegree = async () => {
  //     if (!loggedIn || currentUser.role !== "teacher" | !degreeId) return;
  //     try {
  //       setLoading(true);
  //       const degreeResponse = await fetchDegreeByIdFromEperusteet(degreeId);
  //       setDegree(degreeResponse.data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false)
  //     }
  //   };
  //   setDegree({});
  //   getDegree();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [degreeId, currentUser]);

  // Check if degree object is empty  
  const degreeFound = Object.keys(degree).length > 0 ? true : false

  // Clear checked units, assessments, degree data when degreeId changes
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
    setDegree({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degreeId]);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //       }}
  //     >
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <ExternalApiContext.Provider value={{ degree, allDegrees, setAllDegrees, setDegreeId, degreeFound }}>
      {props.children}
    </ExternalApiContext.Provider>
  );
};

export default ExternalApiContext;












