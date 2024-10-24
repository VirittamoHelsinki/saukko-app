// Import react packages
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Searchbar from '../../../components/Searchbar/Searchbar';
import Stepper from '../../../components/Stepper/Stepper';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import InternalApiContext from '../../../store/context/InternalApiContext';
import useHeadingStore from '../../../store/zustand/useHeadingStore';

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
import TeacherSelection from '../../../components/TeacherSelection/TeacherSelection';
import { fetchAllTeachers } from '../../../api/user';

function EvaluationWorkplace() {
  const navigate = useNavigate();

  const [ allTeachers, setAllTeachers ] = useState([])

  // Fetch workplaces & save to state
  const { workplaces } = useContext(InternalApiContext);
  const { setHeading, setSiteTitle, setSubHeading } = useHeadingStore();

  const [filteredWorkplaces, setFilteredWorkplaces] = useState(workplaces);

  // Setter functions from evaluationStore
  const { setWorkplace, setSupervisor, clearWorkplace } =
    useEvaluationStore();

  // Getter functions from evaluationStore
  const workplaceFromStore = useEvaluationStore((state) => state.workplace);
  const departmentFromStore = useEvaluationStore((state) => state.department);
  const supervisorFromStore = useEvaluationStore((state) => state.supervisor);

  // NotificationModal
  const [departmentNotification, setDepartmentNotification] = useState(false);
  const [supervisorNotification, setSupervisorNotification] = useState(false);
  const [redirectNotification, setRedirectNotification] = useState(false);

  const closeDepartmentNotification = () => setDepartmentNotification(false);
  const closeSupervisorNotification = () => setSupervisorNotification(false);
  const closeRedirectNotification = () => setRedirectNotification(false);

  useEffect(() => {
    setSiteTitle('Suorituksen aktivoiminen')
    setSubHeading('Lisää uusi asiakas')
    setHeading('Asiakkuudet')
  }, [setHeading, setSiteTitle, setSubHeading]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachers = await fetchAllTeachers();
        setAllTeachers(teachers.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  
  // Workplace selection
  const toggleWorkplace = (event) => {
    clearWorkplace();
    const foundWorkplace = workplaces.find(
      (workplace) => workplace._id === event.target.value
    );
    setWorkplace(foundWorkplace);
  };
  console.log('Workplace form store:', workplaceFromStore);
  
  // Department selection
  console.log('Department from store:', departmentFromStore);
  
  // Supervisor selection
  const toggleSupervisor = (supervisorId) => () => {
    if (
      workplaceFromStore &&
      workplaceFromStore.departments.length > 0 &&
      departmentFromStore
    ) {
      const findSupervisorById = departmentFromStore.supervisors.find(
        (supervisor) => supervisor._id === supervisorId
      );
      findSupervisorById
      ? setSupervisor(findSupervisorById)
      : setSupervisorNotification(true);
    } else if (
      workplaceFromStore &&
      workplaceFromStore.departments.length === 0
    ) {
      const findSupervisorById = workplaceFromStore.supervisors.find(
        (supervisor) => supervisor._id === supervisorId
      );
      setSupervisor(findSupervisorById);
    } else {
      setSupervisorNotification(true);
    }
  };
  console.log('Supervisor from store:', supervisorFromStore);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [needsPagination, setNeedsPagination] = useState(false);
  const workplacesPerPage = 5;
  
  // TODO: This seems unfunctional
  useEffect(() => {
    const contentHeight = document.querySelector(
      '.evaluationWorkplace__container'
    ).scrollHeight;
    const viewportHeight = window.innerHeight;
    setNeedsPagination(contentHeight > 1.3 * viewportHeight);
  }, []);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastWorkplace = page * workplacesPerPage;
  const indexOfFirstWorkplace = indexOfLastWorkplace - workplacesPerPage;
  const paginatedWorkplaces = filteredWorkplaces?.slice(
    indexOfFirstWorkplace,
    indexOfLastWorkplace
  );
  const workplacesToMap = needsPagination
  ? paginatedWorkplaces
  : filteredWorkplaces;
  
  
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
    navigate('/evaluation-units');
  } else {
    setRedirectNotification(true);
  }
};

// Stepper labels & urls
const stepperData = [
  {
    label: 'Lisää tiedot',
    url: '/evaluation-form',
  },
  {
    label: 'Valitse työpaikka',
    url: '/evaluation-workplace',
  },
  {
    label: 'Valitse tutkinnonosat',
    url: '/evaluation-units',
  },
  {
    label: 'Aktivoi suoritus',
    url: '/evaluation-summary',
  },
];

  console.log("allTeachers", allTeachers);
  console.log("workplacesToMap", workplacesToMap);

  return (
    <div className='evaluationWorkplace__wrapper'>
      {/* <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' /> */}
      <section className='evaluationWorkplace__container'>
        <Stepper activePage={2} totalPages={4} data={stepperData} />
        <h1>Valitse työpaikka ja ohjaaja</h1>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi työpaikka'} />

        {/* Workplaces list */}
        <div>
          {workplacesToMap
            ? workplacesToMap.map((workplace) => (
              <Accordion
                className={`workplaces-accordion ${workplaceFromStore === workplace ? 'selected' : ''}`}
                key={workplace._id}
                disableGutters
                square
                sx={{ position: 'static' }}
              >
                <AccordionSummary
                  sx={{ position: 'static' }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <FormControlLabel
                    sx={{ position: 'static' }}
                    value={workplace.name}
                    control={
                      <Radio
                        checked={workplaceFromStore === workplace}
                        onChange={toggleWorkplace}
                        value={workplace._id}
                        theme={createTheme({
                          palette: { primary: { main: '#0000BF' } },
                        })}
                      />
                    }
                    label={
                      <div className='radio__label'>
                        <p
                          className={`radio__label-name ${workplaceFromStore === workplace ? 'selected' : ''}`}
                        >
                          {workplace.name}
                        </p>
                      </div>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                  {/* Supervisors */}
                  {workplace.departments.length === 0 && (
                    <>
                      <Typography className='accordion-title'>
                        Valitse ohjaaja *
                      </Typography>
                      <Accordion
                        disableGutters
                        square
                        className='accordion__wrapper'
                      >
                        <AccordionSummary
                          sx={{ position: 'static' }}
                          expandIcon={<ExpandMoreIcon />}
                        >
                          Valitse
                        </AccordionSummary>
                        <AccordionDetails>
                          {workplace.supervisors.map((supervisor) => (
                            <div
                              className={`accordion__wrapper-details ${supervisorFromStore &&
                                supervisorFromStore._id === supervisor._id
                                ? 'selected'
                                : ''
                                }`}
                              key={supervisor._id}
                              onClick={toggleSupervisor(supervisor._id)}
                            >
                              <Typography>
                                {supervisor.firstName} {supervisor.lastName}
                              </Typography>
                              {supervisorFromStore &&
                                supervisor._id ===
                                supervisorFromStore._id && (
                                  <Icon icon='mdi:tick' />
                                )}
                            </div>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                      {/* Teachers */}
                      <TeacherSelection workplace={workplace} />
                    </>
                  )}



                  {workplace.departments.length > 0 &&
                    departmentFromStore && (
                      <>
                        <Typography className='accordion-title'>
                          Valitse ohjaaja *
                        </Typography>
                        <Accordion
                          disableGutters
                          square
                          className='accordion__wrapper'
                        >
                          <AccordionSummary
                            sx={{ position: 'static' }}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            Valitse
                          </AccordionSummary>
                          <AccordionDetails>
                            {workplace.departments.map((department) =>
                              department.supervisors.map((supervisor) => (
                                <div
                                  className={`accordion__wrapper-details ${supervisorFromStore &&
                                    supervisorFromStore._id === supervisor._id
                                    ? 'selected'
                                    : ''
                                    }`}
                                  key={supervisor._id}
                                  onClick={toggleSupervisor(supervisor._id)}
                                >
                                  <Typography>
                                    {supervisor.firstName}{' '}
                                    {supervisor.lastName}
                                  </Typography>
                                  {supervisorFromStore &&
                                    supervisor._id ===
                                    supervisorFromStore._id && (
                                      <Icon icon='mdi:tick' />
                                    )}
                                </div>
                              ))
                            )}
                          </AccordionDetails>{' '}
                        </Accordion>
                        <TeacherSelection workplace={workplace} />
                      </>
                    )}
                </AccordionDetails>
              </Accordion>
            ))
            : 'ei dataa APIsta'}
        </div>

        {/* Pagination */}
        <div className='pagination_evaluation_workplace'>
          {needsPagination && (
            <div className='evaluation_workplace_pagenavigate'>
              <Pagination
                count={
                  filteredWorkplaces &&
                  Math.ceil(filteredWorkplaces.length / workplacesPerPage)
                }
                page={page}
                onChange={handlePageChange}
              /*  sx={{
                '& .MuiPaginationItem-root':{
                  position: 'static'
              },
                '& .Mui-disabled': {
                  position: 'relative',
                }
            }} */
              />
            </div>
          )}
        </div>

        {/* Back and forward buttons */}
        <PageNavigationButtons
          handleBack={() => navigate(`/evaluation-form`)}
          handleForward={validationHandler}
          showForwardButton={true}
        />
      </section>
      <NotificationModal
        type='warning'
        title='Yksikön valinta epäonnistui'
        body='Valitse ensin työpaikka ja sitten työpaikalle kuuluva yksikkö'
        open={departmentNotification}
        handleClose={closeDepartmentNotification}
      />
      <NotificationModal
        type='warning'
        title='Ohjaajan valinta epäonnistui'
        body='Valitse ensin työpaikka ja sitten työpaikalle kuuluva ohjaaja'
        open={supervisorNotification}
        handleClose={closeSupervisorNotification}
      />
      <NotificationModal
        type='warning'
        title='Työpaikan valinta epäonnistui'
        body={
          <div style={{ padding: '10px' }}>
            <Typography style={{ fontSize: '14px' }}>
              Valitse ensin työpaikka, yksikkö ja ohjaaja.
            </Typography>
          </div>
        }
        open={redirectNotification}
        handleClose={closeRedirectNotification}
      />
    </div>
  );
}

export default EvaluationWorkplace;
