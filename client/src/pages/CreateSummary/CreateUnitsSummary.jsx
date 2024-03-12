import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import { Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Box from '@mui/material/Box';
import Button from '../../components/Button/Button';
import { updateDegree } from '../../api/degree';
import InternalApiContext from '../../store/context/InternalApiContext';

const CreateUnitesSummary = ({ allInternalDegrees }) => {
  const navigate = useNavigate();
  const params = useParams();
  // console.log('🚀 ~ DegreeDetail ~ allInternalDegrees:', allInternalDegrees);
  const { degreeId } = useParams();
  // console.log('🚀 ~ DegreeDetail ~ degreeId:', degreeId);
  const [degreeDetails, setDegreeDetails] = useState(null);
  // console.log('🚀 ~ DegreeDetail ~ degreeDetails:', degreeDetails);
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [response, setResponse] = useState(null);
  const { setAllInternalDegrees } = useContext(InternalApiContext);
  const closeSuccess = () => setNotificationSuccess(false);

  // Modal
  const [isDegreeNameModalOpen, setIsDegreeNameModalOpen] = useState(false);

  const handleCloseDegreeNameModal = () => {
    setIsDegreeNameModalOpen(false);
  };

  const handlePenClick = () => {
    setIsDegreeNameModalOpen(true);
  };

  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find(
      (degree) => degree._id === degreeId
    );
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);

  const saveDegreeName = async () => {
    // Extract only the necessary fields to update
    const degreeData = {
      ...degreeDetails,
      name: {
        // ...degreeDetails.name,
        fi: degreeDetails.name.fi,
      },
    };

    console.log('Data for post request:', degreeData);

    // Send post request
    const response = await updateDegree(`${degreeId}`, degreeData);
    console.log('response', response);

    // Save response to state
    setResponse(response);
    setIsDegreeNameModalOpen(false);

    // Update the degree's name.fi field in the local state
    const updatedDegree = {
      ...degreeDetails,
      name: {
        ...degreeDetails.name.fi,
        fi: degreeDetails.name.fi,
      },
    };
    console.log('🚀 ~ saveDegreeName ~ degreeDetails:', degreeDetails);

    // Save the updated degree to context
    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegree,
    ]);

    // setAllInternalDegrees([...allInternalDegrees, response])
  };

  // Trigger NotificationModal
  useEffect(() => {
    if (
      response &&
      allInternalDegrees.some((degree) => degree._id === response._id)
    ) {
      setNotificationSuccess(true);
    } else if (response) {
      // setNotificationError(true);
      console.log('Error updating degree name:', response);
    }
  }, [allInternalDegrees, response]);

  // trigger to fetch updated data in `/degrees/add` 

  useEffect(() => {
    const fetchUpdatedDegree = async () => {
      const updatedDegree = await updateDegree(degreeId);
      setDegreeDetails(updatedDegree);
      console.log("🚀 ~ fetchUpdatedDegree ~ updatedDegree:", updatedDegree)

    };
    fetchUpdatedDegree();
  }, [response]);

  if (!degreeDetails) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    if (!dateString) {
      return 'No date available';
    }

    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI'); // Adjust the locale as needed
  }

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
      <section className='summary__container'>
        <div className='degree-summary'>
          <h1 className='degree-title '>
            {degreeDetails.name?.fi}{' '}
            <span className='icon-wrapper'>
              {' '}
              <div>
                <Icon icon='uil:pen' color='#0000bf' onClick={handlePenClick} />
              </div>
            </span>
          </h1>
        </div>
        <div className='section-title'>Tutkinnonosat ja tehtävät</div>
        <div className='summary__container--box'>
          {/* Display other degree details as needed */}
          {degreeDetails.units.map((unit, index) => (
            <div key={index} className='unit-container'>
              <div className='unit-name-icons-container'>
                <strong className='unit-title'>{unit.name.fi}</strong>
                <div className='circle-wrap-icon'>
                  <Icon
                    icon='material-symbols:delete-outline'
                    color='A0A0A0'
                    height='18'
                    preserveAspectRatio='xMinYMid meet'
                  />
                </div>
                <div className='circle-wrap-icon'>
                  <span>
                    <Icon
                      // onClick={handlePenClick}
                      icon='uil:pen'
                      color='#0000bf'
                      height='18'
                      preserveAspectRatio='xMinYMid meet'
                    />
                  </span>
                </div>
              </div>
              {unit.assessments &&
                unit.assessments.map((assessment, assessmentIndex) => (
                  <p key={assessmentIndex}>
                    {assessmentIndex + 1}. {assessment.name?.fi}
                  </p>
                ))}
            </div>
          ))}
        </div>
        <div className='section-title'>Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box unit-description'>
          <div className='description-content'>
            {degreeDetails.description.fi ? (
              degreeDetails.description.fi
            ) : (
              <p>No description data.</p>
            )}
          </div>
          <div>
            <div className='circle-wrap-icon'>
              <Icon
                // onClick={handlePenClick}
                icon='uil:pen'
                color='#0000bf'
                height='18'
                preserveAspectRatio='xMinYMid meet'
              />
            </div>
          </div>
        </div>
        <div className='section-title'>Tutkintotiedot</div>
        <ul className='summary__container--box'>
          <div className='unit-name-icons-container'>
            <strong className='unit-title'>Määräyksen diaarinumero</strong>{' '}
            <div>
              <div className='circle-wrap-icon'>
                <Icon
                  // onClick={handlePenClick}
                  icon='uil:pen'
                  color='#0000bf'
                  height='18'
                  preserveAspectRatio='xMinYMid meet'
                />
              </div>
            </div>
          </div>
          <li>{formatDate(degreeDetails.diaryNumber)}</li>
          <strong> Määräyksen päätöspäivämäärä</strong>
          <li>{formatDate(degreeDetails.regulationDate)}</li>
          <strong>Voimaantulo</strong>
          <li>{formatDate(degreeDetails.validFrom)}</li>
          <strong>Voimassaolon päättyminen</strong>
          <li>{formatDate(degreeDetails.expiry)}</li>
          <strong>Siirtymäajan päättymisaika</strong>
          <li>{formatDate(degreeDetails.transitionEnds)}</li>
        </ul>

        {/* Modal to save the degree name */}
        <NotificationModal
          type='info'
          title={
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginRight: '25px',
                marginLeft: '15px',
              }}
            >
              Tutkinnon nimen muokkaus
            </Typography>
          }
          sx={{ width: '100%' }}
          hideIcon={true}
          body={
            <>
              <IconButton
                aria-label='close'
                onClick={handleCloseDegreeNameModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'black',
                }}
              >
                <CancelOutlinedIcon />
              </IconButton>
              <DialogContent sx={{ minWidth: '25vw' }}>
                <Box sx={{}}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Tutkinnon nimi
                  </Typography>
                  <TextField
                    value={degreeDetails.name.fi}
                    id='outlined-multiline-static'
                    multiline={degreeDetails.name.fi.length > 5}
                    onChange={(event) => {
                      // Modify degreeDetails.name.fi when TextField value changes
                      setDegreeDetails((prevState) => ({
                        ...prevState,
                        name: {
                          ...prevState.name,
                          fi: event.target.value,
                        },
                      }));
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderRadius: '0',
                          // border: 'black 2px solid',
                          borderColor: 'black',
                          borderWidth: '1px',
                        },
                      },
                      width: '100%',
                      backgroundColor: 'white',
                      marginTop: '8px',
                      overflow: 'auto',
                    }}
                  ></TextField>
                  <Button
                    text='Tallenna'
                    variant='contained'
                    style={{
                      marginLeft: '25%',
                      marginTop: '30px',
                      width: '50%',
                      backgroundColor: '#0000BF',
                      color: 'white',
                      border: 'none',
                    }}
                    onClick={saveDegreeName}
                    handleClose={handleCloseDegreeNameModal}
                  ></Button>
                </Box>
              </DialogContent>
            </>
          }
          open={isDegreeNameModalOpen}
          handleClose={handleCloseDegreeNameModal}
        />

        {/* Notification for successfully update the data */}
        <NotificationModal
          type='success'
          title='Tiedot tallennettu'
          body='Tutkinto on tallennettu tietokantaan'
          open={notificationSuccess}
          handleClose={closeSuccess}
          // redirectLink='/degrees/add'
        />

        <div className='page-navigation-container'>
          <PageNavigationButtons
            handleBackText={'Takaisin'}
            handleBack={() => navigate(`/degrees/add`)}
            showForwardButton={false}
            icon={'mingcute:pencil-line'}
            style={{ justifyContent: 'flex-start' }}
          />
        </div>
      </section>
      <UserNav />
    </main>
  );
};

export default CreateUnitesSummary;
