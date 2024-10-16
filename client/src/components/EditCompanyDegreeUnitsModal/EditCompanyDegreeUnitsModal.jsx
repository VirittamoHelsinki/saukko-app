import { useState, useEffect } from "react";
import Modal from "../Modal";
import FieldValueCard from "../FieldValueCard/FieldValueCard";
import ToggleButton from "../ToggleButton/ToggleButton";
import { fetchInternalDegreeById } from "../../api/degree";

const EditCompanyDegreeUnitsModal = ({ isOpen, setOpen, workplace, setWorkplace }) => {

  const [ degree, setDegree ] = useState(null);
  const [ unitsToCheck, setUnitsToCheck ] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const degreeId = workplace?.degreeId;
      if (!degreeId) {
        return;
      }

      const degree = await fetchInternalDegreeById(degreeId);

      // Create an array of objects with the unit's _id and checked status
      const unitData = degree.units.map((unit) => {
        if (workplace.units.find((otherUnit) => otherUnit._id === unit._id)) {
          return { ...unit, checked: true }
        }

        return { ...unit, checked: false }
      })

      setDegree(degree);
      setUnitsToCheck(unitData);
    }

    fetch()
  }, [ workplace ]);  

  const onSubmit = async (event) => {
    event.preventDefault();

    const newUnits = unitsToCheck
    .filter((unit) => unit.checked)
    .map((unit) => ({
        _id: unit._id,
        name: { fi: unit.name.fi },
        assessments: unit.assessments,
      }
    ))

    setWorkplace({ ...workplace, units: newUnits });
    setOpen(false);
  }

  const toggleUnit = (unit) => {
    setUnitsToCheck((prevState) => {
      console.log(unit);
      const newState = prevState.map((u) => {
        if (u._id === unit._id) {
          return { ...u, checked: !u.checked }
        }
        return u;
      })


      return newState;
    })
  }

  const amountOfCheckedUnits = unitsToCheck.filter((unit) => unit.checked).length;

  return (
    <Modal
      title='Yksikköön liitetyn tutkinnon osat'
      open={isOpen}
      setOpen={setOpen}
    >
      <div className="edit-company-degree-units-modal__body">

        <FieldValueCard title="Valittu tutkinto" value={degree?.name?.fi || "-"}  />

        <form onSubmit={onSubmit}>
          <h4>Valitse vähintään yksi tutkinnon osa</h4>

          <div className="toggle-button-list">
            {
              unitsToCheck.map((unit, index) => (
                <ToggleButton
                  key={`unit-${index}`}
                  label={`${index + 1}. ${unit.name.fi}`}
                  checked={unit.checked}
                  onChange={() => toggleUnit(unit)}
                />
              ))
            }
          </div>


          <button
            className="edit-company-degree-units-modal__footer__button"
            type="submit"
            disabled={amountOfCheckedUnits === 0}
          >
            Hyväksy muutokset
          </button>
        </form>
      </div>


    </Modal>
  )
}

export default EditCompanyDegreeUnitsModal;