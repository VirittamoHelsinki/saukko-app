import { Modal } from "@mui/material"
import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, TextField, List, ListItem, IconButton, ListItemText, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { useState } from "react";
import SupervisorAutocomplete from '../../components/SupervisorAutocomplete/SupervisorAutocomplete';

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

import "./_clienteditmodal.scss";

const ClientEditModal = ({ isOpen, onClose, userToEdit }) => {
  

	const [ userFormData, setUserFormData] = useState({
		firstName: userToEdit.firstName,
		lastName: userToEdit.lastName,
		email: userToEdit.email,
		isArchived: false, // Checkbox value
	});

  const [ evaluationFormData, setEvaluationFormData] = useState({
    unitId: userToEdit.evaluationId.unitId,
    supervisorId: userToEdit.evaluationId.supervisorIds[0],
    startDate: userToEdit.evaluationId.startDate,
    endDate: userToEdit.evaluationId.endDate,
  });

  console.log("🚀 ~ ClientEditModal ~  userToEdit:",  userToEdit);
  console.log("🚀 ~ ClientEditModal ~  evaluationFormData:",  evaluationFormData);
  console.log("🚀 ~ ClientEditModal ~  userFormData:",  userFormData);

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
          <form>
            <div className="form-container">
              <label className="form-label">Etunimi *</label>
              <input type="text" id="firstName" name="firstName" />
            </div>

            <div className="form-container">
              <label className="form-label">Sukunimi *</label>
              <input type="text" id="lastName" name="lastName" />
            </div>

            <div className="form-container">
              <label className="form-label">Sähköposti *</label>
              <input type="text" id="email" name="email" />
            </div>

            <div className="form-container">
              <label className="form-label">Asiakkuuden aloituspäivä *</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    id="startDate"
                    format="DD.MM.YYYY"
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
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>

            <div className="form-container">
              <label className="form-label">Työpaikan yksikkö *</label>
              <input type="text" id="unit" name="unit" />
            </div>

            <div className="form-container">
              <label className="form-label">Ohjaaja *</label>
              <SupervisorAutocomplete />
            </div>

            <div className="form-container">
              <label className="form-label">Täydennysjakson päättymispäivä *</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DesktopDatePicker
                    id="x"
                    format="DD.MM.YYYY"
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
              onClick={() => onClose(false)}
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
