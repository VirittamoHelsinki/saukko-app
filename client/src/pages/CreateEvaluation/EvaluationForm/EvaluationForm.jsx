// Import react packages
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Stepper from '../../../components/Stepper/Stepper';
import AuthContext from '../../../store/context/AuthContext';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';

// Import MUI
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function EvaluationForm() {
  const navigate = useNavigate();

  // Get user from AuthContext
  const { user } = useContext(AuthContext);

  // Save form inputs to state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState('DD.MM.YYYY');
  const [endDate, setEndDate] = useState('DD.MM.YYYY');
  const [workTasks, setWorkTasks] = useState('');
  const [workGoals, setWorkGoals] = useState('');

  // Opening / closing notificationModal
  const [openNotificationModalAllFields, setOpenNotificationModalAllFields] = useState(false)
  const [openNotificationModalEmail, setOpenNotificationModalEmail] = useState(false)
  const [openNotificationModalDate, setOpenNotificationModalDate] = useState(false)

  const handleCloseAllFields = () => setOpenNotificationModalAllFields(false)
  const handleCloseEmail = () => setOpenNotificationModalEmail(false)
  const handleCloseDate = () => setOpenNotificationModalDate(false)

  // Get functions and values from zustand store
  const { setCustomer, setEvaluation } = useEvaluationStore();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation: check for empty fields
    if (!firstName || !lastName || !email || !startDate || !endDate || !workTasks || !workGoals) {
      setOpenNotificationModalAllFields(true);
      return;
    }

    // Form validation: Regex for email format
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(email)) {
      setOpenNotificationModalEmail(true);
      return;
    }

    // Form validation: startDate and endDate are Date objects
    if (typeof startDate === 'string' || typeof endDate === 'string') {
      setOpenNotificationModalDate(true);
      return;
    }

    // Create user object
    const customer = {
      firstName,
      lastName,
      email,
      role: 'customer',
    };
    
    // Create evaluation object
    const evaluation = {
      customerId: '', // After user created -> server generates id -> fetch that
      teacherId: user ? user._id : '',
      startDate,
      endDate,
      workTasks,
      workGoals,
    };

    // Save objects to temporary store
    setCustomer(customer);
    setEvaluation(evaluation);
    
    // Navigate to the next page
    navigate(`/evaluation-workplace`);
  };

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form'
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace'
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units'
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary'
    },
  ];

  // Calendar style
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
              borderColor: '#0072C6',
              backgroundColor: 'white',
            }
          }
        }
      }
    }
  });

  return (
    <main className='evaluationForm__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationForm__container'>
      <Stepper
          activePage={1}
          totalPages={4}
          data={stepperData}
      />
        <h1>Lisää asiakkaan tiedot</h1>

        {/* Customer information form */}
        <form onSubmit={handleSubmit}>
          <div className='form__firstName'>
            <label>Etunimi *</label>
            <input 
              className='form-input' 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='form__lastName'>
            <label>Sukunimi *</label>
            <input 
              className='form-input' 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='form__email'>
            <label>Sähköposti *</label>
            <input 
              type='email' 
              className='form-input' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form__startDate'>
            <label>Asiakkuuden aloituspäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker 
                  format='DD.MM.YYYY'
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__endDate'>
            <label>Asiakkuuden lopetuspäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker 
                  format='DD.MM.YYYY'
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__extensionEndDate'>
            <label className='disabled'>Täydennysjakson päättymispäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker 
                  disabled={true}
                  format='DD.MM.YYYY'
                  value={'DD.MM.YYYY'}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__tasks'>
            <label>Työtehtäväsi *</label>
            <textarea 
              className='form-input'
              value={workTasks}
              onChange={(e) => setWorkTasks(e.target.value)}
            />
          </div>
          <div className='form__goals'>
            <label>Omat tavoitteesi *</label>
            <textarea 
              className='form-input'
              value={workGoals}
              onChange={(e) => setWorkGoals(e.target.value)}
            />
          </div>
        </form>

        <PageNavigationButtons handleBack={() => navigate(`/admin-menu`)} handleForward={handleSubmit} forwardButtonText={'Seuraava'} />
      </section>
      <NotificationModal
        type='warning'
        title='Lomakkeen lähetys epäonnistui'
        body='Täytä kaikki lomakkeen kentät'
        open={openNotificationModalAllFields}
        handleClose={handleCloseAllFields}
      />
      <NotificationModal
        type='warning'
        title='Lomakkeen lähetys epäonnistui'
        body='Tarkista sähköposti kenttä'
        open={openNotificationModalEmail}
        handleClose={handleCloseEmail}
      />
      <NotificationModal
        type='warning'
        title='Lomakkeen lähetys epäonnistui'
        body='Täytä asiakkuuden alkamis- ja päättymispäivämäärä'
        open={openNotificationModalDate}
        handleClose={handleCloseDate}
      />
      <UserNav />
    </main>
  );
}

export default EvaluationForm;
