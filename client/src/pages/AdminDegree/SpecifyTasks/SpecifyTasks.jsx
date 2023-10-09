// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import state management
import useUnitsStore from '../../../store/zustand/unitsStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import {
  CriteriaFieldsContextProvider,
  useCriteriaFieldsContext,
} from '../../../store/context/CriteriaFieldsContext';
import useStore from '../../../store/zustand/formStore';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
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

function SpecifyTasks() {
  const navigate = useNavigate();
  const params = useParams();

  // Initialize state
  /* const [isLoading, setIsLoading] = useState(true); */
  const [assessments, setAssessments] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // Get values from state management
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { degreeName } = useStore();
  const { criteriaFields, setCriteriaFields } = useCriteriaFieldsContext();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);

  /* useEffect(() => {
    // Check if the criteriaFields are populated (initialized)
    if (criteriaFields.length > 0) {
      setIsLoading(false); // Set loading to false when criteriaFields are populated
    }
  }, [criteriaFields]); */

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/degrees/${params.degreeId}/units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/summary`
    },
  ];

  // Dots Stepper
  const theme = useTheme();
  const maxSteps = checkedUnits.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle adding a new text field to the list of text
  // fields for the current step
  const handleAddTextField = () => {
    setCriteriaFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[activeStep] = [...(newFields[activeStep] || []), ''];
      return newFields;
    });
  };

  // Handle changes in the text fields
  const handleTextFieldChange = (stepIndex, fieldIndex, value, unitId) => {
    setCriteriaFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[activeStep][fieldIndex] = value;
      return newFields;
    });

    console.log(unitId)

    setAssessments((prevAssessments) => {
      const newAssessments = [...prevAssessments];
      newAssessments[activeStep] = newAssessments[activeStep] || {}; // Ensure there's an object for this step
      newAssessments[activeStep] = { unitId: unitId, name: value }; // Format assessment data
      return newAssessments;
    });
  };
  console.log('units task page', checkedUnits)
  console.log('assessments state', assessments)
  console.log('criteria fields context', criteriaFields)

  // Preserve textFields state when navigating between steps
  useEffect(() => {
    // Check if the active step index is within the bounds of the textFields array
    if (activeStep >= 0 && activeStep < criteriaFields.length) {
      // Set the text fields for the active step
      setCriteriaFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[activeStep] = newFields[activeStep] || [''];
        return newFields;
      });
    }
  }, [activeStep]);

  // Form submission handler
  const handleSubmit = () => {
    assessments.map((assessment) => (
      addAssessment(assessment.unitId, assessment.name)
    ))
    navigate(`/degrees/${params.degreeId}/summary`)
  }

  return (
    <CriteriaFieldsContextProvider maxSteps={maxSteps}>
      <main className='specify-tasks__wrapper'>
        <WavesHeader
          title='Saukko'
          secondTitle='Tutkintojen hallinta'
        />
        <section className='specify-tasks__container'>
          <Stepper
            activePage={3}
            totalPages={4}
            data={stepperData}
          />
          <h1>{degreeFound ? degree.name.fi : degreeName}</h1>
          <Box>
            <MobileStepper
              steps={maxSteps}
              position='static'
              activeStep={activeStep}
              nextButton={
                <Button
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
            <Paper square elevation={0}>
              <form>
                <h3>{checkedUnits[activeStep]?.name?.fi}</h3>

                {criteriaFields[activeStep]?.map((textField, index) => (
                  <div key={index}>
                    <input
                      type='text'
                      value={textField}
                      onChange={(event) =>
                        handleTextFieldChange(
                          activeStep,
                          index,
                          event.target.value,
                          checkedUnits[activeStep]._id
                        )
                      }
                    />
                  </div>
                ))}
                <Button
                  onClick={handleAddTextField}
                  className='add-criteria-btn'
                  sx={{ paddingLeft: 0, textTransform: 'none' }}
                >
                  + Lisää arviointikriteeri
                </Button>
              </form>
            </Paper>
          </Box>

          <PageNavigationButtons
            handleBack={() =>navigate(`/degrees/${params.degreeId}/units`)}
            handleForward={handleSubmit}
            forwardButtonText={'Tallenna ja jatka'}
          />
        </section>
        <UserNav />
      </main>
    </CriteriaFieldsContextProvider>
  );
}

export default SpecifyTasks;
