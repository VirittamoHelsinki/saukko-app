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
import Button from '../../../components/Button/Button';




const ModalDegreeEdit = ({ open, setOpen, unitToEdit }) => {
  const addAssessment = useUnitsStore((state) => state.addAssessment);
  const editAssessment = useUnitsStore((state) => state.editAssessment);
  const deleteAssessment = useUnitsStore((state) => state.deleteAssessment);

  // Use a proper form state management library
  const [ assessmentName, setAssessmentName ] = useState("")
  const [ assessmentCriteria, setAssessmentCriteria ] = useState("")
  const [ assessmentToEdit, setAssessmentToEdit ] = useState(null)

  // Not proud but it'll do for now
  const [ innerState, setInnerState ] = useState("overview")

  useEffect(() => {
    setInnerState("overview")
  }, [open])


  let modalTitle
  {
    if (innerState === "overview") {
      modalTitle = "Tutkinnon osan muokkaus"
    } else if (innerState === "add-assessment") {
      modalTitle = "Ammattitaitovaatimuksen lisääminen"
    } else if (innerState === "edit-assessment") {
      modalTitle = "Ammattitaitovaatimuksen muokkaus"
    }
  }

  const handleClick = () => {
    // Check if the input value is empty
    if (assessmentCriteria.trim() === '') {
      setAssessmentCriteria('• '); // Insert a bullet point
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key

    if (key === "Enter") {
      event.preventDefault()
      const { selectionStart, selectionEnd } = event.target

      setAssessmentCriteria((oldValue => {
        const start = oldValue.slice(0, selectionStart)
        const end = oldValue.slice(selectionEnd)

        return `${start}\n• ${end}`
      }))

      setTimeout(() => {
        event.target.setSelectionRange(selectionStart + 3, selectionStart + 3)
      }, 0)

      return
    }

    if (key === "Backspace") {
      return
    }
  }

  const onPaste = (event) => {
    event.preventDefault()
    const { selectionStart, selectionEnd } = event.target

    // Get pasted data via clipboard API
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');

    setAssessmentCriteria((oldValue => {
      const start = oldValue.slice(0, selectionStart)
      const end = oldValue.slice(selectionEnd)
      const formattedData = `${start}${pastedData}${end}`
        .split("\n")
        .map((line) => line.startsWith("• ") ? line : `• ${line}`)
        .join("\n")

      return formattedData
    }))

    setTimeout(() => { 
      event.target.setSelectionRange(selectionStart, selectionStart)
    }, 0)
  }

  const handleEditButtonClick = (unit, assessment) => {
    setAssessmentToEdit(assessment)
    setInnerState("edit-assessment")

    setAssessmentName(assessment.name.fi)
    setAssessmentCriteria(assessment.criteria[0].fi)
  }

  const addNewAssessmentToUnit = (event) => {
    event.preventDefault()

    addAssessment(unitToEdit._id, assessmentName, assessmentCriteria)
    setAssessmentName("")
    setAssessmentCriteria("")
    setInnerState("overview")
  }

  const editAssessmentInUnit = (event) => {
    event.preventDefault()

    editAssessment(unitToEdit._id, assessmentToEdit._id, assessmentName, assessmentCriteria)

    setAssessmentName("")
    setAssessmentCriteria("")
    setInnerState("overview")
  }

  const handleDeleteButtonClick = (unit, assessment) => {
    deleteAssessment(unit._id, assessment._id)
  }

  return (
    <Modal open={open} setOpen={setOpen} title={modalTitle}>
      <FieldValueCard title="Valittu tutkinnon osa" value={unitToEdit?.name.fi} />

      {
        innerState === "overview" && (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p className="assessment-title" style={{ fontWeight: "bold" }}>Ammattitaitovaatimukset ja kriteerit</p>
              <div className="assessment-list">
                {
                  (!unitToEdit?.assessments || unitToEdit?.assessments?.length === 0)
                  ? <p>Ei lisättyjä ammattitaitovaatimuksia</p>
                  : (
                    unitToEdit?.assessments?.map((assessment, index) => (
                      <div key={index} className="assessment">
                        <div className="assessment__info">
                          <p>{ index + 1 }. {assessment.name.fi}</p>
                        </div>

                        <button
                          className="assessment__button edit"
                          onClick={() => handleEditButtonClick(unitToEdit, assessment)}
                        >
                          <Icon icon={"mingcute:pencil-line"} fontSize={20} />
                        </button>

                        <button
                          className="assessment__button delete"
                          onClick={() => handleDeleteButtonClick(unitToEdit, assessment)}>
                          <Icon icon={"material-symbols:delete-outline"} fontSize={20} />
                        </button>
                      </div>
                    ))
                  )
                }
              </div>
            </div>

            <Button
              text="Lisää uusi ammattitaitovaatimus"
              variant="contained"
              style={{ backgroundColor: "#0000BF", color: "white", border: "none", direction: "rtl" }}
              icon="ic:baseline-plus"
              onClick={() => setInnerState("add-assessment")}
            />
          </>
        )
      }

      {
        innerState === "add-assessment" && (
          <>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
              onSubmit={(e) => addNewAssessmentToUnit(e)}
            >
              <div className="form__field">
                <label>Ammattitaitovaatimuksen nimi *</label>
                <input
                  placeholder='Ammattitaitovaatimuksen nimi'
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                ></input>
              </div>
              <div className="form__field">
                <label>Kriteerit *</label>
                <textarea
                  onPaste={onPaste}
                  onKeyDown={handleKeyDown}
                  onClick={handleClick}
                  onFocus={handleClick}
                  placeholder='Kriteerit'
                  value={assessmentCriteria}
                  onChange={(e) => setAssessmentCriteria(e.target.value)}
                ></textarea>
              </div>
            </form>

            <Button
              text="Lisää ammattitaitovaatimus"
              variant="contained"
              style={{ backgroundColor: "#0000BF", color: "white", border: "none", }}
              icon="ic:baseline-plus"
              onClick={addNewAssessmentToUnit}
            />
          </>
        )
      }

      {
        // I'm sorry...
        innerState === "edit-assessment" && (
          <>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
              onSubmit={(e) => addNewAssessmentToUnit(e)}
            >
              <div className="form__field">
                <label>Ammattitaitovaatimuksen nimi *</label>
                <input
                  placeholder='Ammattitaitovaatimuksen nimi'
                  value={assessmentName}
                  onChange={(e) => setAssessmentName(e.target.value)}
                ></input>
              </div>
              <div className="form__field">
                <label>Kriteerit *</label>
                <textarea
                  onPaste={onPaste}
                  onKeyDown={handleKeyDown}
                  onClick={handleClick}
                  onFocus={handleClick}
                  placeholder='Kriteerit'
                  value={assessmentCriteria}
                  onChange={(e) => setAssessmentCriteria(e.target.value)}
                ></textarea>
              </div>
            </form>

            <Button
              text="Lisää ammattitaitovaatimus"
              variant="contained"
              style={{ backgroundColor: "#0000BF", color: "white", border: "none", }}
              icon="ic:baseline-plus"
              onClick={editAssessmentInUnit}
            />
          </>
        )
      }


    </Modal>
  )
}



function SpecifyTasks({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  // eslint-disable-next-line
  const [assessments, setAssessments] = useState([]);
  const { degreeName } = useStore();
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const addAssessment = useUnitsStore((state) => state.addAssessment);
  const toggleUnit = useUnitsStore((state) => state.toggleUnit);

  // Modal test
  const [open, setOpen] = useState(false)
  const [unitToEdit, setUnitToEdit] = useState(null)

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


  const handleOpenModal = (unit) => {
    setUnitToEdit(unit)
    setOpen(true)
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

  console.log(checkedUnits);

  const everyUnitHasAtLeastOneAssessment = checkedUnits.every(unit => unit.assessments?.length > 0);
  

  return (
    <>
      <ModalDegreeEdit
        open={open}
        setOpen={setOpen}
        title="Tutkinnon osan muokkaus"
        unitToEdit={unitToEdit}
      />


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
                    {
                      (unit.assessments && unit.assessments.length > 0)
                      ? unit.assessments.map((assessment, index) => (
                        <p key={index}>{index + 1}. {assessment.name.fi}</p>
                      ))
                      : <p>Ei lisättyjä tehtäviä</p>
                    }
                  </div>

                  <button className="unit__button edit" onClick={() => handleOpenModal(unit)}>
                    <Icon icon={"mingcute:pencil-line"} fontSize={22} />
                  </button>

                  <button className="unit__button delete" onClick={() => toggleUnit(unit)}>
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
            disabled={!everyUnitHasAtLeastOneAssessment}
          />
        </section>
      </div>
    </>
  );
}

export default WithDegree(SpecifyTasks);
