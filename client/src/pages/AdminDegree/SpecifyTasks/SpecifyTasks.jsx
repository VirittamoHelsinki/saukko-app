// Import react packages & dependencies
import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import state management
import useUnitsStore from '../../../store/zustand/unitsStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import useStore from '../../../store/zustand/formStore';

// Import components
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

// Import MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// Import criteria modal
import RequirementsAndCriteriaModal from '../../../components/RequirementsAndCriteriaModal/RequirementsAndCriteriaModal';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

function SpecifyTasks() {
  const navigate = useNavigate();
  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Initialize state
  const [assessments, setAssessments] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [savedDataCriteria, setSavedDataCriteria] = useState([]);

  // Get values from state management
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { degreeName } = useStore();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);

  // Modal for criteria info
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta")
    // Initialize saved data object
    const initialData = {};
    checkedUnits.forEach((unit) => {
      initialData[unit._id] = [];
    });
    setSavedDataCriteria(initialData);
  }, [checkedUnits, setHeading, setSiteTitle, setSubHeading]);

  const handleSave = (title, criteria) => {
    const newData = { ...savedDataCriteria };
    newData[checkedUnits[activeStep]._id].push({ title, criteria });
    setSavedDataCriteria(newData);
  };

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`,
    },
    {
      label: degree.units ? 'Valitse tutkinnonosat' : 'Lisää tutkinnonosat',
      url: degree.units
        ? `/degrees/${params.degreeId}/units`
        : `/degrees/${params.degreeId}/edit-units`,
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`,
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/summary`,
    },
  ];

  // Text Stepper
  const theme = useTheme();
  const maxSteps = checkedUnits.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

  const handlePenClick = () => {
    setIsCriteriaModalOpen(true);
  };

  // Form submission handler
  const handleSubmit = () => {
    const flattenedAssessments = assessments.flat();

    flattenedAssessments.forEach((assessment) => {
      const { unitId, name, criteria } = assessment;
      addAssessment(unitId, name, criteria);
    });

    navigate(`/degrees/${params.degreeId}/summary`);
  };

  return (
    <div className='specify-tasks__wrapper'>
      <section className='specify-tasks__container'>
        <Stepper activePage={3} totalPages={4} data={stepperData} />
        <h1>{degreeFound ? degree.name.fi : degreeName}</h1>
        <h3 className='degree-guidance'>Muokkaa tutkinnonosa</h3>
        <Box sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 20,
              pl: 2,
            }}
          />
          <Paper square elevation={0}>
            <form>
              <h3 className='degree-guidance'>
                Lisää ammattitaitovaatimukset ja kriteerit
              </h3>
              <MobileStepper
                sx={{ bgcolor: '#f2f2f2', borderBottom: '3px solid #333' }}
                variant='text'
                steps={maxSteps}
                position='static'
                activeStep={activeStep}
                nextButton={
                  <Button
                    id='nextButton'
                    sx={{ fontWeight: 'bold', color: '#000000' }}
                    size='small'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Seuraava
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>
                }
                backButton={
                  <Button
                    id='backButton'
                    sx={{ fontWeight: 'bold', color: '#000000' }}
                    size='small'
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                    Edellinen
                  </Button>
                }
              />
              <h3 className='unit-guidance'>
                {checkedUnits[activeStep]?.name?.fi}
              </h3>
              <RequirementsAndCriteriaModal
                open={isCriteriaModalOpen}
                onClose={handleCloseCriteriaModal}
                title='Ammattitaitovaatimuksen tiedot'
                modalUnitName={checkedUnits[activeStep]?.name.fi}
                requirementsTitle='Ammattitaitovaatimuksen nimi'
                criteria='Kriteerit'
                hideCancelButton={true}
                onSave={(title, criteria) => {
                  setAssessments((prevAssessments) => [
                    ...prevAssessments,
                    {
                      unitId: checkedUnits[activeStep]._id,
                      name: title,
                      criteria: criteria,
                    },
                  ]);
                  handleSave(title, criteria);
                }}
              />
              <div>
                {savedDataCriteria[checkedUnits[activeStep]?._id]?.map(
                  (field, index) => (
                    <li key={index} className='list_group_skills_titles'>
                      <span className='title'>
                        {index + 1}. {field.title}{' '}
                      </span>
                      <span
                        onClick={() =>
                          handlePenClick(checkedUnits[activeStep]._id)
                        }
                      >
                        {' '}
                        <Icon icon='uil:pen' color='#0000bf' />
                      </span>
                    </li>
                  )
                )}
              </div>
              <Button
                id='addCriteriaButton'
                onClick={handleOpenCriteriaModal}
                className='add-criteria-btn'
                sx={{ paddingLeft: 0, textTransform: 'none' }}
              >
                + Lisää ammattitaitovaatimukset
              </Button>
            </form>
          </Paper>
        </Box>

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${params.degreeId}/edit-units`)}
          handleForward={handleSubmit}
          forwardButtonText={'Tallenna ja jatka'}
          showForwardButton={true}

        />
      </section>
    </div>
  );
}

export default SpecifyTasks;
