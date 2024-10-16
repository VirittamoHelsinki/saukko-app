import { useState, useEffect } from "react";
import Modal from "../Modal";
import FieldValueCard from "../FieldValueCard/FieldValueCard";
import Searchbar from "../Searchbar/Searchbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import ToggleButton from "../ToggleButton/ToggleButton";
import { fetchInternalDegreeById } from "../../api/degree";

const EditCompanyDegreeUnitsModal = ({ isOpen, setOpen, workplace }) => {  

  const [ degree, setDegree ] = useState(null);
  const [ unitsToCheck, setUnitsToCheck ] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const degreeId = workplace.degreeId;
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

    setOpen(false);
  }

  return (
    <Modal
      title='Yksikön tutkinnon tutkinnon osat'
      open={isOpen}
      setOpen={setOpen}
    >
      <div className="edit-company-degree-units-modal__body">

        <FieldValueCard title="Valittu tutkinto" value={degree?.name?.fi || "-"}  />

        <form onSubmit={onSubmit}>
          <Searchbar id='searchbarId' handleSearch={() => {}} placeholder={'Etsi tutkinnon osia'} />


          <div className="toggle-button-list">
            {
              unitsToCheck.map((unit, index) => (
                <ToggleButton
                  key={`unit-${index}`}
                  label={`${index + 1}. ${unit.name.fi}`}
                  checked={unit.checked}
                  onChange={() => {}}
                />
              ))
            }
          </div>


          <button
            className="edit-supervisor-modal__footer__button"
            type="submit"
            disabled={false}
          >
            Hyväksy muutokset
          </button>
        </form>
      </div>


    </Modal>
  )
}

export default EditCompanyDegreeUnitsModal;