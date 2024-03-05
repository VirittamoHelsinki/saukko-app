// Import React
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UserNav from '../../../components/UserNav/UserNav';
import Button from '../../../components/Button/Button';

// Import state management
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

// Import MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomerList() {
  const navigate = useNavigate();

  // Data from store management
  const { user } = useContext(AuthContext);
  const { evaluations, setInternalEvaluations, setInternalEvaluation } =
    useContext(InternalApiContext);

  // Set evaluations
  useEffect(() => {
    setInternalEvaluations();
  }, []);

  // Find evaluations in progress
  const inProgress =
    evaluations &&
    evaluations.filter(
      (evaluation) =>
        evaluation.completed === false &&
        evaluation.units.some((unit) => unit.status > 0)
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

  const handleChooseEvaluation = (evaluationId) => {
    setInternalEvaluation(evaluationId);
    navigate('/unit-list');
  };

  return (
    <main className='customerList__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={`Tervetuloa, ${user?.firstName}`}
        disabled={true}
      />

      {/* Notifications */}
      <div className='customerList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>

      <div className='customerList__container'>
        <h3> Omat suoritukset </h3>

        {/* In progress */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#FFF4B4' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography sx={{ fontWeight: '600' }}>Kesken</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {inProgress &&
                inProgress.map(
                  (evaluation) =>
                    evaluation.customerId && (
                      <a
                        key={evaluation._id}
                        onClick={() => handleChooseEvaluation(evaluation._id)}
                      >
                        {evaluation.customerId.firstName}{' '}
                        {evaluation.customerId.lastName}
                      </a>
                    )
                )}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Not started */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#efeff0' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography sx={{ fontWeight: '600' }}>Aloittamatta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {notStarted &&
                notStarted.map((evaluation) => (
                  <a
                    key={evaluation._id}
                    onClick={() => handleChooseEvaluation(evaluation._id)}
                  >
                    {evaluation.customerId.firstName}{' '}
                    {evaluation.customerId.lastName}
                  </a>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Completed */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#E2F5F3' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel3a-content'
            id='panel3a-header'
          >
            <Typography sx={{ fontWeight: '600' }}>Suorittanut</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {completed &&
                completed.map((evaluation) => (
                  <a
                    key={evaluation._id}
                    onClick={() => handleChooseEvaluation(evaluation._id)}
                  >
                    {evaluation.customerId.firstName}{' '}
                    {evaluation.customerId.lastName}
                  </a>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className='customerList__button'>
        <Button
          style={{
            color: '#0000BF',
            fontSize: '15px',
            border: '2px solid #0000BF',
            width: '60%',
            height: '50px',
          }}
          text='Tarkastele sopimusta'
          color='info'
          icon='la:file-alt'
          onClick={() => navigate('/contract-info')}
        />
      </div>
      <UserNav />
    </main>
  );
}
