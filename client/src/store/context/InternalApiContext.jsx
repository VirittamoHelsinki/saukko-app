import { CircularProgress } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

// Internal API calls
import {
  fetchInternalDegrees,
  fetchInternalDegreeById,
} from '../../api/degree.js';
import { fetchAllInternalWorkplaces } from '../../api/workplace.js';
import { fetchAllEvaluations } from '../../api/evaluation.js';

// Internal state variable access.
import useUnitsStore from '../zustand/unitsStore.js';
import { useAuthContext } from './authContextProvider.jsx';

const InternalApiContext = createContext();

// Meant to be used with data coming from internal saukko database.
export const InternalApiContextProvider = (props) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setinternalDegreeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [workplaces, setWorkplaces] = useState([]);
  const [workplace, setWorkplace] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  const { loggedIn, currentUser } = useAuthContext();

  // Runs on each reload of the page and when the user logs in.
  useEffect(() => {
    // Fetch degrees from saukko database
    const getInternalDegrees = async () => {
      if (!loggedIn || currentUser.role !== 'teacher') return;
      try {
        setLoading(true);
        const internalDegrees = await fetchInternalDegrees();
        console.log(internalDegrees);
        setAllInternalDegrees(internalDegrees);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getInternalDegrees();
  }, [loggedIn, currentUser]);

  // Fetch all workplaces from saukko database
  useEffect(() => {
    const getWorkplaces = async () => {
      if (!loggedIn || currentUser.role !== 'teacher') return;
      try {
        setLoading(true);
        const workplaces = await fetchAllInternalWorkplaces();
        setWorkplaces(workplaces);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getWorkplaces();
  }, [loggedIn, currentUser]);

  // Fetch all evaluations
  const setInternalEvaluations = async () => {
    try {
      // Fetch all the Evaluations for the current user
      setEvaluations(await fetchAllEvaluations());
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch single evaluation by id
  const setInternalEvaluation = async (evaluationId) => {
    try {
      if (!evaluations) {
        await setInternalEvaluations()
      }
      setEvaluation(evaluations.find(x => x._id === evaluationId));
    } catch (err) {
      console.log(err);
    } /* finally {
      setLoading(false)
    } */
  };

   // Debug log when evaluation state is updated
   useEffect(() => {
    console.log('InternalApiContext: Evaluation:', evaluation);
  }, [evaluation]);
  
  // Clear evaluation from state at logout
  useEffect(() => {
    if (!loggedIn) {
      setEvaluations(null);
      setEvaluation(null);
    }
  }, [loggedIn]);

  // Fetch degree by id
  useEffect(() => {
    const getInternalDegree = async () => {
      if (!loggedIn || currentUser.role !== 'teacher') return;

      try {
        setLoading(true);
        const degree = await fetchInternalDegreeById(internalDegreeId);
        // Set state
        // console.log(degree);
        setInternalDegree(degree);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setInternalDegree({});
    getInternalDegree();
  }, [currentUser, internalDegreeId, loggedIn]);

  const degreeFound = Object.keys(internalDegree).length > 0 ? true : false;
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
    setInternalDegree({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalDegreeId]);

  if (loading) {
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
          evaluations,
          setInternalEvaluations,
          evaluation,
          setInternalEvaluation,
          setEvaluation,
        }}
      >
        {props.children}
      </InternalApiContext.Provider>
    </div>
  );
};

export default InternalApiContext;
