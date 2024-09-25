import { Modal } from "@mui/material"
import { Icon } from "@iconify/react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useState } from "react";
import SupervisorAutocomplete from '../../components/SupervisorAutocomplete/SupervisorAutocomplete';

import dayjs from "dayjs";
import { updateUser } from "../../api/user";
import { updateEvaluation } from "../../api/evaluation";
import "./_addsupervisormodal.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000BF',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            borderRadius: '0px',
          },
          '&:not(.Mui-selected)': {
            borderRadius: '0px',
          },
          '&.MuiPickersDay-root:not(.Mui-selected)': {
            borderColor: '#FF0000',
            backgroundColor: 'white',
          },
        },
      },
    },
  },
});


const AddSupervisorModal = ({ isOpen, onClose, supervisors, setSupervisors }) => {
	const [ userFormData, setUserFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
	});

  const onSubmit = async (event) => {
    event.preventDefault();

    setSupervisors(([ ...supervisors, userFormData ]));
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
    });
    onClose(false);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >

      <div
        className="add-supervisor-modal"
        style={{

          overflow: 'auto',
          maxHeight: '90vh',
        }}
      >
        <div className="add-supervisor-modal__header">
          <p className="header__title">Lisää uusi ohjaaja</p>
          <svg onClick={() => onClose(false)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5L10.5 0L12 1.5Z" fill="black" />
          </svg>
        </div>

        <div className="add-supervisor-modal__body">
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

            <button
              className="add-supervisor-modal__footer__button"
              type="submit"
            >
              Lisää ohjaaja
            </button>
          </form>
        </div>

      </div>

    </Modal>
  )
}

export default AddSupervisorModal;
