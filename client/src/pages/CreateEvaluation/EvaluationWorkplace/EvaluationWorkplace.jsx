// Import react packages
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';
import Stepper from '../../../components/Stepper/Stepper';
import useEvaluationStore from '../../../store/zustand/evaluationStore';

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
  {
    _id: '3',
    businessId: '070 - 5658 -9',
    name: 'Company 3',
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
    _id: '4',
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
  {
    _id: '5',
    businessId: '070 - 5658 -9',
    name: 'Company 4',
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
    _id: '6',
    businessId: '070 - 5658 -9',
    name: 'Company 5',
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
  {
    _id: '7',
    businessId: '070 - 5658 -9',
    name: 'Company 7',
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
    _id: '8',
    businessId: '070 - 5658 -9',
    name: 'Company 8',
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
  const clearEvaluation = useEvaluationStore((state) => state.clearEvaluation);

  // Getter functions from evaluationStore
  const workplaceFromStore = useEvaluationStore((state) => state.workplace);
  const departmentFromStore = useEvaluationStore((state) => state.department);
  const supervisorFromStore = useEvaluationStore((state) => state.supervisor);

  // Workplace selection
  const toggleWorkplace = (event) => {
    clearEvaluation();
    const findWorkplaceById = workplaces.find(workplace => workplace._id === event.target.value)
    setWorkplace(findWorkplaceById)
  };
  console.log('Workplace form store:', workplaceFromStore)

  // Department selection
  const toggleDepartment = (departmentId) => () => {
    setSupervisor(null);
    if (workplaceFromStore && workplaceFromStore.departments) {
      const findDepartmentById = workplaceFromStore.departments.find(department => department.id === departmentId);
      setDepartment(findDepartmentById);
    } else {
      alert('Choose department belonging to chosen workplace');
    };
  };
  console.log('Department from store:', departmentFromStore)

  // Supervisor selection
  const toggleSupervisor = (supervisorId) => () => {
    if (workplaceFromStore && workplaceFromStore.departments && departmentFromStore) {
      const findSupervisorById = departmentFromStore.supervisors.find(supervisor => supervisor._id === supervisorId);
      setSupervisor(findSupervisorById);
    } else if (workplaceFromStore && !workplaceFromStore.departments) {
      const findSupervisorById = workplaceFromStore.supervisors.find(supervisor => supervisor._id === supervisorId);
      setSupervisor(findSupervisorById);
    } else {
      alert('Choose supervisor belonging to the chosen workplace')
    }
  };
  console.log('Supervisor from store:', supervisorFromStore)
  
  // Pagination
  const [page, setPage] = useState(1);
  const [needsPagination, setNeedsPagination] = useState(false);
  const workplacesPerPage = 5;

  useEffect(() => {
    const contentHeight = document.querySelector('.evaluationWorkplace__container').scrollHeight;
    const viewportHeight = window.innerHeight;
    setNeedsPagination(contentHeight > 1.3 * viewportHeight);
  }, []);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastWorkplace = page * workplacesPerPage;
  const indexOfFirstWorkplace = indexOfLastWorkplace - workplacesPerPage;
  const paginatedWorkplaces = filteredWorkplaces?.slice(indexOfFirstWorkplace, indexOfLastWorkplace);
  const workplacesToMap = needsPagination ? paginatedWorkplaces : filteredWorkplaces;

  // Searchbar
  const handleSearch = (event) => {
    setPage(1);
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
          { workplacesToMap ? 
            workplacesToMap.map((workplace) => (
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
                        onChange={toggleWorkplace}
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
                              {departmentFromStore && (department.id === departmentFromStore.id) && <Icon icon="mdi:tick"/>}
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
                            {supervisorFromStore && (supervisor._id === supervisorFromStore._id) && <Icon icon="mdi:tick"/>}
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
                              {supervisorFromStore && (supervisor._id === supervisorFromStore._id) && <Icon icon="mdi:tick"/>}
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
        {needsPagination && 
          <Pagination
            count={filteredWorkplaces && Math.ceil(filteredWorkplaces.length / workplacesPerPage)}
            page={page}
            onChange={handlePageChange}
          />
        }

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

