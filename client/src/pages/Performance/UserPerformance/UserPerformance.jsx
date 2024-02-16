import React, { useContext, useState, useEffect } from 'react';
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

const UserPerformance = ({unit}) => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  let { evaluation } = useContext(InternalApiContext);
  let evaluationId = evaluation._id;
  evaluation = useFetchData(evaluationId);

  const [selectedValues, setSelectedValues] = useState({});
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  // Add a state for error
  const [error, setError] = useState(null);

  const [ answer, setAnswer ] = useState(0);
  const [ answerSupervisor, setAnswerSupervisor ] = useState(0);
  const [ answerTeacher, setAnswerTeacher]=useState(0)

  // Modal for criteria info
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

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
              setAnswer,
              setAnswerSupervisor,
              setAnswerTeacher
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
      console.log('saved data', {answer, answerSupervisor, answerTeacher})
      //console.log('saved data', {answerButton, answerSupervisorButton, answerTeacherButton})
      setSelectedValues([]);
    } catch (error) {
      console.error('Error updating evaluation:', error);
    }
    setIsButtonEnabled(true);
    handleNotificationModalOpen();
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
      <div style={{
            textAlign: 'center',
            fontSize: '16px',
            marginTop: '50%'}}
      >
        <h1>Huolto ja korjaustyöt</h1>
        <h2
          /* style={{
            textAlign: 'center',
            fontSize: '18px',
            textDecoration: 'underline',
            marginTop: '58%',
          }} */
        >
          Ammattitaitovaatimusten arviointi
        </h2>
      </div>
      <div>
        <ul>
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
                  {user&&user?.role === 'teacher' ? (
                  <TeacherPerformanceFeedBack
                    setSelectedValues={setSelectedValues}
                    unit={unit}
                    setSelectedUnitId={setSelectedUnitId}
                  />
                ) : (
                  <PerformancesFeedback
                    setSelectedValues={setSelectedValues}
                    unit={unit}
                    setSelectedUnitId={setSelectedUnitId}
                  />
                )}
                </div>
                ))}
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
        <UserNav></UserNav>
      </div>

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
      />
    </main>
  );
};

export default UserPerformance;
