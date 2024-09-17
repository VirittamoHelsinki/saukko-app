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
import "./_clienteditmodal.scss";

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


const ClientEditModal = ({ isOpen, onClose, userToEdit }) => {
	const [ userFormData, setUserFormData] = useState({
		firstName: userToEdit.firstName,
		lastName: userToEdit.lastName,
		email: userToEdit.email,
    workplace: userToEdit.workplaceId,
		isArchived: false, // Checkbox value
	});

  const [ evaluationFormData, setEvaluationFormData] = useState({
    supervisor: userToEdit.workplaceId.supervisors[0],
    startDate: userToEdit.evaluationId.startDate,
    endDate: userToEdit.evaluationId.endDate,
    extensionEndDate: userToEdit.evaluationId.extensionEndDate,
  });

  const setSupervisor = (supervisor) => {
    setEvaluationFormData({ ...evaluationFormData, supervisor })
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    await updateUser(userToEdit._id, userFormData);
    await updateEvaluation(userToEdit.evaluationId._id, evaluationFormData);

    onClose(false);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >

      <div
        className="client-edit-modal"
        style={{

          overflow: 'auto',
          maxHeight: '90vh',
        }}
      >
        <div className="client-edit-modal__header">
          <p className="header__title">Asiakkuuden tietojen muokkaus</p>
          <svg onClick={() => onClose(false)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 1.5L7.5 6L12 10.5L10.5 12L6 7.5L1.5 12L0 10.5L4.5 6L0 1.5L1.5 0L6 4.5L10.5 0L12 1.5Z" fill="black" />
          </svg>
        </div>

        <div className="client-edit-modal__body">
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

            <div className="form-container">
              <label className="form-label">Asiakkuuden aloituspäivä *</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    id="startDate"
                    format="DD.MM.YYYY"
                    value={dayjs(evaluationFormData.startDate)}
                    onChange={(date) => setEvaluationFormData({ ...evaluationFormData, startDate: date })}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>

            <div className="form-container">
              <label className="form-label">Asiakkuuden lopetuspäivä *</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    id="endDate"
                    format="DD.MM.YYYY"
                    value={dayjs(evaluationFormData.endDate)}
                    onChange={(date) => setEvaluationFormData({ ...evaluationFormData, endDate: date })}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>

            <div className="form-container">
              <label className="form-label">Ohjaaja *</label>
              <SupervisorAutocomplete
                workplace={userFormData.workplace}
                setValue={setSupervisor}
                value={evaluationFormData.supervisor}
              />
            </div>

            <div className="form-container">
              <label className="form-label">Täydennysjakson päättymispäivä</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    id="extensionEndDate"
                    format="DD.MM.YYYY"
                    value={
                      evaluationFormData.extentionEndDate
                      ? dayjs(evaluationFormData.extentionEndDate)
                      : null
                    }
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ userFormData.isArchived || false} // Checkbox state
                    onChange={(e) => setUserFormData({ ... userFormData, isArchived: e.target.checked })} // Handle change
                    color="primary"
                  />
                }
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    Arkistoi asiakas
                    <Tooltip title="Arkistoi asiakas, jos asiakas ei ole enää aktiivinen." placement="right">
                      <IconButton size="small" sx={{ marginLeft: '8px' }}>
                        <Icon icon="material-symbols:info-outline" width="20" height="20" />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
              />
            </div>

            <button
              className="client-edit-modal__footer__button"
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

export default ClientEditModal;
