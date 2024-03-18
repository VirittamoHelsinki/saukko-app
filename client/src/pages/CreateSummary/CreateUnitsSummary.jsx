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
  const { degreeId } = useParams();
  const [degreeDetails, setDegreeDetails] = useState(null);
  // console.log('🚀 ~ CreateUnitesSummary ~ degreeDetails:', degreeDetails);
  const [unitId, setUnitId] = useState(null);
  const [assessmentId, setAssessmentUnitId] = useState(null);

  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [notificationError, setNotificationError] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseUnit, setResponseUnit] = useState(null);
  const [responseATVAndCriteria, setResponseATVAndCriteria] = useState(null);
  const { setAllInternalDegrees } = useContext(InternalApiContext);
  const closeSuccess = () => setNotificationSuccess(false);
  const closeError = () => setNotificationError(false);

  // Modal
  const [isDegreeNameModalOpen, setIsDegreeNameModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState(false);

  const handleUnitClick = (unitId) => {
    console.log('Clicked unit ID:', unitId);
    setUnitId(unitId);
  };

  const handleATVClick = (assessmentId) => {
    console.log('Clicked ATV ID:', assessmentId);
    setAssessmentUnitId(assessmentId);
  };

  const handleCloseDegreeNameModal = () => {
    setIsDegreeNameModalOpen(false);
  };

  const handleCloseUnitModal = () => {
    setIsUnitModalOpen(false);
  };

  const handleCloseAssessmentModal = () => {
    setIsAssessmentModalOpen(false);
  };

  const handleCloseDeleteDataModal = () => {
    setIsDeleteDataModalOpen(false);
  };

  const handlePenClick = (area) => {
    switch (area) {
      case 'degreeDetails':
        setIsDegreeNameModalOpen(true);
        break;
      case 'unitName':
        setIsUnitModalOpen(true);
        break;
      case 'atv':
        setIsAssessmentModalOpen(true);
        break;
      // Add more cases for different areas as needed
      default:
      // Handle default case if necessary
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDataModalOpen(true);
    console.log('Delete button clicked');
  };

  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find(
      (degree) => degree._id === degreeId
    );
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);

  // Save the updated degree name to the database
  const saveDegreeName = async () => {
    // Extract only the necessary fields to update
    const degreeData = {
      ...degreeDetails,
      name: {
        // ...degreeDetails.name,
        fi: degreeDetails.name.fi,
      },
    };

    console.log('Data for put request:', degreeData);

    // Send put request
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
    // console.log('🚀 ~ saveDegreeName ~ degreeDetails:', degreeDetails);

    // Save the updated degree to context
    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegree,
    ]);

    // setAllInternalDegrees([...allInternalDegrees, response])
  };

  // Save the updated unit name to the database
  const saveUnitName = async () => {
    // Extract only the necessary fields to update
    const updatedUnits = degreeDetails.units.map((unit) => {
      if (unit._id === unitId) {
        return {
          ...unit,
          name: {
            ...unit.name,
            fi: unit.name.fi,
          },
        };
      }
      return unit;
    });

    const unitData = {
      ...degreeDetails,
      units: updatedUnits,
    };

    // console.log('Unit data for put request:', unitData);
    const responseUnit = await updateDegree(`${degreeId}`, unitData);

    console.log('🚀 ~ saveUnitName ~ responseUnit:', responseUnit);

    // Save response to state
    setResponseUnit(responseUnit);
    setIsUnitModalOpen(false);

    // Update the units name.fi field in the local state
    const updatedDegree = {
      ...degreeDetails,
      units: updatedUnits,
    };
    console.log('🚀 ~ saveUnitName ~ degreeDetails:', degreeDetails);

    // Save the updated degree to context
    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegree,
    ]);
  };

  // Save the updated ATV and criteria to the database
  const saveATVAndCriteria = async () => {
    // Extract only the necessary fields to update
    const updatedUnits = degreeDetails.units.map((unit) => {
      if (unit._id === unitId) {
        return {
          ...unit,
          assessments: unit.assessments.map((assessment) => {
            if (assessment._id === assessmentId) {
              return {
                ...assessment,
                name: {
                  ...assessment.name,
                  fi: assessment.name.fi,
                },
                criteria: assessment.criteria.map((c) => {
                  return {
                    ...c,
                    fi: c.fi,
                  };
                }),
                // criteria: [
                //   {
                //     ...assessment.criteria[0],
                //     fi: assessment.criteria[0].fi,
                //   },
                // ],
              };
            }
            return assessment;
          }),
        };
      }
      return unit;
    });

    const unitData = {
      ...degreeDetails,
      units: updatedUnits,
    };

    console.log('Unit data for put request:', unitData);
    const responseATVAndCriteria = await updateDegree(`${degreeId}`, unitData);

    console.log(
      '🚀 ~ saveUnitName ~ responseUnit: ATV and criteria',
      responseATVAndCriteria
    );

    // Save response to state
    setResponseATVAndCriteria(responseATVAndCriteria);
    setIsAssessmentModalOpen(false);

    // Update the units name.fi field in the local state
    const updatedDegree = {
      ...degreeDetails,
      units: updatedUnits,
    };
    console.log('🚀 ~ saveUnitName ~ degreeDetails:', degreeDetails);

    // Save the updated degree to context
    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegree,
    ]);
  };

  // Trigger NotificationModal for successful update the degree name
  useEffect(() => {
    if (
      response &&
      allInternalDegrees.some((degree) => degree._id === response._id)
    ) {
      setNotificationSuccess(true);
    } else if (response) {
      setNotificationError(true);
      console.log('Error updating degree name:', response);
    }
  }, [allInternalDegrees, response]);

  // Trigger NotificationModal for successful update the unit name
  useEffect(() => {
    if (
      responseUnit &&
      allInternalDegrees.some((degree) => degree._id === responseUnit._id)
    ) {
      setNotificationSuccess(true);
    } else if (responseUnit) {
      setNotificationError(true);
      console.log('Error updating unit name:', responseUnit);
    }
  }, [allInternalDegrees, responseUnit]);

  // Trigger NotificationModal for successful update the ATV and Criteria
  useEffect(() => {
    if (
      responseATVAndCriteria &&
      allInternalDegrees.some(
        (degree) => degree._id === responseATVAndCriteria._id
      )
    ) {
      setNotificationSuccess(true);
    } else if (responseATVAndCriteria) {
      setNotificationError(true);
      console.log('Error updating unit name:', responseATVAndCriteria);
    }
  }, [allInternalDegrees, responseATVAndCriteria]);

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
                <Icon
                  icon='uil:pen'
                  color='#0000bf'
                  onClick={() => handlePenClick('degreeDetails')}
                />
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
                    onClick={handleDeleteClick}
                    icon='material-symbols:delete-outline'
                    color='A0A0A0'
                    height='18'
                    preserveAspectRatio='xMinYMid meet'
                  />
                </div>
                <div className='circle-wrap-icon'>
                  <span>
                    <Icon
                      onClick={() => {
                        handlePenClick('unitName');
                        handleUnitClick(unit._id);
                      }}
                      icon='uil:pen'
                      color='#0000bf'
                      height='18'
                      preserveAspectRatio='xMinYMid meet'
                    />
                    {/* Here starts the nested modal where unit's name, ATV and criteria can be saved to the database */}
                    {unit._id && unit._id === unitId && isUnitModalOpen && (
                      // Modal for editing unit's name and ATV
                      <NotificationModal
                        type='info'
                        open={isUnitModalOpen}
                        onClose={handleCloseUnitModal}
                        hideIcon={true}
                        dialogStyles={{
                          dialogTitle: {
                            marginLeft: '5px',
                          },
                        }}
                        title={
                          <Typography
                            sx={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              marginRight: '25px',
                              marginLeft: '15px',
                            }}
                          >
                            Tutkinnonosan muokkaus
                          </Typography>
                        }
                        // sx={{ width: '100%' }}
                        body={
                          <>
                            <IconButton
                              aria-label='close'
                              onClick={handleCloseUnitModal}
                              sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'black',
                                marginLeft: '2rem',
                              }}
                            >
                              <CancelOutlinedIcon />
                            </IconButton>
                            <DialogContent>
                              <Box>
                                {/* Degree unit's name */}
                                <Typography
                                  sx={{ fontSize: '15px', fontWeight: 'bold' }}
                                >
                                  Tutkinnonosan nimi
                                </Typography>
                                <TextField
                                  key={index}
                                  value={
                                    unit._id === unitId ? unit.name.fi : ''
                                  }
                                  id='outlined-multiline-static'
                                  multiline={unit.name.fi.length > 5}
                                  onChange={(event) => {
                                    // Modify unit name TextField value changes
                                    setDegreeDetails((prevState) => ({
                                      ...prevState,
                                      units: prevState.units?.map((u) => {
                                        if (u._id === unitId) {
                                          return {
                                            ...u,
                                            name: {
                                              ...u.name,
                                              fi: event.target.value,
                                            },
                                          };
                                        }
                                        return u;
                                      }),
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
                                    marginBottom: '30px',
                                    width: '50%',
                                    backgroundColor: '#0000BF',
                                    color: 'white',
                                    border: 'none',
                                  }}
                                  onClick={saveUnitName}
                                ></Button>

                                {/* Degree unit's ATV */}
                                <Typography
                                  sx={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  Ammattitatitovaatimukset ja kriteerit
                                </Typography>
                              </Box>
                              <Box>
                                <Box
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: '100px',
                                  }}
                                >
                                  {unit.assessments &&
                                    unit.assessments.map(
                                      (assessment, index) => (
                                        <div
                                          key={index}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              backgroundColor: 'white',
                                              padding: '16px',
                                              marginTop: '8px',
                                              flexGrow: 1, // To make the text take up remaining space
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                            }}
                                          >
                                            <span>
                                              {index + 1}. {assessment.name.fi}
                                            </span>
                                            <span
                                              style={{
                                                display: 'flex',
                                                gap: '10px',
                                              }}
                                            >
                                              <Icon
                                                onClick={handleDeleteClick}
                                                icon='material-symbols:delete-outline'
                                                color='A0A0A0'
                                                height='20'
                                                gap='16px'
                                                preserveAspectRatio='xMinYMid meet'
                                              />
                                              <Icon
                                                onClick={() => {
                                                  handlePenClick('atv');
                                                  handleATVClick(
                                                    assessment._id
                                                  );
                                                }}
                                                icon='uil:pen'
                                                color='#0000bf'
                                                height='18'
                                                preserveAspectRatio='xMinYMid meet'
                                              />

                                              {assessment._id &&
                                                assessment._id ===
                                                  assessmentId &&
                                                isAssessmentModalOpen && (
                                                  // Modal for ATV and criteria
                                                  <NotificationModal
                                                    type='info'
                                                    open={isAssessmentModalOpen}
                                                    onClose={
                                                      handleCloseAssessmentModal
                                                    }
                                                    hideIcon={true}
                                                    dialogStyles={{
                                                      dialogTitle: {
                                                        marginLeft: '5px',
                                                      },
                                                    }}
                                                    title={
                                                      <Typography
                                                        sx={{
                                                          fontSize: '16px',
                                                          fontWeight: 'bold',
                                                          marginRight: '25px',
                                                          marginLeft: '15px',
                                                        }}
                                                      >
                                                        Ammattitaitovaatimuksen
                                                        muokkaus
                                                      </Typography>
                                                    }
                                                    sx={{ minWidth: '100%' }}
                                                    body={
                                                      <>
                                                        <IconButton
                                                          aria-label='close'
                                                          onClick={
                                                            handleCloseAssessmentModal
                                                          }
                                                          sx={{
                                                            position:
                                                              'absolute',
                                                            right: 8,
                                                            top: 8,
                                                            color: 'black',
                                                            marginLeft: '2rem',
                                                          }}
                                                        >
                                                          <CancelOutlinedIcon />
                                                        </IconButton>
                                                        <DialogContent>
                                                          <Box>
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  '17px',
                                                                fontWeight:
                                                                  'bold',
                                                                marginBottom:
                                                                  '10px',
                                                              }}
                                                            >
                                                              {unit.name.fi}
                                                            </Typography>
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  '15px',
                                                                fontWeight:
                                                                  'bold',
                                                              }}
                                                            >
                                                              Ammattitaitovaatimuksen
                                                              nimi
                                                            </Typography>
                                                            <TextField
                                                              key={
                                                                assessment._id
                                                              }
                                                              value={
                                                                assessment._id ===
                                                                assessmentId
                                                                  ? assessment
                                                                      .name.fi
                                                                  : ''
                                                              }
                                                              id='outlined-multiline-static'
                                                              multiline={
                                                                assessment.name
                                                                  .fi.length >
                                                                10
                                                              }
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                setDegreeDetails(
                                                                  (
                                                                    prevState
                                                                  ) => ({
                                                                    ...prevState,
                                                                    units:
                                                                      prevState.units?.map(
                                                                        (u) => {
                                                                          if (
                                                                            u._id ===
                                                                            unitId
                                                                          ) {
                                                                            return {
                                                                              ...u,
                                                                              assessments:
                                                                                u.assessments?.map(
                                                                                  (
                                                                                    a
                                                                                  ) => {
                                                                                    if (
                                                                                      a._id ===
                                                                                      assessmentId
                                                                                    ) {
                                                                                      return {
                                                                                        ...a,
                                                                                        name: {
                                                                                          ...a.name,
                                                                                          fi: event
                                                                                            .target
                                                                                            .value,
                                                                                        },
                                                                                      };
                                                                                    }
                                                                                    return a;
                                                                                  }
                                                                                ),
                                                                            };
                                                                          }
                                                                          return u;
                                                                        }
                                                                      ),
                                                                  })
                                                                );
                                                              }}
                                                              sx={{
                                                                '& .MuiOutlinedInput-root':
                                                                  {
                                                                    '& fieldset':
                                                                      {
                                                                        borderRadius:
                                                                          '0',
                                                                        // border: 'black 2px solid',
                                                                        borderColor:
                                                                          'black',
                                                                        borderWidth:
                                                                          '1px',
                                                                      },
                                                                  },
                                                                width: '100%',
                                                                backgroundColor:
                                                                  'white',
                                                                marginTop:
                                                                  '8px',
                                                                overflow:
                                                                  'auto',
                                                              }}
                                                            ></TextField>
                                                            <Typography
                                                              sx={{
                                                                fontSize:
                                                                  '15px',
                                                                fontWeight:
                                                                  'bold',
                                                                marginTop:
                                                                  '20px',
                                                              }}
                                                            >
                                                              Kriteerit
                                                            </Typography>
                                                            <TextField
                                                              value={
                                                                assessment._id ===
                                                                  assessmentId &&
                                                                assessment.criteria &&
                                                                assessment
                                                                  .criteria[0]
                                                                  ? assessment
                                                                      .criteria[0]
                                                                      .fi
                                                                  : ''
                                                              }
                                                              id='outlined-multiline-static'
                                                              multiline
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                setDegreeDetails(
                                                                  (
                                                                    prevState
                                                                  ) => ({
                                                                    ...prevState,
                                                                    units:
                                                                      prevState.units?.map(
                                                                        (u) => {
                                                                          if (
                                                                            u._id ===
                                                                            unitId
                                                                          ) {
                                                                            return {
                                                                              ...u,
                                                                              assessments:
                                                                                u.assessments?.map(
                                                                                  (
                                                                                    a
                                                                                  ) => {
                                                                                    if (
                                                                                      a._id ===
                                                                                      assessmentId
                                                                                    ) {
                                                                                      return {
                                                                                        ...a,
                                                                                        criteria:
                                                                                          [
                                                                                            {
                                                                                              ...a
                                                                                                .criteria[0],
                                                                                              fi: event
                                                                                                .target
                                                                                                .value,
                                                                                            },
                                                                                          ],
                                                                                      };
                                                                                    }
                                                                                    return a;
                                                                                  }
                                                                                ),
                                                                            };
                                                                          }
                                                                          return u;
                                                                        }
                                                                      ),
                                                                  })
                                                                );
                                                              }}
                                                              sx={{
                                                                '& .MuiOutlinedInput-root':
                                                                  {
                                                                    '& fieldset':
                                                                      {
                                                                        borderRadius:
                                                                          '0',
                                                                        // border: 'black 2px solid',
                                                                        borderColor:
                                                                          'black',
                                                                        borderWidth:
                                                                          '1px',
                                                                      },
                                                                  },
                                                                width: '100%',
                                                                backgroundColor:
                                                                  'white',
                                                                marginTop:
                                                                  '8px',
                                                                overflow:
                                                                  'auto',
                                                              }}
                                                            ></TextField>
                                                            <Button
                                                              text='Tallenna'
                                                              variant='contained'
                                                              style={{
                                                                marginLeft:
                                                                  '25%',
                                                                marginTop:
                                                                  '30px',
                                                                marginBottom:
                                                                  '30px',
                                                                width: '50%',
                                                                backgroundColor:
                                                                  '#0000BF',
                                                                color: 'white',
                                                                border: 'none',
                                                              }}
                                                              onClick={
                                                                saveATVAndCriteria
                                                              }
                                                            ></Button>
                                                          </Box>
                                                        </DialogContent>
                                                      </>
                                                    }
                                                  />
                                                )}
                                            </span>
                                          </Box>
                                        </div>
                                      )
                                    )}

                                  <Box
                                    style={{
                                      marginTop: '-18px',
                                      display: 'flex',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    <Icon
                                      icon='bxs:plus-circle'
                                      width='2.2rem'
                                      height='2.2rem'
                                      color='#0000BF'
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </DialogContent>
                          </>
                        }
                      />
                    )}
                    {/* Here finish the neste modal */}
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
                onClick={handlePenClick}
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
                  onClick={handlePenClick}
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
          dialogStyles={{
            dialogTitle: {
              marginLeft: '4px',
              marginRight: '5px',
            },
          }}
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
                  marginLeft: '2rem',
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

        {/* Modal to delete the data */}
        <NotificationModal
          type='iconInfo'
          hideIcon={true}
          hideCloseButton={true}
          title={
            <Box>
              <Typography
                sx={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  marginRight: '10px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                Olet arkistoinnissa tietoa joka liittyy 2 työnantajaan.
              </Typography>
              <Typography
                sx={{
                  paddingTop: '10px',
                  marginBottom: '10px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                Oletko varma?
              </Typography>
            </Box>
          }
          open={isDeleteDataModalOpen}
          dialogStyles={{
            dialogPaper: {
              borderLeft: 'none',
              padding: '0 1.6rem',
            },
            dialogTitle: {
              testAlign: 'center',
            },
          }}
          body={
            <Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                }}
              >
                <Button
                  text='Peruuta'
                  variant='contained'
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #1A1A1A',
                    marginRight: '20px',
                  }}
                  onClick={handleCloseDeleteDataModal}
                ></Button>
                <Button
                  text='Arkistoi'
                  variant='contained'
                  style={{
                    backgroundColor: '#B01038',
                    color: 'white',
                    border: 'none',
                  }}
                  onClick={handleCloseDeleteDataModal}
                ></Button>
              </Box>
            </Box>
          }
          handleClose={handleCloseDeleteDataModal}
        />

        {/* Notification for successfully update the data */}
        <NotificationModal
          type='success'
          title='Tiedot tallennettu'
          body='Tutkinto on tallennettu tietokantaan'
          open={notificationSuccess}
          handleClose={closeSuccess}
        />

        {/* Notification error */}
        <NotificationModal
          type='warning'
          title='Lomakkeen lähetys epäonnistui'
          open={notificationError}
          handleClose={closeError}
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
