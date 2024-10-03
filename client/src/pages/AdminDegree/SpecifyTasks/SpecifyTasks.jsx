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
import { Icon } from '@iconify/react';
// Import criteria modal
import WithDegree from '../../../HOC/withDegree';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import FieldValueCard from '../../../components/FieldValueCard/FieldValueCard';

import Modal from "../../../components/Modal";



function SpecifyTasks({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  // Initialize state
  // eslint-disable-next-line
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line
  const [assessmentToEdit, setAssessmenetToEdit] = useState(null)
  const [assessments, setAssessments] = useState([]);
  // eslint-disable-next-line
  const [activeStep, setActiveStep] = useState(0); // Index of the selected unit
  const { degreeName } = useStore();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);


  // Modal test
  const [isOpen, setOpen] = useState(true);

  // Modal for criteria info
  // eslint-disable-next-line
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

  // eslint-disable-next-line
  const handleOpenCriteriaModal = () => {
    setIsCriteriaModalOpen(true);
  };

  // eslint-disable-next-line
  const handleCloseCriteriaModal = () => {
    setIsEditing(false)
    setIsCriteriaModalOpen(false);
  };

  // eslint-disable-next-line
  const handleEditButtonClick = (assessmentToEdit) => {
    setAssessmenetToEdit(assessmentToEdit)
    setIsEditing(true)
    setIsCriteriaModalOpen(true);
  };

  // eslint-disable-next-line
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

  // eslint-disable-next-line
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
    <>
      <Modal open={isOpen} setOpen={setOpen} title="Tutkinnon osan muokkaus">
        <p>Hello world!</p>
      </Modal>
      <div className='specify-tasks__wrapper'>
        <section className='specify-tasks__container'>
          <Stepper activePage={3} totalPages={4} data={stepperData} />

          <FieldValueCard title="Valittu tutkinto" value={degree ? degree?.name?.fi : degreeName} />

          <p style={{ fontSize: 18, marginTop: 10, }}>Tutkinnon osat ja tehtävät</p>
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
            forwardButtonText={'Seuraava'}
            showForwardButton={true}
            
            />
        </section>
      </div>
    </>
  );
}

export default WithDegree(SpecifyTasks);
