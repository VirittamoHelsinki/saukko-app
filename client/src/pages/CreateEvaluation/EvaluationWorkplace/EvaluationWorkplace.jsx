// Import react packages
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';
import Stepper from '../../../components/Stepper/Stepper';
import useEvaluationStore from '../../../store/evaluationStore';

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
  },
  {
    _id: '2',
    businessId: '070 - 5658 -9',
    name: 'Aimet OY',
    customerId: '537',
    departments: [
      {
        id: '1',
        name: 'Department 1',
        supervisors: [
          {
            _id: '22557',
            firstName: 'Maija',
            lastName: 'Virtanen'
          },
          {
            _id: '09886',
            firstName: 'Pekka',
            lastName: 'Virtanen'
          },    
        ],
      },
      {
        id: '2',
        name: 'Department 2',
        supervisors: [
          {
            _id: '95842',
            firstName: 'Liisa',
            lastName: 'Virtanen'
          },
          {
            _id: '92834',
            firstName: 'Olli',
            lastName: 'Virtanen'
          },    
        ],
      },
      {
        id: '3',
        name: 'Department 3',
        supervisors: [
          {
            _id: '67899',
            firstName: 'Tero',
            lastName: 'Virtanen'
          },
          {
            _id: '22447',
            firstName: 'Jonna',
            lastName: 'Virtanen'
          },    
        ],
      },
    ],
  },
]

function EvaluationWorkplace() {
  const navigate = useNavigate();

  // Fetch workplaces & save to state
  const [workplaces, setWorkplaces] = useState(mockData);
  const [filteredWorkplaces, setFilteredWorkplaces] = useState(workplaces);

  // Setter functions from evaluationStore
  const setWorkplace = useEvaluationStore((state) => state.setWorkplace);
  const setDepartment = useEvaluationStore((state) => state.setDepartment);
  const setSupervisor = useEvaluationStore((state) => state.setSupervisor);

  // Getter function from evaluationStore
  const workplaceFromStore = useEvaluationStore((state) => state.workplace);
  const departmentFromStore = useEvaluationStore((state) => state.department);
  const supervisorFromStore = useEvaluationStore((state) => state.supervisor);

  // Workplace selection
  const handleSelectWorkplace = (event) => {
    // Find workplace by id
    const workplaceObj = workplaces.find(workplace => workplace._id === event.target.value)
    // Save to store
    setWorkplace(workplaceObj)
  };
  console.log('Workplace form store:', workplaceFromStore)

  // Supervisor selection logic
  const toggleSupervisor = (supervisorId) => () => {

    // Find all supervisors
    const allSupervisors = workplaces.flatMap(workplace => {
      if (workplace.departments && workplace.departments.length > 0) {
        return workplace.departments.flatMap(department => department.supervisors);
      } else {
        return workplace.supervisors;
      }
    });
    console.log('all supervisors:', allSupervisors);

    // Find supervisor object by id
    const foundSupervisorObj = allSupervisors.find(supervisor => supervisor._id === supervisorId);

    // Save to store
    setSupervisor(foundSupervisorObj) 
  };
  console.log('Supervisor from store:', supervisorFromStore)

  // Department selection logic
  const toggleDepartment = (departmentId) => () => {

    // Find all departments
    const allDepartments = workplaces
      .map((workplace) => workplace.departments)
      .filter((departments) => departments && departments.length > 0)
      .flat();

    // Find department by id
    const foundDepartment = allDepartments.find(department => department.id === departmentId);

    // Save to store
    setDepartment(foundDepartment) 
  };
  console.log('Department from store:', departmentFromStore)
  
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

  // Validate data and redirect
  const validationHandler = () => {
    if (workplaceFromStore && supervisorFromStore) {
      navigate('/evaluation-units')
    } else {
      alert('Choose workplace and supervisor')
    }
  };

  // Stepper labels
  const labelStepper = [
    'Lisää tiedot',
    'Valitse työpaikka',
    'Valitse tutkinnonosat',
    'Aktivoi suoritus',
  ];
  
  return (
    <main className='evaluationWorkplace__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationWorkplace__container'>
        <Stepper
            activePage={2}
            totalPages={4}
            label={labelStepper}
            url={'/evaluation-workplace'}
        />
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
                onClick={() => handleSelectWorkplace({ target: { value: workplace._id } })}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <FormControlLabel
                    value={workplace.name}
                    control=
                      {<Radio 
                        checked={workplaceFromStore === workplace}
                        onChange={() => {}}
                        value={workplace._id}
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

                  {/* Departments */}
                  {workplace.departments && (
                    <>
                      <Typography className="accordion-title"> Valitse yksikkö * </Typography>
                      <Accordion disableGutters square className='accordion__wrapper'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Valitse</AccordionSummary>
                        <AccordionDetails>
                          {workplace.departments.map((department) => (
                            <div 
                            className='accordion__wrapper-details'
                            key={department.id} 
                            onClick={toggleDepartment(department.id)}
                            >
                              <Typography>{department.name}</Typography>
                              {department === departmentFromStore && <Icon icon="mdi:tick"/>}
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}

                  {/* Supervisors */}
                  {!workplace.departments && (
                    <>
                      <Typography className='accordion-title'>Valitse työpaikkaohjaaja *</Typography>
                      <Accordion disableGutters square className='accordion__wrapper'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Valitse</AccordionSummary>
                        <AccordionDetails>
                        {workplace.supervisors.map((supervisor) => (
                          <div 
                            className='accordion__wrapper-details'
                            key={supervisor._id} 
                            onClick={toggleSupervisor(supervisor._id)}
                          >
                            <Typography>{supervisor.firstName} {supervisor.lastName}</Typography>
                            {supervisor === supervisorFromStore && <Icon icon="mdi:tick"/>}
                          </div>
                        ))}
                        </AccordionDetails>
                      </Accordion> 
                    </>
                  )}

                  {workplace.departments && departmentFromStore && (
                    <>
                      <Typography className='accordion-title'>Valitse työpaikkaohjaaja *</Typography>
                      <Accordion disableGutters square className='accordion__wrapper'>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Valitse</AccordionSummary>
                        <AccordionDetails>
                          {departmentFromStore.supervisors.map((supervisor) => (
                            <div 
                              className='accordion__wrapper-details'
                              key={supervisor._id} 
                              onClick={toggleSupervisor(supervisor._id)}
                            >
                              <Typography>{supervisor.firstName} {supervisor.lastName}</Typography>
                              {supervisor === supervisorFromStore && <Icon icon="mdi:tick"/>}
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion> 
                    </>
                  )}
                 
                </AccordionDetails>
              </Accordion>
            ))
          : 'ei dataa APIsta'}
        </div>

        {/* Pagination */}
        <Pagination
          count={filteredWorkplaces && Math.ceil(filteredWorkplaces.length / workplacesPerPage)}
          page={page}
          onChange={handlePageChange}
        />

        {/* Back and forward buttons */}
        <PageNavigationButtons 
          handleBack={() => navigate(`/evaluation-form`)} 
          handleForward={validationHandler} 
          forwardButtonText={'Seuraava'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationWorkplace;

