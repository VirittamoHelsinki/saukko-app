// Import react packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Stepper from '../../../components/Stepper/Stepper';
import useEvaluationFormStore from '../../../store/zustand/evaluationFormStore';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

// Import MUI
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import useCheckEmailAvailability from '../../../hooks/useEmailAvailable';

function EvaluationForm() {
  const navigate = useNavigate();

  const {
    firstName,
    lastName,
    email,
    startDate,
    endDate,
    workTasks,
    workGoals,
    setFirstName,
    setLastName,
    setEmail,
    setStartDate,
    setEndDate,
    setWorkTasks,
    setWorkGoals,
    setCustomer,
    setEvaluation, // Include the new setters
    // ... add other state variables and setters as needed
  } = useEvaluationFormStore();


  const emailIsAvailable = useCheckEmailAvailability(email)
  console.log({ emailIsAvailable });

  // Get user from AuthContext
  const { currentUser } = useAuthContext();

  // Opening / closing notificationModal
  const [openNotificationModalAllFields, setOpenNotificationModalAllFields] =
    useState(false);
  const [openNotificationModalEmail, setOpenNotificationModalEmail] =
    useState(false);
  const [openNotificationModalDate, setOpenNotificationModalDate] =
    useState(false);

  const handleCloseAllFields = () => setOpenNotificationModalAllFields(false);
  const handleCloseEmail = () => setOpenNotificationModalEmail(false);
  const handleCloseDate = () => setOpenNotificationModalDate(false);

  const [showWarningModal, setShowWarningModal] = useState(false);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setSiteTitle('Suorituksen aktiivoiminen'),
      setSubHeading('Lisää uusi asiakas'),
      setHeading('Asiakkuudet');
  }, [setHeading, setSiteTitle, setSubHeading]);

  const handleBack = () => {
    // Display a warning modal before navigating to '/admin-menu'
    setShowWarningModal(true);
  };

  const handleConfirmBack = () => {
    // User confirmed, navigate to '/admin-menu'
    setShowWarningModal(false);
  };

  const handleCancelBack = () => {
    // User canceled, close the warning modal
    setShowWarningModal(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation: check for empty fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !startDate ||
      !endDate ||
      !workTasks ||
      !workGoals
    ) {
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
      teacherId: currentUser ? currentUser._id : '',
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
      url: '/evaluation-form',
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units',
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary',
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
            },
          },
        },
      },
    },
  });

  return (
    <div className='evaluationForm__wrapper'>
      <section className='evaluationForm__container'>
        <Stepper activePage={1} totalPages={4} data={stepperData} />
        <h1>Lisää asiakkaan tiedot</h1>

        {/* Customer information form */}
        <form onSubmit={handleSubmit}>
          <div className='form__firstName'>
            <label>Etunimi *</label>
            <input
              id='firstName'
              className='form-input'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='form__lastName'>
            <label>Sukunimi *</label>
            <input
              id='lastName'
              className='form-input'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='form__email'>
            <label>Sähköposti *</label>
            <input
              id='email'
              type='email'
              className='form-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form__startDate'>
            <label className='form_text'>Asiakkuuden aloituspäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker
                  id='startDate'
                  format='DD.MM.YYYY'
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  /* sx={{
                    '.MuiOutlinedInput-root':{
                      position:'relative',
                      zIndex:'-1',
                    }
                  }} */
                />
              </ThemeProvider>
            </LocalizationProvider>
            <label className='form_text'>Asiakkuuden lopetuspäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker
                  id='endDate'
                  format='DD.MM.YYYY'
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate} // Set minDate to startDate
                  /*  sx={{
                    '.MuiOutlinedInput-root':{
                      position:'relative',
                      zIndex:'-1',
                    }
                  }} */
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
                  /*  sx={{
                    '.MuiOutlinedInput-root':{
                      position:'relative',
                      zIndex:'-1',
                    }
                  }} */
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__tasks'>
            <label className='form_text'>Työtehtäväsi *</label>
            <textarea
              id='workTasks'
              className='form-input'
              value={workTasks}
              onChange={(e) => setWorkTasks(e.target.value)}
            />
          </div>
          <div className='form__goals'>
            <label className='form_text'>Omat tavoitteesi *</label>
            <textarea
              id='workGoals'
              className='form-input'
              value={workGoals}
              onChange={(e) => setWorkGoals(e.target.value)}
            />
          </div>
        </form>

        <PageNavigationButtons
          handleBack={handleBack}
          handleForward={handleSubmit}
          showForwardButton={true}
          hideBackButton={true}
        />
      </section>
      <div>
        <div>
          <NotificationModal
            type='warning'
            title={
              <Typography
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginRight: '25px',
                }}
              >
                Lomakkeen lähetys epäonnistui{' '}
              </Typography>
            }
            body={
              <div style={{ padding: '10px' }}>
                <Typography style={{ fontSize: '14px' }}>
                  Täytä kaikki vaaditut kentät ja tarkasta valinnat.
                </Typography>
              </div>
            }
            open={openNotificationModalAllFields}
            handleClose={handleCloseAllFields}
          />
        </div>
      </div>
      <NotificationModal
        type='warning'
        title={
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginRight: '25px',
            }}
          >
            Lomakkeen lähetys epäonnistui{' '}
          </Typography>
        }
        body={
          <div style={{ padding: '10px' }}>
            <Typography style={{ fontSize: '14px' }}>
              Tarkista seuraavat kentät: sähköposti.
            </Typography>
          </div>
        }
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
      <NotificationModal
        type='alert'
        title='Varoitus: Lomakkeen tiedot menetetään'
        body='Oletko varma, että haluat poistua sivulta?'
        open={showWarningModal}
        handleClose={handleCancelBack}
        handleConfirm={handleConfirmBack}
      />
    </div>
  );
}

export default EvaluationForm;
