// Import React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Import components
// import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
// import UserNav from '../../../components/UserNav/UserNav';

import { Icon } from '@iconify/react';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';

// Import state management
/* import InternalApiContext from '../../../store/context/InternalApiContext'; */
import { useAuthContext } from '../../../store/context/authContextProvider';
import useHeadingStore from '../../../store/zustand/useHeadingStore.js';
import { fetchAllEvaluations } from '../../../api/evaluation.js';
import useEvaluationStore from '../../../store/zustand/evaluationStore.js';


// Import MUI
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomerList() {
  const navigate = useNavigate();
  /* const { evaluations, refetchEvaluations } = useEvaluations(); */

  const [alertModalOpen, setAlertModalOpen] = useState(false)

  const { data: evaluations } = useQuery({
    queryKey: ['evaluations'],
    queryFn: () => fetchAllEvaluations(),
    onError: () => {
      handleOpenAlertModal();
    },
  });

  // Data from store management
  const { currentUser } = useAuthContext();
  const { setHeading, setSiteTitle } = useHeadingStore();
  const { resetEvaluation } = useEvaluationStore();

  /*   const { evaluations, setInternalEvaluations, setInternalEvaluation } = */
  /*   useContext(InternalApiContext); */

  useEffect(() => {
    resetEvaluation();
  }, [resetEvaluation])

  const [isInfoButtonOpen, setIsInfoButtonOpen] = useState(false);

  const handleOpenInfoButton = () => {
    setIsInfoButtonOpen(true);
  };

  const handleCloseInfoButton = () => {
    setIsInfoButtonOpen(false);
  };

  const handleCloseAlertModal = () => {
    setAlertModalOpen(false)
  };

  const handleOpenAlertModal = () => {
    setAlertModalOpen(true);
  };

  // Titles color for info button
  const titles = ['Valmis', 'Käsittelyssä', 'Aloitettu', 'Aloittamatta', 'Arviointi Puuttuu'];

  const getTitleColor = (title) => {
    switch (title) {
      case 'Valmis':
        return '#B0EDD4';
      case 'Käsittelyssä':
        return '#FFE28C';
      case 'Aloitettu':
        return '#B7D9F7';
      case 'Aloittamatta':
        return '#E2E2E2';
      case 'ArvioPuuttuu':
        return '#FFAAAA';
      default:
        return '#FFFFFF'; // Default color if title is not recognized
    }
  };

  // useEffect(() => {
  //   resetEvaluation();
  // }, [])

  // Set evaluations
  useEffect(() => {
    setHeading(`Tervetuloa ${currentUser?.firstName}`)
    setSiteTitle("Etusivu")
  }, [setHeading, setSiteTitle, currentUser]);



  // Find evaluations in progress
  const inProgress =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation.completed === false &&
        evaluation.units.some((unit) => unit.status === 1)
    );
  // Find evaluations waitin for processing
  const waitForProcessing =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation && evaluation.units.some((unit) => unit.status === 2)
    );

  console.log('waitForProcessing:', waitForProcessing)

  // Find evaluations waitin for processing
  const waitForProcessingNotEvaluated =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation && evaluation.units.some((unit) => unit.status === 4)
    );

  console.log('not evaluated', waitForProcessingNotEvaluated)

  // Find not started evaluations
  const notStarted =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation.completed === false &&
        evaluation.units.every((unit) => unit.status === 0)
    );

  // Find completed evaluations
  const completed =
    evaluations &&
    evaluations.filter((evaluation) => evaluation.completed === true);

  console.log('completed:', completed)

  const handleChooseEvaluation = (customer) => {
    navigate(`/unit-list/${customer._id}`);
  };

  return (
    <div className='customerList__wrapper'>
      {/* Notifications */}
      <div className='customerList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge />
      </div>

      <div className='customerList__container'>
        <h3>
          Asiakkaiden suoritukset{' '}
          <span>
            <Icon
              icon='material-symbols:info'
              color='#0288D1'
              style={{ verticalAlign: 'text-bottom', fontSize: '21px' }}
              cursor={'pointer'}
              onClick={() => handleOpenInfoButton()}
            />
          </span>
        </h3>

        <div className='customerList__accordion'>
          {
            inProgress && inProgress.map((evaluation) => evaluation.customerId && (
              <div
                key={`in-progress-${evaluation._id}`}
                className='customerList__element in-progress'
              >
                <p onClick={() => handleChooseEvaluation(evaluation.customerId)}>
                  {evaluation.customerId.firstName}{' '}
                  {evaluation.customerId.lastName}
                </p>
              </div>
            )
            )
          }

          {
            waitForProcessing && waitForProcessing.map((evaluation) => evaluation.customerId && (
              <div
                key={`wait-for-processing-${evaluation._id}`}
                className='customerList__element waiting-for-processing'
              >
                <p onClick={() => handleChooseEvaluation(evaluation.customerId)}>
                  {evaluation.customerId.firstName}{' '}
                  {evaluation.customerId.lastName}
                </p>
              </div>
            ))
          }


          {
            waitForProcessingNotEvaluated && waitForProcessingNotEvaluated.map((evaluation) => evaluation.customerId && (
              <div
                key={`wait-for-processing-${evaluation._id}`}
                className='customerList__element waiting-for-processing-not-evaluated'
              >
                <p onClick={() => handleChooseEvaluation(evaluation.customerId)}>
                  {evaluation.customerId.firstName}{' '}
                  {evaluation.customerId.lastName}
                </p>
              </div>
            ))
          }

          {
            notStarted && notStarted.map((evaluation) => evaluation.customerId && (
              <div
                key={`wait-for-processing-${evaluation._id}`}
                className='customerList__element not-started'
              >
                <p onClick={() => handleChooseEvaluation(evaluation.customerId)}>
                  {evaluation.customerId.firstName}{' '}
                  {evaluation.customerId.lastName}
                </p>
              </div>
            ))
          }

          {
            completed && completed.map((evaluation) => evaluation.customerId && (
              <div
                key={`completed-${evaluation._id}`}
                className='customerList__element completed'
              >
                <p
                  key={evaluation._id}
                  onClick={() => handleChooseEvaluation(evaluation.customerId)}
                >
                  {evaluation.customerId.firstName}{' '}
                  {evaluation.customerId.lastName}
                </p>
              </div>
            ))
          }
        </div>
      </div>

      <NotificationModal
        type='iconInfo'
        hideIcon={true}
        body={
          <div>
            <IconButton
              aria-label='close'
              onClick={handleCloseInfoButton}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'black',
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent sx={{ width: '14rem' }}>
              {titles.map((title, index) => (
                <div key={index}>
                  <Box
                    style={{
                      backgroundColor: getTitleColor(title),
                      marginBottom: '10px',
                      padding: '1rem',
                    }}
                  >
                    <Typography style={{ marginLeft: '1rem' }} gutterBottom>
                      <b>{title}</b>
                    </Typography>
                  </Box>
                </div>
              ))}
            </DialogContent>
          </div>
        }
        open={isInfoButtonOpen}
        handleClose={handleCloseInfoButton}
      />
      {/* <UserNav /> */}
      <NotificationModal
        type='warning'
        title='Tietojen haku epäonnistui'
        body='Yritä myöhemmin uudelleen.'
        open={alertModalOpen}
        handleClose={handleCloseAlertModal}
      />
    </div>
  );
}
