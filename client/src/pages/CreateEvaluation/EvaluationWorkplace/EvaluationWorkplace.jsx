import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';

// Import MUI components
import { Accordion, AccordionSummary, AccordionDetails, Radio, FormControlLabel, Pagination, createTheme, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const mockData = [
  {
    _id: '1',
    businessId: '1',
    name: 'Arbonus OY',
    customerId: '123',
    supervisors: [
      '960484',
      '960438'
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
      '960483',
      '960439'
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
  
  return (
    <main className='evaluationWorkplace__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationWorkplace__container'>
        <PageNumbers activePage={2}/>
        <h1>Valitse työpaikka ja ohjaaja</h1>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi työpaikka'}/>

        {/* Workplace accordions */}
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
                      onClick={(event) => event.stopPropagation()}
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
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>

            ))
          : 'ei dataa APIsta'}
        </div>

        {workplaces?.length > 15 && 
          <Pagination
            count={filteredWorkplaces && Math.ceil(filteredWorkplaces.length / workplacesPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        }
      </section>
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

