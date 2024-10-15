import { useState, useEffect } from "react";
import Modal from "../Modal";

const EditCompanyDegreeUnitsModal = ({ isOpen, setOpen }) => {

  useEffect(() => {
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    setOpen(false);
  }

  return (
    <Modal
      title='Muokkaa yksikön nimeä'
      open={isOpen}
      setOpen={setOpen}
    >
      <div className="edit-supervisor-modal__body">
        <form onSubmit={onSubmit}>
  

          <button
            className="edit-supervisor-modal__footer__button"
            type="submit"
            disabled={newWorkplaceName?.trim() === ""}
          >
            Vaihda yksikön nimi
          </button>
        </form>
      </div>


    </Modal>
  )
}

export default EditCompanyDegreeUnitsModal;