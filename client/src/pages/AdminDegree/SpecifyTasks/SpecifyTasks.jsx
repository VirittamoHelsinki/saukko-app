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
import WithDegree from '../../../HOC/withDegree';
import RequirementsAndCriteriaEditingModal from '../../../components/RequirementsAndCriteriaModal/RequirementsAndCriteriaEditingModal';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import FieldValueCard from '../../../components/FieldValueCard/FieldValueCard';

function SpecifyTasks({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

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

        <FieldValueCard title="Valittu tutkinto" value={degree ? degree?.name?.fi : degreeName} />

        <p style={{ fontSize: 18, }}>Tutkinnon osat ja tehtävät</p>
        <div className="unit-list">
          {
            checkedUnits.map((unit, index) => (
              <div key={index} className="unit">
                <div className="unit__info">
                  <p style={{ fontWeight: "bold" }}>{unit.name.fi}</p>
                  <p>Ei lisättyjä tehtäviä</p>
                  <p>Ei lisättyjä tehtäviä</p>
                  <p>Ei lisättyjä tehtäviä</p>
                  <p>Ei lisättyjä tehtäviä</p>
                </div>

                <button className="unit__button edit">
                  <Icon icon={"mingcute:pencil-line"} fontSize={22} />
                </button>

                <button className="unit__button delete">
                  <Icon icon={"material-symbols:delete-outline"} fontSize={22} />
                </button>
              </div>
            ))
          }
        </div>

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
