// Import React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import { useEvaluations } from '../../../store/context/EvaluationsContext.jsx';


// Import MUI
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomerList() {
  const navigate = useNavigate();
  const { evaluations, refetchEvaluations } = useEvaluations();

  // Data from store management
  const { currentUser } = useAuthContext();
  const { setHeading, setSiteTitle } = useHeadingContext();
  /*   const { evaluations, setInternalEvaluations, setInternalEvaluation } = */
  /*   useContext(InternalApiContext); */

  const [isInfoButtonOpen, setIsInfoButtonOpen] = useState(false);

  const handleOpenInfoButton = () => {
    setIsInfoButtonOpen(true);
  };

  const handleCloseInfoButton = () => {
    setIsInfoButtonOpen(false);
  };

  // Titles color for info button
  const titles = ['Valmis', 'Käsittelyssä', 'Aloitettu', 'Aloittamatta'];

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
      default:
        return '#FFFFFF'; // Default color if title is not recognized
    }
  };

  // Set evaluations
  useEffect(() => {
    setHeading(`Tervetuloa ${currentUser?.firstName}`)
    setSiteTitle("Etusivu")
    refetchEvaluations();
    /* setInternalEvaluations(); */
  }, [setHeading, setSiteTitle, currentUser, refetchEvaluations]);

  // Find evaluations in progress
  const inProgress =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation.completed === false &&
        evaluation.units.every((unit) => unit.status !== 2) &&
        evaluation.units.some((unit) => unit.status > 0)
    );
  // Find evaluations waitin for processing
  const waitForProcessing =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation && evaluation.units.some((unit) => unit.status === 2)
    );

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

  const handleChooseEvaluation = (customer) => {
    navigate(`/unit-list/${customer._id}`);
  };

  return (
    <div className='customerList__wrapper'>
      {/* Notifications */}
      <div className='customerList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
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
            inProgress && inProgress.map((evaluation, index) => evaluation.customerId && (
                <div
                  key={index}
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
            waitForProcessing && waitForProcessing.map((evaluation, index) => evaluation.customerId && (
              <div
                key={index}
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
            notStarted && notStarted.map((evaluation, index) => evaluation.customerId && (
              <div key={index} className='customerList__element not-started'>
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

          {
            completed && completed.map((evaluation, index) => evaluation.customerId && (
              <div
                key={index}
                className='customerList__element completed'
              >
                <p
                  key={evaluation._id}
                  onClick={() => handleChooseEvaluation(evaluation._id)}
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
    </div>
  );
}
