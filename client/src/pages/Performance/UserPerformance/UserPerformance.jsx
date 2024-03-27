import React, { useContext, useState, useEffect, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router';

import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';

import { Icon } from '@iconify/react';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';
// Fetch evaluation and units from store
import InternalApiContext from '../../../store/context/InternalApiContext';
import useEvaluationStore from '../../../store/zustand/evaluationStore';

// Fetch evaluation by id from api
import { updateEvaluationById } from '../../../api/evaluation';

const UserPerformance = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const evaluationId = evaluation?._id;
  console.log('🚀 ~ UserPerformance ~ evaluation:', evaluation);
  const { chosenUnitId } = useEvaluationStore();
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  console.log(
    '🚀 ~ UserPerformance ~ selectedAssessmentId:',
    selectedAssessmentId
  );
  const [error, setError] = useState(null);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const [destination, setDestination] = useState(null);
  // Modal for showing criteria
  const [criteriaModalContent, setCriteriaModalContent] = useState([]);

  let unitObject;
  if (evaluation && evaluation.units) {
    // Use find() to search for the unit with matching _id
    unitObject = evaluation.units.find((unit) => unit._id === chosenUnitId);

    if (unitObject) {
      // Unit with matching _id found
      console.log('Unit object found:', unitObject);
    } else {
      // Unit with matching _id not found
      console.log(
        'Unit with ID',
        chosenUnitId,
        'not found in the evaluation.units'
      );
    }
  } else {
    // Handle cases where evaluation or evaluation.units is undefined
    console.log('Evaluation object or units array is undefined.');
  }

  const handleOpenCriteriaModal = (criteria) => {
    setCriteriaModalContent(criteria);
    setIsCriteriaModalOpen(criteria.length >= 0 || isCriteriaModalOpen);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

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

  useEffect(() => {
    const buttonStyle = {
      marginTop: '35px',
      marginLeft: '20px',
      width: '88%',
      color: Object.values(selectedValues).some((value) => value)
        ? 'var(--saukko-main-white)'
        : '#0000BF',
      border: Object.values(selectedValues).some((value) => value)
        ? '#0000BF'
        : '#0000BF solid',
      background: Object.values(selectedValues).some((value) => value)
        ? '#0000BF'
        : 'var(--saukko-main-white)',
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

  // const handleNotificationModalClose = useCallback(() => {
  //   // Navigate to 'unit-list' route
  //   if (user?.role === 'customer') {
  //     navigate('/unit-list');
  //   } else {
  //     navigate('/customer-list');
  //   }
  //   // Reload the page
  //   // window.location.reload();
  // }, [navigate]);

  const handleSubmit = async () => {
    const updatedUnits = evaluation.units.map((unit) => {
      if (unit._id === selectedUnitId) {
        const updatedAssessments = unit.assessments.map((assessment) => {
          if (assessment._id === selectedAssessmentId) {
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
          } else {
            return assessment;
          }
        });
        return {
          ...unit,
          assessments: updatedAssessments,
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

      // set response to the store
      setEvaluation(response);
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
      } else if (selectedValues['suoritusValmis']) {
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
  console.log('unitObject', unitObject);

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
        {unitObject.name.fi}
        <br />
        Ammattitaitovaatimusten arviointi
      </h2>
      <div>
        <ul>
          {/* Evaluation */}
          {unitObject &&
            unitObject.assessments.map((assess) => (
              <li key={assess._id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '0 15px 0 0',
                  }}
                >
                  <div key={unitObject._id}>
                    <p className='para-title-style'>{assess.name.fi}</p>
                    {/* <p>{assess.answer}</p>
                    <p>{assess.answerSupervisor}</p>
                    <p>{assess.answerTeacher}</p> */}
                  </div>
                  <div>
                    <Icon
                      icon='material-symbols:info'
                      color='#1769aa'
                      style={{ verticalAlign: 'middle', fontSize: '21px' }}
                      cursor={'pointer'}
                      onClick={() => handleOpenCriteriaModal(assess.criteria)}
                    />
                  </div>
                </div>
                {user?.role === 'teacher' ? (
                  <TeacherPerformanceFeedBack
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    unit={unitObject}
                    setSelectedUnitId={setSelectedUnitId}
                    assessment={assess}
                    selectedUnitId={selectedUnitId}
                    setSelectedAssessmentId={setSelectedAssessmentId}
                    selectedAssessmentId={selectedAssessmentId}
                    hasUnsavedChanges={hasUnsavedChanges}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                  />
                ) : (
                  <PerformancesFeedback
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    unit={unitObject}
                    setSelectedUnitId={setSelectedUnitId}
                    assessment={assess}
                    selectedUnitId={selectedUnitId}
                    setSelectedAssessmentId={setSelectedAssessmentId}
                    selectedAssessmentId={selectedAssessmentId}
                    hasUnsavedChanges={hasUnsavedChanges}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>

      {error && <p>{error}</p>}

      <div style={{ fontSize: '20px', marginTop: '40px', marginLeft: '18px' }}>
        {user?.role === 'teacher' ? (
          <>
            <input
              type='checkbox'
              name='suoritusValmis'
              onChange={() =>
                setSelectedValues({
                  ...selectedValues,
                  suoritusValmis: !selectedValues['suoritusValmis'],
                })
              }
            />
            <label> Suoritus Valmis </label>
            <br />
            <input
              type='checkbox'
              name='yhteydenottoAsiakkaalta'
              onChange={() =>
                setSelectedValues({
                  ...selectedValues,
                  pyydetaanYhteydenottoaAsiakkaalta:
                    !selectedValues['pyydetaanYhteydenottoaAsiakkaalta'],
                })
              }
            />
            <label> Pyydään yhteydenottoa asiakkaalta</label>
            <br />
            <input
              type='checkbox'
              name='yhteydenottoOhjaajalta'
              onChange={() =>
                setSelectedValues({
                  ...selectedValues,
                  pyydetaanYhteydenottoaOhjaajalta:
                    !selectedValues['pyydetaanYhteydenottoaOhjaajalta'],
                })
              }
            />
            <label> Pyydään yhteydenottoa ohjaajalta </label>
          </>
        ) : (
          <>
            <input
              type='checkbox'
              name='valmisLahetettavaksi'
              onChange={() =>
                setSelectedValues({
                  ...selectedValues,
                  valmisLahetettavaksi: !selectedValues['valmisLahetettavaksi'],
                })
              }
            />
            <label> Valmis lähetettäväksi </label>
            <br />
            <input
              type='checkbox'
              name='pyydetaanYhteydenottoaOpettajalta'
              onChange={() =>
                setSelectedValues({
                  ...selectedValues,
                  pyydetaanYhteydenottoaOpettajalta:
                    !selectedValues['pyydetaanYhteydenottoaOpettajalta'],
                })
              }
            />
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
          id='submitButton'
          style={buttonStyle}
          type='submit'
          text={getButtonText()}
          onClick={handleSubmit}
          disabled={isPalauteSectionDisabled()}
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
      <NotificationModal
        type='info'
        title='Osaamisen kriteerit'
        style={{ width: '130%' }}
        body={
          <>
            <IconButton
              aria-label='close'
              onClick={handleCloseCriteriaModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'black',
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent sx={{ minWidth: '75vw' }}>
              {criteriaModalContent.map((crit, index) => (
                <TextField
                  key={index}
                  value={crit && crit.fi ? crit.fi : 'No criteria found'}
                  id='outlined-multiline-static'
                  fontSize='12px'
                  rows={8}
                  // cols={25}
                  multiline
                  fullWidth
                  InputProps={{
                    readOnly: true, // Make the TextField read-only
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderStyle: 'none',
                      },
                    },
                  }}
                ></TextField>
              ))}
            </DialogContent>
          </>
        }
        open={isCriteriaModalOpen}
        handleClose={handleCloseCriteriaModal}
      />

      <NotificationModal
        type='success'
        title='Lähetetty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        // handleClose={handleNotificationModalClose}
      />
    </main>
  );
};

export default UserPerformance;
