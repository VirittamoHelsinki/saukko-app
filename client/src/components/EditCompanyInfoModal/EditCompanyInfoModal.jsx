import { useState, useEffect } from "react";
import Modal from "../Modal";

const EditCompanyInfoModal = ({ isOpen, setOpen, setWorkplace, workplace }) => {
  const [ newInfo, setNewInfo ] = useState("");

  useEffect(() => {
    setNewInfo(workplace.info);
  }, [workplace]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const updatedWorkplace = {
      ...workplace,
      info: newInfo,
    };

    setWorkplace(updatedWorkplace);
    setOpen(false);
  }

  return (
    <Modal
      title='Muokkaa yksikön lisätietoja'
      open={isOpen}
      setOpen={setOpen}
    >
      <div className="edit-supervisor-modal__body">
        <form onSubmit={onSubmit}>
          <div className="form-container">
            <label className="form-label">Yksikön lisätiedot</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newInfo}
              onChange={(e) => setNewInfo(e.target.value)}
            />
          </div>

          <button
            className="edit-supervisor-modal__footer__button"
            type="submit"
          >
            Hyväksy muutokset
          </button>
        </form>
      </div>


    </Modal>
  )
}

export default EditCompanyInfoModal;