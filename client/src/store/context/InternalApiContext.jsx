import { CircularProgress } from '@mui/material';
import React, { createContext, useEffect, useState, useContext } from 'react';

// Internal API calls
import {
  fetchInternalDegrees,
  fetchInternalDegreeById,
} from '../../api/degree.js';
import { fetchAllInternalWorkplaces } from '../../api/workplace.js';
import { fetchAllEvaluations, fetchEvaluationById } from '../../api/evaluation.js';

// Internal state variable access.
import useUnitsStore from '../zustand/unitsStore.js';
import AuthContext from './AuthContext';

const InternalApiContext = createContext();

// Meant to be used with data coming from internal saukko database.
export const InternalApiContextProvider = (props) => {
  const [allInternalDegrees, setAllInternalDegrees] = useState([]);
  const [internalDegree, setInternalDegree] = useState({});
  const [internalDegreeId, setinternalDegreeId] = useState('');
  const [loading, setLoading] = useState(false)
  const [workplaces, setWorkplaces] = useState([]);
  const [workplace, setWorkplace] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  const { loggedIn, role, user } = useContext(AuthContext);

  // Runs on each reload of the page and when the user logs in.
  useEffect(() => {
    // Fetch degrees from saukko database
    const getInternalDegrees = async () => {
      if (!loggedIn || role !== "teacher") return;
      try {
        setLoading(true);
        const internalDegrees = await fetchInternalDegrees();
        console.log(internalDegrees)
        setAllInternalDegrees(internalDegrees);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    getInternalDegrees();
  }, [loggedIn, role])




  // Fetch all workplaces from saukko database
  useEffect(() => {
    const getWorkplaces = async () => {
      if (!loggedIn || role !== "teacher") return;
      try {
        setLoading(true)
        const workplaces = await fetchAllInternalWorkplaces();
        setWorkplaces(workplaces);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    getWorkplaces();
  }

    , [loggedIn, role]);

  // Fetch all evaluations
  const setInternalEvaluations = async () => {
    try {
      const allEvaluations = await fetchAllEvaluations();

      // Find evaluations belonging to current user & set to state
      if (role === 'teacher') {
        const matchingEvaluations = allEvaluations.filter(evaluation => evaluation.teacherId._id === user.id)
        setEvaluations(matchingEvaluations)
      } else if (role === 'supervisor') {
        const matchingEvaluations = allEvaluations.filter(evaluation => 
          evaluation.supervisorIds.some(supervisor => supervisor._id === user.id)
        )
        console.log("🚀 ~ setInternalEvaluations ~ matchingEvaluations:", matchingEvaluations)
        setEvaluations(matchingEvaluations)
      } else if (role === 'customer') {
        const matchingEvaluation = allEvaluations.filter(evaluation => evaluation.customerId._id === user.id)
        setEvaluations(matchingEvaluation)
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch single evaluation by id
  const setInternalEvaluation = async (evaluationId) => {
    try {
      /* setLoading(true) */ // When logging in as customer this gives an infinite loop??
      const evaluation = await fetchEvaluationById(evaluationId)
      setEvaluation(evaluation)
    } catch (err) {
      console.log(err)
    } /* finally {
      setLoading(false)
    } */
  };

  // Clear evaluation from state at logout
  useEffect(() => {
    if (!loggedIn) {
      setEvaluations(null)
      setEvaluation(null);
    }
  }, [loggedIn]);

  // Fetch degree by id
  useEffect(() => {
    const getInternalDegree = async () => {
      if (!loggedIn || role !== "teacher") return;

      try {
        setLoading(true)
        const degree = await fetchInternalDegreeById(internalDegreeId);
        // Set state
        console.log(degree)
        setInternalDegree(degree);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false)
      }
    };

    setInternalDegree({});
    getInternalDegree();
  }, [internalDegreeId]);

  const degreeFound = Object.keys(internalDegree).length > 0 ? true : false;
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  useEffect(() => {
    clearCheckedUnits();
    setInternalDegree({});
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