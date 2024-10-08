import { useContext, useState, useEffect, useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
/* import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack'; */
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedback';

import { Icon } from '@iconify/react';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import useStore from '../../../store/zustand/formStore';
// Fetch evaluation and units from store
import InternalApiContext from '../../../store/context/InternalApiContext';

// Fetch evaluation by id from api
// import { updateEvaluationById } from '../../../api/evaluation';
import { handleUserPerformanceEmails } from '../../../api/evaluation';
import { useAuthContext } from '../../../store/context/authContextProvider';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import useHeadingStore from '../../../store/zustand/useHeadingStore.js';
import useEvaluationStore from '../../../store/zustand/evaluationStore.js';
import { fetchAllEvaluations } from '../../../api/evaluation';
// import { sendEmails } from '../../../api/performance';
import { useQuery } from '@tanstack/react-query';


const UserPerformance = () => {
  const { currentUser } = useAuthContext();

  const { data: evaluations, isLoading } = useQuery({
    queryKey: ['evaluations'],
    queryFn: () => fetchAllEvaluations(),
    refetchOnMount: true,  // Refetch data when window regains focus
    staleTime: 0,
  });


  // eslint-disable-next-line no-unused-vars
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [textAreaValue, setTextareaValue] = useState('');
  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const { evaluationId, unitId } = useParams();
  const { evaluation: getEvaluation, setEvaluation } = useEvaluationStore();

  const evaluation = !isLoading && !getEvaluation ? evaluations.find(evaluation => evaluation._id === evaluationId) : getEvaluation

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  // console.log('🚀 ~ UserPerformance ~ evaluation:', evaluation);
  const { allInternalDegrees } = useContext(InternalApiContext);
  const degreeName =
    allInternalDegrees &&
    allInternalDegrees.find((degree) => degree._id === evaluation?.degreeId);
  // console.log('🚀 ~ UserPerformance ~degree name:', degreeName);

  const [selectedValues, setSelectedValues] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  // console.log(
  //   '🚀 ~ UserPerformance ~ selectedAssessmentId:',
  //   selectedAssessmentId
  // );
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  const [openSuccessfulSketchModal, setOpenSuccessfulSketchModal] = useState(false);

  const navigate = useNavigate();
  const [lastLocation, setLastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  // Modal for showing criteria
  const [criteriaModalContent, setCriteriaModalContent] = useState([]);
  const [customerFirstName, setCustomerFirstName] = useState(null);
  const [customerLastName, setCustomerLastName] = useState(null);

  const [selectedRadio, setSelectedRadio] = useState({});
  const [unitObject, setUnitObject] = useState(null)


  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "test";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  useEffect(() => {
    if (!isLoading && evaluation && evaluation.customerId) {
      setCustomerFirstName(`${evaluation?.customerId.firstName}`);
      setCustomerLastName(`${evaluation?.customerId.lastName}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerFirstName, customerLastName, isLoading]);

  useEffect(() => {
    if (!isLoading, evaluation) {
      const foundUnit = evaluation.units.find(unit => unit._id === Number(unitId));
      if (foundUnit) {
        setUnitObject(foundUnit);
        console.log('Unit object found:', foundUnit);
      } else {
        console.log('Unit with ID', unitId, 'not found in the evaluation.units');
      }
    } else {
      console.log('Evaluation object or units array is undefined.');
    }
  }, [evaluation, unitId, evaluations, isLoading]);



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

  useEffect(() => {
    // const isLaptop = window.innerWidth >= 1024;
    const buttonStyle = {
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

  });

  const { openNotificationModal, setOpenNotificationModal } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const handleNotificationSketchModalOpen = () => {
    setOpenSuccessfulSketchModal(true);
  };

  const handleCloseAlertModal = () => {
    setAlertModalOpen(false)
  };

  const handleOpenAlertModal = () => {
    setAlertModalOpen(true);
  };


  // TODO: Change this to edit only a single unit so I have an idea what to do server side
  // smh
  const handleSubmit = async () => {

    const unitToUpdate = evaluation.units.find((unit) => unit._id === Number(unitId))
    let updatedUnit = {
      ...unitToUpdate,
      assessments: unitToUpdate.assessments.map((assessment) => {
        const assessmentRadio = selectedRadio[assessment._id];
        let answer = assessment.answer;
        let answerSupervisor = assessment.answerSupervisor;
        let answerTeacher = assessment.answerTeacher;

        if (assessmentRadio) {

          if (currentUser?.role === 'customer') {
            answer = selectedRadio[assessment._id]?.['Itsearviointi'] ? selectedRadio[assessment._id]?.['Itsearviointi'] : 0;
          } else if (currentUser?.role === 'supervisor') {
            answerSupervisor = selectedRadio[assessment._id]?.['Ohjaajan havainto'] ? selectedRadio[assessment._id]?.['Ohjaajan havainto'] : 0;
          } else if (currentUser?.role === 'teacher') {
            answerTeacher = selectedRadio[assessment._id]?.['Opettajan merkintä'] ? selectedRadio[assessment._id]?.['Opettajan merkintä'] : 0;
          }
        }

        return {
          ...assessment,
          answer,
          answerSupervisor,
          answerTeacher,
        };
      })
    }


    switch (currentUser?.role) {
      case 'customer': {
        const customerReady = selectedValues['valmisLahetettavaksi'];
        updatedUnit = {
          ...updatedUnit,
          customerReady
        };
        break;
      }
      case 'supervisor': {
        const supervisorReady = selectedValues['valmisLahetettavaksi'];
        updatedUnit = {
          ...updatedUnit,
          supervisorReady
        };
        break;
      }
      case 'teacher': {
        const teacherReady = selectedValues['suoritusValmis'];
        updatedUnit = {
          ...updatedUnit,
          teacherReady
        };
        break;
      }
    }

    console.log("UNIT TO UPDATE", unitToUpdate);
    console.log("UPDATED UNIT", updatedUnit)

    const updatedData = {
      updatedUnit,
      selectedValues: selectedValues,
      additionalInfo: textAreaValue,
      evaluationId: evaluationId,
      unitId: unitId,
    };


    try {

      console.log(updatedData);


      const response = await handleUserPerformanceEmails(
        `${evaluationId}`,
        updatedData
      );

      // set response to the store
      setEvaluation(response);
      console.log('Evaluation updated:', response.units);
      setSelectedValues([]);
    } catch (error) {
      console.error('Error updating evaluation:', error);
      handleOpenAlertModal();
    }

    setIsButtonEnabled(true);
    if (selectedValues['suoritusValmis'] || selectedValues['valmisLahetettavaksi']) {
      handleNotificationModalOpen();
    } else {
      handleNotificationSketchModalOpen();
    }
  };

  const getButtonText = () => {
    if (currentUser?.role === 'customer') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja lähetä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja lähetä pyyntö';
      } else {
        return 'Tallenna luonnos';
      }
    } else if (currentUser?.role === 'supervisor') {
      if (selectedValues['valmisLahetettavaksi']) {
        return 'Tallenna ja lähetä';
      } else if (selectedValues['pyydetaanYhteydenottoaOpettajalta']) {
        return 'Tallenna luonnos ja lähetä pyyntö';
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

  useEffect(() => {
    setSiteTitle('Arviointi');
    setSubHeading('Ammattitaitovaatimusten arviointi');
    if (
      currentUser &&
      (currentUser.role === 'teacher' || currentUser.role === 'supervisor')
    ) {
      setHeading(customerFirstName + ' ' + customerLastName);
    } else {
      setHeading(`Tervetuloa, ${customerFirstName}`);
    }
  }, [setSiteTitle, setHeading, setSubHeading, currentUser, customerFirstName, customerLastName]);

  const handleEvaluation = () => {
    navigate(-1);
    setOpenNotificationModal(false);
  };

  const handleRadioChange = useCallback((info, value, assessmentId) => {
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [assessmentId]: {
        ...prevValues[assessmentId],
        [info]: value,
      },
    }));
  }, []);

  const customerOrSupervisorDisabled = unitObject && (currentUser.role === 'customer' && unitObject.customerReady
    || currentUser.role === 'supervisor' && unitObject.supervisorReady);

  const currentUserCustomerOrSupervisor = currentUser.role === 'customer' || currentUser.role === 'supervisor';

  const teacherDisabled = unitObject && (currentUser.role === 'teacher' && unitObject.teacherReady);

  return (
    <div className='perfomance__wrapper'>
      <h2 className='degree-name'>{degreeName?.name.fi}</h2>
      <h4 className='degree-unit-name'> {unitObject?.name.fi}</h4>
      <div>
        <ul>
          {unitObject &&
            unitObject.assessments.map((assess) => (
              <li key={assess._id}>
                <div className='assessments'>
                  <div key={unitObject._id}>
                    <p className='para-title-style'>{assess.name.fi}</p>
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
                    evaluation={evaluation}
                    setEvaluation={setEvaluation}
                    assessment={assess}
                    unit={unitObject}
                    unitId={unitId}
                    selectedRadio={selectedRadio[assess._id] || {}}
                    handleRadioChange={handleRadioChange}
                    selectedUnitId={selectedUnitId}
                    currentUser={currentUser}
                  />
                ) : (
                  <PerformancesFeedback
                    evaluation={evaluation}
                    assessment={assess}
                    unit={unitObject}
                    selectedRadio={selectedRadio[assess._id] || {}}
                    handleRadioChange={handleRadioChange}
                    currentUser={currentUser}
                  />
                )}
              </li>
            ))}
        </ul>
      </div>

      {error && <p>{error}</p>}

      <div className='body' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0 16px', marginTop: '28px' }}>
        <div style={{ fontSize: '20px' }}>
          {currentUser?.role === 'teacher' ? (
            <>
              {!teacherDisabled && <label style={{ fontSize: '16px', display: 'block', marginBottom: '14px' }}>
                <input
                  type='checkbox'
                  name='suoritusValmis'
                  checked={selectedValues['suoritusValmis']}
                  onChange={() =>
                    setSelectedValues({
                      ...selectedValues,
                      suoritusValmis: !selectedValues['suoritusValmis'],
                    })
                  }
                />
                <span> Suoritus valmis </span>
              </label>}

              {!teacherDisabled && <label style={{ fontSize: '16px', display: 'block', marginBottom: '14px' }}>
                <input
                  type='checkbox'
                  name='yhteydenottoAsiakkaalta'
                  checked={selectedValues['pyydetaanYhteydenottoaAsiakkaalta']}
                  onChange={() =>
                    setSelectedValues({
                      ...selectedValues,
                      pyydetaanYhteydenottoaAsiakkaalta:
                        !selectedValues['pyydetaanYhteydenottoaAsiakkaalta'],
                    })
                  }
                />
                <span> Pyydän yhteydenottoa asiakkaalta</span>
              </label>}

              {!teacherDisabled && <label style={{ fontSize: '16px', display: 'block', marginBottom: '14px' }}>
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
                <span> Pyydän yhteydenottoa ohjaajalta </span>
              </label>}
            </>
          ) : (
            <>
              {!customerOrSupervisorDisabled && <label style={{ fontSize: '16px', display: 'block', marginBottom: '14px' }}>
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
                <span> Valmis tarkistettavaksi</span>
              </label>}

              {!customerOrSupervisorDisabled && <label style={{ fontSize: '16px', display: 'block', marginBottom: '14px' }}>
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
                <span> Pyydän yhteydenottoa opettajalta</span>
              </label>}
            </>
          )}
        </div>

        {(selectedValues['suoritusValmis'] || selectedValues['valmisLahetettavaksi']) && <h2
          style={{
            textAlign: 'center',
            fontSize: '18px',
            marginTop: '28px',
            color: h2Color, // Set the color dynamically
          }}
        >
          {currentUser?.role === 'customer' ? 'Lisätietoa' : 'Arvioinnin yhteenveto'}
        </h2>}


        <div className='buttons-and-form'>
          {(selectedValues['suoritusValmis'] || selectedValues['valmisLahetettavaksi']) && <form action='' className='form-wrapper'>
            <textarea
              placeholder={
                currentUser?.role === 'teacher'
                  ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja ohjaajalle tutkinnon-osaan liittyvän viestin.'
                  : currentUser?.role === 'supervisor'
                    ? 'Palautuksen yhteydessä voit jättää asiakkaalle ja opettajalle tutkinnon-osaan liittyvän viestin.'
                    : 'Palautuksen yhteydessä voit jättää opettajalle tutkinnonosaan liittyvän viestin.'
              }
              maxLength={2000}
              rows={8}
              cols={38}
              className='para-title-style'
              value={textAreaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
            />
          </form>}
          <section className='section-buttons'>
            <div className='buttons-wrapper'>
              <PageNavigationButtons handleBack={() => navigate(-1)} />
              {
                ((!customerOrSupervisorDisabled && currentUserCustomerOrSupervisor) || (currentUser.role === 'teacher' && !teacherDisabled))
                &&
                < Button
                  id='submitButton'
                  style={buttonStyle}
                  type='submit'
                  text={getButtonText()}
                  onClick={handleSubmit}
                // disabled={isPalauteSectionDisabled()}
                />
              }
            </div>
          </section>
        </div>
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
        title='Tiedot tallennettu'
        body='Tiedot on tallennettu järjestelmään onnistuneesti.'
        open={openNotificationModal}
        handleClose={handleEvaluation}
      />
      <NotificationModal
        type='success'
        title='Luonnos on tallennettu'
        body='Jos pyysit yhteydenottoa, pyyntö on välitetty ohjaajalle ja/tai opettajalle.'
        open={openSuccessfulSketchModal}
        handleClose={handleEvaluation}
      />
      <NotificationModal
        type='warning'
        title='Lomakkeen lähetys epäonnistui'
        body='Tarkista, että tiedot ovat oikein ja yritä uudelleen.'
        open={alertModalOpen}
        handleClose={handleCloseAlertModal}
      />

    </div>
  );
};

export default UserPerformance;
