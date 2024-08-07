// Import react packages & dependencies
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import state management
import useUnitsStore from '../../../store/zustand/unitsStore';
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
import WithDegree from '../../../HOC/withDegree';
import RequirementsAndCriteriaEditingModal from '../../../components/RequirementsAndCriteriaModal/RequirementsAndCriteriaEditingModal';

function SpecifyTasks({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // Initialize state
  const [isEditing, setIsEditing] = useState(false);
  const [assessmentToEdit, setAssessmenetToEdit] = useState(null)
  const [assessments, setAssessments] = useState([]);
  const [activeStep, setActiveStep] = useState(0); // Index of the selected unit
  const { degreeName } = useStore();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);

  // Modal for criteria info
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi")
    setSubHeading("Lisää uusi tutkinto")
    setHeading("Tutkintojen hallinta")
  }, [checkedUnits, setHeading, setSiteTitle, setSubHeading]);

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
    setIsEditing(false)
    setIsCriteriaModalOpen(false);
  };

  const handleEditButtonClick = (assessmentToEdit) => {
    setAssessmenetToEdit(assessmentToEdit)
    setIsEditing(true)
    setIsCriteriaModalOpen(true);
  };

  const modalHandleSave = (title, criteria) => {
    // Check if user actually has checked units
    if (!checkedUnits[activeStep]) {
      return;
    }

    setAssessments((prevAssessments) => [
      ...prevAssessments,
      {
        unitId: checkedUnits[activeStep]._id, // error
        name: title,
        criteria: criteria,
      },
    ]);
  }

  const editModalHandleSave = (newAssessment) => {
    // Check if user actually has checked units
    if (!checkedUnits[activeStep]) {
      return;
    }

    console.log({ newAssessment });

    setAssessments((prevAssessments) => {
      const filteredAssessments = prevAssessments
        .filter((oldAssessment => oldAssessment.unitId !== newAssessment.unitId));
        
      return [
        ...filteredAssessments,
        newAssessment,
      ]
    });
  }

  // Form submission handler
  const handleSubmit = () => {
    const flattenedAssessments = assessments.flat();

    flattenedAssessments.forEach((assessment) => {
      const { unitId, name, criteria } = assessment;
      addAssessment(unitId, name, criteria); // Add assessments to global state
    });

    navigate(`/degrees/${params.degreeId}/summary`); // Navigate to the next page
  };

  return (
    <div className='specify-tasks__wrapper'>
      <section className='specify-tasks__container'>
        <Stepper activePage={3} totalPages={4} data={stepperData} />
        <h1>{degree ? degree.name.fi : degreeName}</h1>
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
              <MobileStepper
                sx={{ 
                  bgcolor: '#f2f2f2',
                }}
                variant='text'
                steps={maxSteps}
                position='static'
                activeStep={activeStep}
                nextButton={
                  <Button
                    id='nextButton'
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#000000',
                      //position:'static'
                    }}
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
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#000000',
                      //position: 'static'
                    }}
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
              <h4 className='degree-guidance'>
                Lisää ammattitaitovaatimukset ja kriteerit
              </h4>
              <h3 className='unit-guidance'>
                {checkedUnits[activeStep]?.name?.fi}
              </h3>
              
              {
                isEditing ? (
                  <RequirementsAndCriteriaEditingModal
                    open={isCriteriaModalOpen}
                    onClose={handleCloseCriteriaModal}
                    title='Ammattitaitovaatimuksen tiedot'
                    modalUnitName={checkedUnits[activeStep]?.name.fi}
                    requirementsTitle='Ammattitaitovaatimuksen nimi'
                    criteria='Kriteerit'
                    onSave={editModalHandleSave}
                    assessmentToEdit={assessmentToEdit}
                    hideCancelButton
                  />
                ) : (
                  <RequirementsAndCriteriaModal
                    open={isCriteriaModalOpen}
                    onClose={handleCloseCriteriaModal}
                    title='Ammattitaitovaatimuksen tiedot'
                    modalUnitName={checkedUnits[activeStep]?.name.fi}
                    requirementsTitle='Ammattitaitovaatimuksen nimi'
                    criteria='Kriteerit'
                    onSave={modalHandleSave}
                    hideCancelButton
                  />
                )
              }

              <div>
                {
                  assessments
                    .filter((assessment) => assessment.unitId === checkedUnits[activeStep]?._id)
                    .map((assessment, index) => (
                      <li key={index} className='list_group_skills_titles'>
                        <span className='title'>
                          {index + 1}. {assessment.name}                
                        </span>
                        <Icon
                          icon='uil:pen'
                          color='#0000bf'
                          onClick={() => handleEditButtonClick(assessment)}
                        />
                      </li>
                    )
                  )
                }
              </div>
              <Button
                id='addCriteriaButton'
                onClick={handleOpenCriteriaModal}
                className='add-criteria-btn'
                sx={{ 
                  paddingLeft: 0, 
                  textTransform: 'none',
                }}
              >
                + Lisää ammattitaitovaatimukset
              </Button>
            </form>
          </Paper>
        </Box>

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${params.degreeId}/edit-units`)}
          handleForward={handleSubmit}
          forwardButtonText={'Vahvista valinnat'}
          showForwardButton={true}

        />
      </section>
    </div>
  );
}

export default WithDegree(SpecifyTasks);
