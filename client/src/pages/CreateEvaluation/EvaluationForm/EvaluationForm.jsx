import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

// Import MUI
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function EvaluationForm() {
  const navigate = useNavigate();

  // State variables to track form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [startDate, setStartDate] = useState(dayjs().format('DD.MM.YYYY'));
  const [endDate, setEndDate] = useState(dayjs().format('DD.MM.YYYY'));
  const [extensionEndDate, setExtensionEndDate] = useState(dayjs().format('DD.MM.YYYY'));
  const [workTasks, setWorkTasks] = useState('');
  const [workGoals, setWorkGoals] = useState('');

     // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the user object
    const user = {
      firstName,
      lastName,
      email,
    };

    // Create the evaluation object
    const evaluation = {
      startDate,
      endDate,
      workTasks,
      workGoals,
    };

    // Do something with the user and evaluation objects (e.g., save them to a database)
    console.log('User:', user);
    console.log('Evaluation:', evaluation);

    // Navigate to the next page (or perform other actions)
    // navigate(`/evaluation-workplace`);
  };

  const currentDate = dayjs().format('DD.MM.YYYY');

  // Calendar pop up styling
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
        <div>Stepper here (waiting for update)</div>
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
                  slotProps={{ 
                    textField: { placeholder: currentDate },
                  }}
                  value={startDate}
                  onChange={(date) => setStartDate(date.toISOString())}
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
                  slotProps={{ 
                    textField: { placeholder: currentDate },
                  }}
                  value={endDate}
                  onChange={(date) => setEndDate(date.toISOString())}
                />
              </ThemeProvider>
            </LocalizationProvider>
          </div>
          <div className='form__extensionEndDate'>
            <label>Täydennysjakson päättymispäivä *</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider theme={theme}>
                <DesktopDatePicker 
                  format='DD.MM.YYYY'
                  slotProps={{ 
                    textField: { placeholder: currentDate },
                  }}
                  value={extensionEndDate}
                  onChange={(date) => setExtensionEndDate(date.toISOString())}
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

        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ handleForward={handleSubmit} forwardButtonText={'Seuraava'} />
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationForm;
