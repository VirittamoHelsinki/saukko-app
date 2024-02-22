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
  let evaluationId = evaluation._id;
  evaluation = useFetchData(evaluationId);

  const [selectedValues, setSelectedValues] = useState({});
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [error, setError] = useState(null);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  
  

  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

  useEffect(() => {
    const buttonStyle = {
      marginTop: '35px',
      marginLeft: '20px',
      width: '88%',
      color: Object.values(selectedValues).some(value => value) ? 'var(--saukko-main-white)' : '#0000BF',
      border: Object.values(selectedValues).some(value => value) ? '#0000BF' : '#0000BF solid',
      background: Object.values(selectedValues).some(value => value) ? '#0000BF' : 'var(--saukko-main-white)',
    };
    setButtonStyle(buttonStyle);
  }, [selectedValues]);

  const [buttonStyle, setButtonStyle] = useState({
    marginTop: '35px',
    marginLeft: '20px',
    width: '88%',
    color: '#0000BF',
    border: '#0000BF solid',
    background: 'var(--saukko-main-white)',
  });

  const { openNotificationModal, setOpenNotificationModal } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const handleSubmit = async () => {
    const updatedUnits = evaluation.map((unit) => {
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
  };

  const getButtonText = () => {
    if (user?.role === 'customer') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja Lähettä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja Lähettä pyynto';
      } else {
        return 'Tallenna luonnos';
      }
    } else if (user?.role === 'supervisor') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja Lähettä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja Lähettä pyynto';
      } else {
        return 'Tallenna luonnos';
      }
    } else if (user?.role === 'teacher') {
      if (
        selectedValues['pyydetaanYhteydenottoaAsiakkaalta'] ||
        selectedValues['pyydetaanYhteydenottoaOhjaajalta']
      ) {
        return 'Tallenna ja Lähettä pyynto';
      } 
      else if (selectedValues['suoritusValmis']) {
        return 'Tallenna ja Lähettä';
      } else {
        return 'Tallenna luonnos';
      }
    }
  };

  const isPalauteSectionDisabled = () => {
    if (user?.role === 'teacher') {
      return !selectedValues['suoritusValmis'];
    } else if (user?.role === 'customer') {
      return !selectedValues['valmisLahetettavaksi'];
    } else if (user?.role === 'supervisor') {
      return !selectedValues['valmisLahetettavaksi'];
    }
  };

  const h2Color = isPalauteSectionDisabled() ? 'grey' : 'black';

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
              {user?.role === 'teacher' ? (
                <TeacherPerformanceFeedBack
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  unit={unit}
                  setSelectedUnitId={setSelectedUnitId}
                  selectedUnitId={selectedUnitId}
                /> 
              ) : (
                <PerformancesFeedback
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  unit={unit}
                  setSelectedUnitId={setSelectedUnitId}
                  selectedUnitId={selectedUnitId}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
      
      {error && <p>{error}</p>}

      <div style={{fontSize: '20px', marginTop: '40px', marginLeft: '18px'}}>
        {user?.role === 'teacher' ? (
          <>
            <input type="checkbox" name="suoritusValmis" onChange={() => setSelectedValues({ ...selectedValues, 'suoritusValmis': !selectedValues['suoritusValmis'] })} />
            <label > Suoritus Valmis </label>
            <br />
            <input type="checkbox" name="yhteydenottoAsiakkaalta" onChange={() => setSelectedValues({ ...selectedValues, 'pyydetaanYhteydenottoaAsiakkaalta': !selectedValues['pyydetaanYhteydenottoaAsiakkaalta'] })} />
            <label> Pyydään yhteydenottoa asiakkaalta</label>
            <br />
            <input type="checkbox" name="yhteydenottoOhjaajalta" onChange={() => setSelectedValues({ ...selectedValues, 'pyydetaanYhteydenottoaOhjaajalta': !selectedValues['pyydetaanYhteydenottoaOhjaajalta'] })} />
            <label> Pyydään yhteydenottoa ohjaajalta </label>
          </>
        ) : (
          <>
            <input type="checkbox" name="valmisLahetettavaksi" onChange={() => setSelectedValues({ ...selectedValues, 'valmisLahetettavaksi': !selectedValues['valmisLahetettavaksi'] })} />
            <label > Valmis lähetettäväksi </label>
            <br />
            <input type="checkbox" name="pyydetaanYhteydenottoaOpettajalta" onChange={() => setSelectedValues({ ...selectedValues, 'pyydetaanYhteydenottoaOpettajalta': !selectedValues['pyydetaanYhteydenottoaOpettajalta'] })} />
            <label> Pyydään yhteydenottoa opettajalta</label>
          </>
        )}
      </div>

      <h2
      style={{
        textAlign: 'center',
        fontSize: '18px',
        textDecoration: 'underline',
        marginTop: '40px',
        color: h2Color, // Set the color dynamically
      }}
    >
      {user?.role === 'customer' ? 'Lisätietoa' : 'Palaute'}
    </h2>
      <form action=''>
       
      <textarea 
  placeholder={
    user?.role === 'teacher'
      ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja ohjaajalle tutkinnon-osaan liittyvän viestin.'
      : user?.role === 'supervisor'
      ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja opettajalle tutkinnon-osaan liittyvän viestin.'
      : 'Palautuksen yhteydessä voit jättää opettajalle tutkinnonosaan liittyvän viestin.'
  }
  rows={8}
  cols={38}
  style={{ width: '87%', padding: '5px' }}
  className='para-title-style'
  value={textareaValue}
  onChange={(e) => setTextareaValue(e.target.value)}
  disabled={isPalauteSectionDisabled()}
/>

      </form>

      <section>
        <Button
          style={buttonStyle}
          type='submit'
          text={getButtonText()}
          onClick={handleSubmit}
          disabled={isPalauteSectionDisabled()}
        />
      </section>
      <div style={{ marginBottom: '90px' }}>
        <UserNav></UserNav>
      </div>

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