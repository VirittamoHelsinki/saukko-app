// Import react packages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';
import useEvaluationStore from '../../../evaluationStore';

// Import libraries
import { Icon } from '@iconify/react';

// Import MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme } from '@mui/material/styles';

const mockData = [
  {
    _id: '1',
    businessId: '070 - 5658 -9',
    name: 'Arbonus OY',
    customerId: '123',
    supervisors: [
      {
        _id: '67890',
        firstName: 'Kaisa',
        lastName: 'Virtanen'
      },
      {
        _id: '68943',
        firstName: 'Sami',
        lastName: 'Virtanen'
      },
    ],
    units: [
      '56789',
      '67890'
    ]
  },
  {
    _id: '2',
    businessId: '070 - 5658 -9',
    name: 'Aimet OY',
    customerId: '567',
    supervisors: [
      {
        _id: '67895',
        firstName: 'Kaisa',
        lastName: 'Virtanen'
      },
      {
        _id: '68948',
        firstName: 'Sami',
        lastName: 'Virtanen'
      },
    ],
    units: [
      '56780',
      '67891'
    ]
  },
]

function EvaluationWorkplace() {
  const navigate = useNavigate();

  // Fetch workplaces & save to state
  const [workplaces, setWorkplaces] = useState(mockData);
  const [filteredWorkplaces, setFilteredWorkplaces] = useState(workplaces);

  // Setter functions from evaluationStore
  const setWorkplace = useEvaluationStore((state) => state.setWorkplace);
  const setSupervisor = useEvaluationStore((state) => state.setSupervisor);

  // Getter function from evaluationStore
  const workplaceFromStore = useEvaluationStore((state) => state.workplace);
  const supervisorFromStore = useEvaluationStore((state) => state.supervisor);

  // Workplace selection logic
  const handleSelectWorkplace = (event) => {
    // Find workplace by id
    const workplaceObj = workplaces.find(workplace => workplace._id === event.target.value)
    // Save to store
    setWorkplace(workplaceObj)
  };
  console.log('Workplace form store:', workplaceFromStore)

  // Pagination logic
  const [page, setPage] = useState(1);
  const workplacesPerPage = 15;
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastWorkplace = page * workplacesPerPage;
  const indexOfFirstWorkplace = indexOfLastWorkplace - workplacesPerPage;
  const currentWorkplaces = filteredWorkplaces?.slice(indexOfFirstWorkplace, indexOfLastWorkplace);

  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1); // Reset to the first page
    setFilteredWorkplaces(
      workplaces.filter((workplace) =>
      workplace.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };  

  // Supervisor selection logic
  const toggleSupervisor = (supervisorId) => () => {
    // Find supervisor object by id
    const allSupervisors = workplaces.flatMap(workplace => workplace.supervisors);
    const foundSupervisorObj = allSupervisors.find(supervisor => supervisor._id === supervisorId);
    // Save to store
    setSupervisor(foundSupervisorObj) 
  };
  console.log('Supervisor form store:', supervisorFromStore)
  
  return (
    <main className='evaluationWorkplace__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationWorkplace__container'>
        <div>Stepper here (waiting for update)</div>
        <h1>Valitse työpaikka ja ohjaaja</h1>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi työpaikka'}/>

        {/* Workplaces list */}
        <div>
          { filteredWorkplaces ? 
            filteredWorkplaces.map((workplace) => (
              <Accordion 
                className={`workplaces-accordion ${workplaceFromStore === workplace ? 'selected' : ''}`}
                key={workplace._id} 
                disableGutters 
                square
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    value={workplace.name}
                    control=
                      {<Radio 
                        checked={workplaceFromStore === workplace}
                        onChange={handleSelectWorkplace}
                        onClick={(event) => event.stopPropagation()} // Prevent expanding accordion when clicking radio button
                        value={workplace._id}
                        name='radio-buttons'
                        inputProps={{ 'aria-label': 'A' }}
                        theme={createTheme({palette: {primary: {main: '#0000BF'}}})}
                      />}
                    label={
                      <div className='radio__label'>
                        <p className={`radio__label-name ${workplaceFromStore === workplace ? 'selected' : ''}`}>
                          {workplace.name}
                        </p>
                        <p className='radio__label-businessid'>
                          Y- tunnus: {workplace.businessId}
                        </p>
                      </div>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>

                  {/* Supervisors dropdown menu */}
                  <Typography className='accordion-title'>Valitse työpaikkaohjaaja *</Typography>
                  <Accordion disableGutters square className='supervisors__wrapper'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Valitse</AccordionSummary>
                    <AccordionDetails>
                    {workplace.supervisors.map((supervisor) => (
                      <div 
                        className='supervisors__wrapper-details'
                        key={supervisor._id} 
                        onClick={toggleSupervisor(supervisor._id)}
                      >
                        <Typography>{supervisor.firstName} {supervisor.lastName}</Typography>
                        {supervisor === supervisorFromStore && <Icon icon="mdi:tick"/>}
                      </div>
                    ))}
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            ))
          : 'ei dataa APIsta'}
        </div>

        {/* Pagination */}
        {workplaces?.length > 15 && 
          <Pagination
            count={filteredWorkplaces && Math.ceil(filteredWorkplaces.length / workplacesPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        }
      {/* Back and forward buttons */}
      <PageNavigationButtons 
        handleBack={() => navigate(`/evaluation-form`)} 
        handleForward={() => navigate(`/evaluation-units`)} 
        forwardButtonText={'Seuraava'}
      />
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationWorkplace;

