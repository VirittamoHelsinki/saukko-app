import { useState, useEffect } from "react";
import Modal from "../Modal";
import FieldValueCard from "../FieldValueCard/FieldValueCard";
import Searchbar from "../Searchbar/Searchbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import ToggleButton from "../ToggleButton/ToggleButton";

const EditCompanyDegreeUnitsModal = ({ isOpen, setOpen, workplace }) => {

  useEffect(() => {
  }, []);

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

        <FieldValueCard title="Valittu tutkinto" value="tutkinnon nimi"  />

        <form onSubmit={onSubmit}>
          <Searchbar id='searchbarId' handleSearch={() => {}} placeholder={'Etsi tutkinnon osia'} />


          <div className="toggle-button-list">
            <ToggleButton
              label="1. Huolto- ja korjaustyöt"
              checked={false}
              onChange={() => {}}
            />
            <ToggleButton
              label="2. Pintavauriotyöt"
              checked={true}
              onChange={() => {}}
            />
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