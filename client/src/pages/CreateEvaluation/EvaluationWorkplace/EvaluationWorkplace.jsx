import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';

// Import MUI components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const handleChange = (event) => {
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

  // Radio button color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0000BF',
      },
    },
  });

  // Supervisor selection logic
  const [selectedSupervisor, setSelectedSupervisor] = useState('');

  const handleSupervisor = (event) => {
    setSelectedSupervisor(event.target.value);
  };
  console.log('Selected supervisor:', selectedSupervisor);
  
  return (
    <main className='evaluationWorkplace__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationWorkplace__container'>
        <PageNumbers activePage={2}/>
        <h1>Valitse työpaikka ja ohjaaja</h1>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi työpaikka'}/>

        {/* Workplaces list */}
        <div>
          { filteredWorkplaces ? 
            filteredWorkplaces.map((workplace) => (
              <Accordion 
                key={workplace.name}
                disableGutters 
                square
                sx={{
                  border: 'none',
                  boxShadow: 'none',
                  '&:before': {
                    display: 'none', // Remove line in between accordions
                  },    
                  backgroundColor: (selectedWorkplace === workplace.name) ? '#E2F5F3' : {
                    '&:nth-of-type(even)': {
                      backgroundColor: 'var(--accordion-background-grey)',
                    },                
                  },
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <FormControlLabel
                    value={workplace.name}
                    control={<Radio 
                      checked={selectedWorkplace === workplace.name}
                      onChange={handleChange}
                      onClick={(event) => event.stopPropagation()} // Prevent expanding accordion when clicking radio button
                      value={workplace.name}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                      theme={theme}
                    />}
                    label={workplace.name}
                    aria-label={workplace.name}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Y-tunnus: {workplace.businessId}</Typography>
                  <Typography>Valitse työpaikkaohjaaja: *</Typography>

                  {/* Supervisors dropdown menu */}
                  <FormControl fullWidth>
                    <InputLabel>Valitse</InputLabel>
                    <Select
                      value={selectedSupervisor}
                      label="Supervisor"
                      onChange={handleSupervisor}
                    >
                      {workplace.supervisors.map((supervisor) => (
                        <MenuItem key={supervisor._id} value={supervisor._id}>
                          {supervisor.firstName} {supervisor.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

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

