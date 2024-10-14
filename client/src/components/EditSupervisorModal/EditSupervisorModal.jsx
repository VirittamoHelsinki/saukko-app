import { Checkbox, FormControl, FormControlLabel, Modal } from "@mui/material"
import { useEffect, useState } from "react";

import "./_editsupervisormodal.scss";

const EditSupervisorModal = ({ isOpen, onClose, supervisors, setSupervisors, supervisorToEdit }) => {
	const [ userFormData, setUserFormData] = useState({
		firstName: supervisorToEdit?.firstName || "",
		lastName: supervisorToEdit?.lastName || "",
		email: supervisorToEdit?.email || "",
		isArchived: supervisorToEdit?.isArchived || false,
	});

  useEffect(() => {
    setUserFormData({
      firstName: supervisorToEdit?.firstName || "",
      lastName: supervisorToEdit?.lastName || "",
      email: supervisorToEdit?.email || "",
      isArchived: supervisorToEdit?.isArchived || false,
    });
  }, [supervisorToEdit]);
  

  const onSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(userFormData.email)) {
      return;
    }

    const otherSupervisors = supervisors.filter(s => s._id !== supervisorToEdit._id);
    const updatedSupervisor = {
      ...supervisorToEdit,
      ...userFormData,
    };

    setSupervisors(([ ...otherSupervisors, updatedSupervisor ]));
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      isArchived: false,
    });
    onClose(false);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >

      <div
        className="edit-supervisor-modal"
        style={{

          overflow: 'auto',
          maxHeight: '90vh',
        }}
      >
        <div className="edit-supervisor-modal__header">
          <p className="header__title">Muokkaa ohjaajan tietoja</p>
          <svg onClick={() => onClose(false)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5L10.5 0L12 1.5Z" fill="black" />
          </svg>
        </div>

        <div className="edit-supervisor-modal__body">
          <form onSubmit={onSubmit}>
            <div className="form-container">
              <label className="form-label">Etunimi *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userFormData.firstName}
                onChange={(e) => setUserFormData({ ...userFormData, firstName: e.target.value })}
              />
            </div>

            <div className="form-container">
              <label className="form-label">Sukunimi *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userFormData.lastName}
                onChange={(e) => setUserFormData({ ...userFormData, lastName: e.target.value })}
              />
            </div>

            <div className="form-container">
              <label className="form-label">Sähköposti *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userFormData.email}
                onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              />
            </div>


            <FormControlLabel
              control={(
                <Checkbox
                  checked={userFormData.isArchived}
                  onChange={(e) => setUserFormData({ ...userFormData, isArchived: e.target.checked })}
                  color="primary"
                />
              )}
              label="Arkistoi yksikkö"
            />

            <button
              className="edit-supervisor-modal__footer__button"
              type="submit"
            >
              Hyväksy muutokset
            </button>
          </form>
        </div>

      </div>

    </Modal>
  )
}

export default EditSupervisorModal;
