import { useState, useEffect } from "react";
import Modal from "../Modal";

const EditCompanyNameModal = ({ isOpen, setOpen, setWorkplace, workplace }) => {
  const [ newWorkplaceName, setNewWorkplaceName ] = useState("");

  useEffect(() => {
    setNewWorkplaceName(workplace.name);
  }, [workplace]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (newWorkplaceName.trim() === "") {
      return;
    }

    const updatedWorkplace = {
      ...workplace,
      name: newWorkplaceName,
    };

    setWorkplace(updatedWorkplace);
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
          <div className="form-container">
            <label className="form-label">Yksikön nimi *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newWorkplaceName}
              onChange={(e) => setNewWorkplaceName(e.target.value)}
            />
          </div>

          <button
            className="edit-supervisor-modal__footer__button"
            type="submit"
            disabled={newWorkplaceName.trim() === ""}
          >
            Vaihda yksikön nimi
          </button>
        </form>
      </div>


    </Modal>
  )
}

export default EditCompanyNameModal;