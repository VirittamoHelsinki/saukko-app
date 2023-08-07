// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import { useTheme } from '@mui/material/styles';
import Stepper from '../../../components/Stepper/Stepper';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import useUnitsStore from '../../../unitsStore';
import DegreeContext from '../../../utils/context/DegreeContext';
import DynamicTextFields from '../../../components/DynamicTextFields/DynamicTextFields';

function SpecifyTasks() {
  const navigate = useNavigate();

  // Set path & get degree units from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Get checked units from unitsStore
  const { checkedUnits, setUnitAtIndex } = useUnitsStore();

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Vahvista',
  ];

  // Dots Stepper
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = checkedUnits.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // State to store the list of text fields for each step
  const [textFields, setTextFields] = useState(
    Array.from({ length: maxSteps }, () => [''])
  );

  // Function to handle adding a new text field
  const handleAddTextField = () => {
    setTextFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[activeStep] = [...(newFields[activeStep] || []), ''];
      return newFields;
    });
  };

  // Function to handle changes in the text fields
  const handleTextFieldChange = (stepIndex, fieldIndex, value) => {
    setTextFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[stepIndex][fieldIndex] = value;
      return newFields;
    });
  };

  // Preserve textFields state when navigating between steps
  useEffect(() => {
    // Check if the active step index is within the bounds of the textFields array
    if (activeStep >= 0 && activeStep < textFields.length) {
      // Set the text fields for the active step
      setTextFields((prevFields) => {
        const newFields = [...prevFields];
        newFields[activeStep] = textFields[activeStep] || '';
        return newFields;
      });
    }
  }, [activeStep]);

  return (
    <main className='specify-tasks__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='specify-tasks__container'>
        <Stepper
          activePage={3}
          totalPages={4}
          label={labelStepper}
          url={`/degrees/${degree._id}/units/tasks`}
        />
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
              <Typography>{checkedUnits[activeStep]?.name?.fi}</Typography>

              {textFields[activeStep]?.map((textField, index) => (
                <DynamicTextFields
                  key={index}
                  value={textField}
                  onChange={(event) =>
                    handleTextFieldChange(activeStep, index, event.target.value)
                  }
                />
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
          handleBack={() =>
            navigate(`/degrees/${degree._id}/units/confirm-selection`)
          }
          handleForward={''}
          forwardButtonText={'Vahvista valinnat'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default SpecifyTasks;
