import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';

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
    businessId: '1',
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
    businessId: '2',
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

  // Radio button logic
  const [selectedWorkplace, setSelectedWorkplace] = useState('a');

  const handleSelectWorkplace = (event) => {
    setSelectedWorkplace(event.target.value);
  };

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
  const [selectedSupervisorId, setSelectedSupervisorId] = useState(null);

  const toggleSupervisor = (supervisorId) => () => {
    console.log('params sup id', supervisorId)
    setSelectedSupervisorId(supervisorId);
    console.log('set sup id', selectedSupervisorId)
    // ERROR first old id
  };

  // Radio button theme
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0000BF',
      },
    },
  });
  
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
                className={`workplaces-accordion ${selectedWorkplace === workplace.name ? 'selected' : ''}`}
                key={workplace._id} 
                disableGutters 
                square
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <FormControlLabel
                    value={workplace.name}
                    control=
                      {<Radio 
                        checked={selectedWorkplace === workplace.name}
                        onChange={handleSelectWorkplace}
                        onClick={(event) => event.stopPropagation()} // Prevent expanding accordion when clicking radio button
                        value={workplace.name}
                        name='radio-buttons'
                        inputProps={{ 'aria-label': 'A' }}
                        theme={theme}
                      />}
                    label={
                      <div>
                        <Typography 
                          variant='body1' 
                          sx={{
                            fontSize: '15px',
                            fontWeight: selectedWorkplace === workplace.name ? 'bold' : 'normal',
                          }}>
                          {workplace.name}
                        </Typography>
                        <Typography variant='caption' color='textSecondary'>
                          Y-tunnus: {workplace.businessId}
                        </Typography>
                      </div>
                    }
                    aria-label={workplace.name}
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
                        {supervisor._id === selectedSupervisorId && <Icon icon="mdi:tick"/>}
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
      </section>

      {/* Back and forward buttons */}
      <PageNavigationButtons 
        handleBack={() => navigate(`/evaluation-form`)} 
        handleForward={() => navigate(`/evaluation-units`)} 
        forwardButtonText={'Seuraava'}
      />
      <UserNav />
    </main>
  );
}

export default EvaluationWorkplace;

