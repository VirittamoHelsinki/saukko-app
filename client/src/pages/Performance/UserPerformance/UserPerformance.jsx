import { useContext, useState, useEffect, useCallback } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';

import { Icon } from '@iconify/react';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useStore from '../../../store/zustand/formStore';
// Fetch evaluation and units from store
import InternalApiContext from '../../../store/context/InternalApiContext';
import useEvaluationStore from '../../../store/zustand/evaluationStore';

// Fetch evaluation by id from api
// import { updateEvaluationById } from '../../../api/evaluation';
import { handleUserPerformanceEmails } from '../../../api/evaluation';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
// import { sendEmails } from '../../../api/performance';

const UserPerformance = () => {
  // eslint-disable-next-line no-unused-vars
  const { loggedIn, currentUser } = useAuthContext();

  // console.log('🚀 ~ UserPerformance ~ user:', currentUser);
  // eslint-disable-next-line no-unused-vars
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [textAreaValue, setTextareaValue] = useState('');
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const evaluationId = evaluation?._id;
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // console.log('🚀 ~ UserPerformance ~ evaluation:', evaluation);
  const { allInternalDegrees } = useContext(InternalApiContext);
  const degreeName =
    allInternalDegrees &&
    allInternalDegrees.find((degree) => degree._id === evaluation?.degreeId);
  // console.log('🚀 ~ UserPerformance ~degree name:', degreeName);

  const { chosenUnitId } = useEvaluationStore();
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  // console.log(
  //   '🚀 ~ UserPerformance ~ selectedAssessmentId:',
  //   selectedAssessmentId
  // );
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  // Modal for showing criteria
  const [criteriaModalContent, setCriteriaModalContent] = useState([]);
  const [customerFirstName, setCustomerFirstName] = useState(null);
  const [customerLastName, setCustomerLastName] = useState(null);
  useEffect(() => {
    if (evaluation && evaluation.customerId) {
      setCustomerFirstName(`${evaluation?.customerId.firstName}`);
      setCustomerLastName(`${evaluation?.customerId.lastName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFirstName, customerLastName]);

  let unitObject;
  if (evaluation && evaluation.units) {
    // Use find() to search for the unit with matching _id
    unitObject = evaluation.units.find((unit) => unit._id === chosenUnitId);

    if (unitObject) {
      // Unit with matching _id found
      // console.log('Unit object found:', unitObject);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation]);

  // const handleNavigation = (destination) => {
  //   if (hasUnsavedChanges) {
  //     setShowWarningModal(true);
  //     setDestination(destination);
  //   } else {
  //     console.log('Destination before navigation:', destination);
  //     navigate(destination);
  //   }
  //   console.log('Destination before navigation222:', destination);
  //   setLastLocation(destination);

  useEffect(() => {
    console.log('selectedValues: ', selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    const isLaptop = window.innerWidth >= 1024;
    const buttonStyle = {
      marginTop: '35px',
      marginLeft: isLaptop ? '25%' : '20px',
      width: isLaptop ? '42%' : '88%',
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
    // marginTop: '35px',
    // marginLeft: '20px',
    // width: '88%',
    // color: '#0000BF',
    // border: '#0000BF solid',
    // background: 'var(--saukko-main-white)',
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
            if (currentUser?.role === 'customer') {
              answer = selectedValues === 1 ? 1 : 2;
            } else if (currentUser?.role === 'supervisor') {
              answerSupervisor = selectedValues === 1 ? 1 : 2;
            } else if (currentUser?.role === 'teacher') {
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
          feedBack: textAreaValue
        };
      } else {
        return unit;
      }
    });
    // TODO: contactRequests currently for testing
    // TODO: additional info for testing
    const updatedData = {
      units: updatedUnits,
      selectedValues: selectedValues,
      additionalInfo: textAreaValue,
    };

    try {
      const response = await handleUserPerformanceEmails(
        `${evaluationId}`,
        updatedData
      );
      /*      const response = await updateEvaluationById(
        `${evaluationId}`,
        updatedData
      );*/

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
    if (currentUser?.role === 'customer') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja Lähetä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja Lähettä pyyntö';
      } else {
        return 'Tallenna luonnos';
      }
    } else if (currentUser?.role === 'supervisor') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja Lähetä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja Lähettä pyyntö';
      } else {
        return 'Tallenna luonnos';
      }
    } else if (currentUser?.role === 'teacher') {
      if (
        selectedValues['pyydetaanYhteydenottoaAsiakkaalta'] ||
        selectedValues['pyydetaanYhteydenottoaOhjaajalta']
      ) {
        return 'Tallenna ja Lähetä pyynto';
      } else if (selectedValues['suoritusValmis']) {
        return 'Tallenna ja Lähetä';
      } else {
        return 'Tallenna luonnos';
      }
    }
  };

  const isPalauteSectionDisabled = () => {
    if (currentUser?.role === 'teacher') {
      return !selectedValues['suoritusValmis'];
    } else if (currentUser?.role === 'customer') {
      return !selectedValues['valmisLahetettavaksi'];
    } else if (currentUser?.role === 'supervisor') {
      return !selectedValues['valmisLahetettavaksi'];
    }
  };

  const h2Color = isPalauteSectionDisabled() ? 'grey' : 'black';
  // console.log('unitObject', unitObject);

  useEffect(() => {
    setSiteTitle('Arviointi'),
      setSubHeading('Ammaattitaitovaatimusten arviointi');
    if (
      currentUser &&
      (currentUser.role === 'teacher' || currentUser.role === 'supervisor')
    ) {
      setHeading(customerFirstName + ' ' + customerLastName);
    } else {
      setHeading(`Tervetuloa, ${customerFirstName}`);
    }
  });

  return (
    <div>
      <h2 className='degree-name'>{degreeName?.name.fi}</h2>
      <h4 className='degree-unit-name'> {unitObject?.name.fi}</h4>
      <div>
        <ul>
          {/* Evaluation */}
          {unitObject &&
            unitObject.assessments.map((assess) => (
              <li key={assess._id}>
                <div className='assessments'>
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
                {currentUser?.role === 'teacher' ? (
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
                    evaluationId={evaluationId}
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
        {currentUser?.role === 'teacher' ? (
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
            <label> Pyydetään yhteydenottoa asiakkaalta</label>
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
            <label> Pyydetään yhteydenottoa ohjaajalta </label>
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
        {currentUser?.role === 'customer' ? 'Lisätietoa' : 'Palaute'}
      </h2>
      <form action=''>
        <textarea
          placeholder={
            currentUser?.role === 'teacher'
              ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja ohjaajalle tutkinnon-osaan liittyvän viestin.'
              : currentUser?.role === 'supervisor'
              ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja opettajalle tutkinnon-osaan liittyvän viestin.'
              : 'Palautuksen yhteydessä voit jättää opettajalle tutkinnonosaan liittyvän viestin.'
          }
          rows={8}
          cols={38}
          style={{ width: '87%', padding: '5px' }}
          className='para-title-style'
          value={textAreaValue}
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
          // disabled={isPalauteSectionDisabled()}
        />
      </section>

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
        title={
          <Typography sx={{ fontWeight: 'normal', marginRight: '2rem' }}>
            Osaamisen kriteerit
          </Typography>
        }
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
            <DialogContent>
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
                    '& .MuiInputBase-root': {
                      fontSize: '12px',
                      padding: '0',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderStyle: 'none',
                        padding: '0',
                      },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: '12px',
                      paddingBottom: '0',
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
    </div>
  );
};

export default UserPerformance;
