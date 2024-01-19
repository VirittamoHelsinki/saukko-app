// Import react packages & dependencies
import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import state management
import useUnitsStore from '../../../store/zustand/unitsStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
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
import DisplayDataFromInputModal from '../../../components/DisplayDataFromInputModal/DisplayDataFromInputModal';

// Import criteria modal
import RequirementsAndCriteriaModal from '../../../components/RequirementsAndCriteriaModal/RequirementsAndCriteriaModal';

function SpecifyTasks() {
  const navigate = useNavigate();
  const params = useParams();

  // Initialize state
  const [assessments, setAssessments] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [inputFields, setInputFields] = useState(
    Array.from({ length: 3 }, () => [''])
  );

  // Get values from state management
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { degreeName } = useStore();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);
  const [modalData, setModalData] = useState(null);

  // Modal for criteria info
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  // Saved data from modal
  const [savedDataTitle, setSavedDataTitle] = useState([]);

  const handleSave = (title) => {
    setSavedDataTitle((prevTitle) => [...prevTitle, title]);
    handleCloseCriteriaModal();
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

  // Modal for criteria info
  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };

  // Handle adding a new text field
  const handleAddTextField = () => {
    setInputFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[activeStep] = [...(newFields[activeStep] || []), ''];
      return newFields;
    });
  };

  // Handle changes in the text fields
  const handleTextFieldChange = (stepIndex, fieldIndex, value, unitId) => {
    setInputFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[activeStep][fieldIndex] = value;
      return newFields;
    });

    setAssessments((prevAssessments) => {
      // Create a copy of the previous assessments
      const newAssessments = [...prevAssessments];

      // Ensure there's an array for this step
      newAssessments[stepIndex] = newAssessments[stepIndex] || [];

      // Get the existing assessment object for this field if it exists, or create a new one
      const existingAssessment = newAssessments[stepIndex][fieldIndex] || {};

      // Update the assessment object with the new value
      const updatedAssessment = {
        ...existingAssessment,
        unitId: unitId,
        name: value,
      };

      // Update the assessments array for this step with the updated assessment object
      newAssessments[stepIndex][fieldIndex] = updatedAssessment;

      return newAssessments;
    });
  };

  // Form submission handler
  const handleSubmit = () => {
    const flattenedAssessments = assessments.flat();

    flattenedAssessments.forEach((assessment) => {
      const { unitId, name } = assessment;
      addAssessment(unitId, name);
    });

    navigate(`/degrees/${params.degreeId}/summary`);
  };

  return (
    <main className='specify-tasks__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
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
              <div>
                <DisplayDataFromInputModal savedDataTitle={savedDataTitle} />
              </div>

              {/* those functionality will come modal 
                {inputFields[activeStep]?.map((textField, index) => (
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
                ))} */}
              <RequirementsAndCriteriaModal
                open={isCriteriaModalOpen}
                handleClose={handleCloseCriteriaModal}
                onSave={handleSave}
              />

              <Button
                onClick={() => {
                  handleAddTextField();
                  handleOpenCriteriaModal();
                }}
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
        />
      </section>
      <UserNav />
    </main>
  );
}

export default SpecifyTasks;
