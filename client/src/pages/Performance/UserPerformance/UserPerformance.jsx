import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';
import useStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';
import { Icon } from '@iconify/react';
import CriteriaModal from '../../../components/RequirementsAndCriteriaModal/CriteriaModal';
import InternalApiContext from '../../../store/context/InternalApiContext';

// Fetch evaluation and units from store
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import useUnitsStore from '../../../store/zustand/unitsStore';

// Fetch evaluation by id from api
import {
  fetchEvaluationById,
  updateEvaluationById,
} from '../../../api/evaluation';

const useFetchData = (evaluationId) => {
  const [evaluation, setEvaluation] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEvaluationById(`${evaluationId}`);
      setEvaluation(response.units);
    };
    fetchData();
  }, [evaluationId]);
  return evaluation;
};

const UserPerformance = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  let { evaluation } = useContext(InternalApiContext);
  // console.log("🚀 ~ UserPerformance ~ evaluation:", evaluation)
  let evaluationId = evaluation._id;
  // console.log("🚀 ~ UserPerformance ~ evaluationId:", evaluationId)
  evaluation = useFetchData(evaluationId);

  const [selectedValues, setSelectedValues] = useState({});
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  // Add a state for error
  const [error, setError] = useState(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  console.log('🚀 ~ UserPerformance ~ hasUnsavedChanges:', hasUnsavedChanges);
  const navigate = useNavigate();
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [destination, setDestination] = useState(null);

  // Warning modal if user exit without saving
  const [showWarningModal, setShowWarningModal] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowWarningModal(false);
    setLastLocation(null);
  }, []);

  const confirmNavigation = useCallback(() => {
    setShowWarningModal(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate(lastLocation.location?.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
  }, [confirmedNavigation, lastLocation]);

  const handleNavigation = (destination) => {
    if (hasUnsavedChanges) {
      setShowWarningModal(true);
      setDestination(destination);
    } else {
      console.log('Destination before navigation:', destination);
      navigate(destination);
    }
    console.log('Destination before navigation222:', destination);
    setLastLocation(destination);

    console.log('Destination after navigation:', destination);
  };

  // Modal for criteria info
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

  // Mock data
  // const mockdata = [
  //   {
  //     title: 'Opiskelija toimii tieto- ja viestintätekniikan työtehtävissä',
  //   },
  //   {
  //     title:
  //       'Opiskelija tekee tiedonhakua ja ratkaisee tieto- ja viestintätekniikan ongelmia',
  //   },
  //   {
  //     title: 'Opiskelija käyttää tietoteknistä ympäristöä',
  //   },
  // ];

  // Evaluation data

  const buttonStyle = {
    color: 'var(--saukko-main-white)',
    border: 'var(--saukko-main-black)',
    background: '#0000BF',
    marginTop: '35px',
    marginLeft: '20px',
    width: '88%',
  };

  const { openNotificationModal, setOpenNotificationModal } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const handleNotificationModalClose = useCallback(() => {
    // Navigate to 'unit-list' route
    if (user?.role === 'customer') {
      navigate('/unit-list');
    } else {
      navigate('/customer-list');
    }

    // Reload the page
    window.location.reload();
  }, [navigate]);

  // Update evaluation
  const handleSubmit = async () => {
    const updatedUnits = evaluation.map((unit) => {
      // Check if the current unit is the one selected
      if (unit._id === selectedUnitId) {
        return {
          ...unit,
          assessments: unit.assessments.map((assessment) => {
            let answer = assessment.answer;
            let answerSupervisor = assessment.answerSupervisor;
            let answerTeacher = assessment.answerTeacher;
            if (user?.role === 'customer') {
              answer = selectedValues === 1 ? 1 : 2;
            } else if (user?.role === 'supervisor') {
              answerSupervisor = selectedValues === 1 ? 1 : 2;
            } else if (user?.role === 'teacher') {
              answerTeacher = selectedValues === 1 ? 1 : 2;
            }
            return {
              ...assessment,
              answer,
              answerSupervisor,
              answerTeacher,
            };
          }),
        };
      } else {
        // If the current unit is not the one selected, return it as is
        return unit;
      }
    });
    const updatedData = {
      units: updatedUnits,
    };
    try {
      const response = await updateEvaluationById(
        `${evaluationId}`,
        updatedData
      );

      console.log('Evaluation updated:', response.units);
      setSelectedValues([]);
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
    setIsButtonEnabled(true);
    handleNotificationModalOpen();
    // Perform other submission logic here
  };

  // Check if all assessments have been filled
  const checkAssessments = () => {
    if (!Array.isArray(evaluation)) {
      return false;
    }

    if (user.role === 'customer') {
      for (let unit of evaluation) {
        for (let assess of unit.assessments) {
          if (assess.answer === 0) {
            return false;
          }
        }
      }
      return true;
    } else if (user.role === 'supervisor') {
      for (let unit of evaluation) {
        for (let assess of unit.assessments) {
          if (assess.answerSupervisor === 0) {
            return false;
          }
        }
      }
      return true;
    } else if (user.role === 'teacher') {
      for (let unit of evaluation) {
        for (let assess of unit.assessments) {
          if (assess.answerTeacher === 0) {
            return false;
          }
        }
      }
      return true;
    }
  };

  return (
    <main>
      <div>
        <WavesHeader
          title='Saukko'
          secondTitle={`Tervetuloa, ${user?.firstName}`}
        />
      </div>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          textDecoration: 'underline',
          marginTop: '58%',
        }}
      >
        Ammattitaitovaatimukset
      </h2>

      <div>
        <ul>
          {/* Mock data */}
          {/* {mockdata.map((data, index) => (
            <li key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 15px 0 0',
                }}
              >
                <div>
                  <p className='para-title-style'>{data.title} </p>
                </div>
                <div>
                  <Icon
                    icon='material-symbols:info'
                    color='#1769aa'
                    style={{ verticalAlign: 'middle', fontSize: '21px' }}
                    cursor={'pointer'}
                    onClick={handleOpenCriteriaModal}
                  />
                </div>
              </div>
              {user?.role === 'teacher' ? (
                <TeacherPerformanceFeedBack />
              ) : (
                <PerformancesFeedback />
              )}
            </li>
          ))} */}

          {/* Evaluation */}
          {evaluation.map((unit, index) => (
            <li key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 15px 0 0',
                }}
              >
                <div>
                  <p className='para-title-style'>{unit.name.fi} </p>
                </div>
                <div>
                  <Icon
                    icon='material-symbols:info'
                    color='#1769aa'
                    style={{ verticalAlign: 'middle', fontSize: '21px' }}
                    cursor={'pointer'}
                    onClick={handleOpenCriteriaModal}
                  />
                </div>
              </div>
              {unit.assessments.map((assess, index) => (
                <div key={index}>
                  <p>Assessment: {assess.name.fi}</p>
                  <p>Student: {assess.answer}</p>
                  <p>Supervisor: {assess.answerSupervisor}</p>
                  <p>Teacher: {assess.answerTeacher}</p>
                </div>
              ))}

              {user?.role === 'teacher' ? (
                <TeacherPerformanceFeedBack
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  unit={unit}
                  setSelectedUnitId={setSelectedUnitId}
                  selectedUnitId={selectedUnitId}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              ) : (
                <PerformancesFeedback
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  unit={unit}
                  setSelectedUnitId={setSelectedUnitId}
                  selectedUnitId={selectedUnitId}
                  hasUnsavedChanges={hasUnsavedChanges}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      {error && <p>{error}</p>}
      <h2
        style={{
          textAlign: 'center',
          fontSize: '18px',
          textDecoration: 'underline',
          marginTop: '40px',
        }}
      >
        {' '}
      </h2>
      <form action=''>
        <p className='para-title-style'>
          {user?.role === 'customer' ? 'Lisätietoa' : 'Palaute'}
        </p>
        <textarea
          rows={8}
          cols={38}
          style={{ width: '87%', padding: '5px' }}
          className='para-title-style'
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </form>

      <section>
        <Button
          style={buttonStyle}
          type='submit'
          text={checkAssessments() ? 'Lähetä' : 'Talenna luonnos'}
          onClick={handleSubmit}
        />
      </section>
      <div style={{ marginBottom: '90px' }}>
        <UserNav
          checkUnsavedChanges={
            hasUnsavedChanges ? () => setHasUnsavedChanges(true) : null
          }
          handleNavigation={handleNavigation}
          destination={destination}
        ></UserNav>
      </div>

      {/* Warning notification modal */}
      <NotificationModal
        type='alert'
        title='Varoitus: Lomakkeen tiedot menetetään'
        body='Oletko varma, että haluat poistua sivulta?'
        open={showWarningModal}
        handleClose={cancelNavigation}
        handleConfirm={confirmNavigation}
      />

      {/* Modal for showing criteria */}
      <CriteriaModal
        open={isCriteriaModalOpen}
        handleClose={handleCloseCriteriaModal}
      />
      <NotificationModal
        type='success'
        title='Lähetetty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        handleClose={handleNotificationModalClose}
      />
    </main>
  );
};

export default UserPerformance;
