import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { Icon } from '@iconify/react';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import { updateDegree } from '../../api/degree';
import InternalApiContext from '../../store/context/InternalApiContext';
import DegreeInformationModal from '../../components/EditDegreeModals/DegreeInformationModal';
import DegreeNameModal from '../../components/EditDegreeModals/DegreeNameModal';
import UnitInformationModal from '../../components/EditDegreeModals/UnitInformationModal';
import DegreeDescriptionModal from '../../components/EditDegreeModals/DegreeDescriptionModal';
import DeleteDataModal from '../../components/EditDegreeModals/DeleteDataModal';
import styles from './createUnitSummary.module.scss'
import classNames from 'classnames';
import { LinearProgress, Box } from '@mui/material';
import useHeadingStore from '../../store/zustand/useHeadingStore';

const CreateUnitesSummary = ({ allInternalDegrees }) => {
  const navigate = useNavigate();
  const { setHeading, setSubHeading, setSiteTitle } = useHeadingStore();

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
  const [responseDegreeDescription, setResponseDegreeDescription] = useState(null);
  const [responseDegreeInformation, setResponseDegreeInformation] =
    useState(null);
  const { setAllInternalDegrees } = useContext(InternalApiContext);
  const closeSuccess = () => setNotificationSuccess(false);
  const closeError = () => setNotificationError(false);

  // Modal
  const [isDegreeNameModalOpen, setIsDegreeNameModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState(false);
  const [isDegreeInformationModalOpen, setIsDegreeInformationModalOpen] =
    useState(false);
  const [isDegreeDescriptionModalOpen, setIsDegreeDescriptionModalOpen] = useState(false);

  // linear progress with label
  const [progress, setProgress] = useState(0);

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

  const handleCloseDegreeDescriptionModal = () => {
    setIsDegreeDescriptionModalOpen(false);
  }

  const handleCloseDegreeInformationModal = () => {
    setIsDegreeInformationModalOpen(false);
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
      case 'degreeDescription':
        setIsDegreeDescriptionModalOpen(true);
        break;
      case 'degreeInformation':
        setIsDegreeInformationModalOpen(true);
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
    setHeading("Tutkintojen hallinta"), setSubHeading("Muokkaa tukintoa"), setSiteTitle("Tutkintojen hallinta");
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find(
      (degree) => degree._id === degreeId
    );
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId, setHeading, setSiteTitle, setSubHeading]);

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

  // Save the updated degree.description.fi to the database
  const saveDegreeDescription = async () => {
    const saveDegreeDescriptionData = {
      ...degreeDetails,
      description: {
        fi: degreeDetails.description.fi,
      },
    };

    console.log('Data for put request:', saveDegreeDescriptionData);

    const responseDegreeDescription = await updateDegree(`${degreeId}`, saveDegreeDescriptionData);
    console.log('response', responseDegreeDescription);

    // Save response to state
    setResponseDegreeDescription(responseDegreeDescription);
    setIsDegreeDescriptionModalOpen(false);

    //Update the degree's description.fi field in the local state
    const updatedDegreeDescription = {
      ...degreeDetails,
      description: {
        ...degreeDetails.description.fi,
        fi: degreeDetails.description.fi,
      },
    };
    console.log('saveDegreeDescription:', degreeDetails.description.fi);

    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegreeDescription,
    ])

  };


  // Save degree's general information to the database
  const saveDegreeInformation = async () => {
    // Extract only the necessary fields to update
    const degreeData = {
      ...degreeDetails,
      diaryNumber: degreeDetails.diaryNumber,
      regulationDate: degreeDetails.regulationDate,
      validFrom: degreeDetails.validFrom,
      expiry: degreeDetails.expiry,
      transitionEnds: degreeDetails.transitionEnds,
    };

    console.log('Data for put request:', degreeData);

    // Send put request
    const responseDegreeInformation = await updateDegree(
      `${degreeId}`,
      degreeData
    );
    console.log('response Information degree', responseDegreeInformation);

    // Save response to state
    setResponseDegreeInformation(responseDegreeInformation);
    setIsDegreeInformationModalOpen(false);

    // Update the degree's name.fi field in the local state
    const updatedDegree = {
      ...degreeDetails,

      diaryNumber: degreeDetails.diaryNumber,
      regulationDate: degreeDetails.regulationDate,
      validFrom: degreeDetails.validFrom,
      expiry: degreeDetails.expiry,
      transitionEnds: degreeDetails.transitionEnds,
    };

    // Save the updated degree to context
    setAllInternalDegrees([
      ...allInternalDegrees.filter(
        (d) => d._id.toString() !== degreeDetails._id.toString()
      ),
      updatedDegree,
    ]);
  };

  //useEffect notification modal duration
  useEffect(() => {
    let timer;
    let internal;

    if (notificationSuccess) {
      setProgress(0);
      timer = setTimeout(() => {
        closeSuccess();
      }, 10000);

      const startTime = Date.now();
      internal = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress((elapsed / 10000) * 100);
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(internal);
      };
    }
  }, [notificationSuccess]);

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

  // Trigger NotificationModal for successful update the degree.description.fi
  useEffect(() => {
    if (
      responseDegreeDescription && allInternalDegrees.some((degree) =>
        degree._id === responseDegreeDescription._id)
    ) {
      setNotificationSuccess(true);
    } else if (responseDegreeDescription) {
      setNotificationError(true);
      console.log('Error updating degree information:', responseDegreeDescription);
    }
  }, [allInternalDegrees, responseDegreeDescription])

  // Trigger NotificationModal for successful update the degree information
  useEffect(() => {
    if (
      responseDegreeInformation &&
      allInternalDegrees.some(
        (degree) => degree._id === responseDegreeInformation._id
      )
    ) {
      setNotificationSuccess(true);
    } else if (responseDegreeInformation) {
      setNotificationError(true);
      console.log(
        'Error updating degree information:',
        responseDegreeInformation
      );
    }
  }, [allInternalDegrees, responseDegreeInformation]);

  if (!degreeDetails) {
    return <div>Loading...</div>;
  }

  // function formatDate(dateString) {
  //   if (!dateString) {
  //     return 'No date available';
  //   }

  //   const date = new Date(dateString);
  //   console.log("🚀 ~ formatDate ~ date:", date)
  //   return date.toLocaleDateString('fi-FI'); // Adjust the locale as needed
  // }

  function formattedDate(dateString) {
    if (!dateString) {
      return 'No date available';
    }
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    // console.log('🚀 ~ formattedDate ~ formattedDate:', formattedDate);
    return formattedDate;
  }

  return (
    // summary__container
    <section className={styles.container}>
      <div className={styles.degreeSummary}>
        <h1 className={styles.degreeTitle}>
          {degreeDetails.name?.fi}{' '}
          <span className={styles.iconWrapper}>
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
      <div className={styles.sectionTitle}>Tutkinnonosat ja tehtävät</div>
      <div className={styles.box}>
        {/* Display other degree details as needed */}
        {degreeDetails.units.map((unit) => (
          <div key={unit._id} className={styles.unitContainer}>
            <div className={styles.unitNameIconsContainer}>
              <strong className={styles.unitTitle}>{unit.name.fi}</strong>
              <div className={styles.circleWrapIcon}>
                <Icon
                  onClick={handleDeleteClick}
                  icon='material-symbols:delete-outline'
                  color='A0A0A0'
                  height='18'
                  preserveAspectRatio='xMinYMid meet'
                />
              </div>
              <div className={styles.circleWrapIcon}>
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
                    <UnitInformationModal
                      degreeDetails={degreeDetails}
                      setDegreeDetails={setDegreeDetails}
                      handleCloseUnitModal={handleCloseUnitModal}
                      unit={unit}
                      unitId={unitId}
                      assessment={unit.assessments}
                      assessmentId={assessmentId}
                      saveATVAndCriteria={saveATVAndCriteria}
                      saveUnitName={saveUnitName}
                      isUnitModalOpen={isUnitModalOpen}
                      handlePenClick={handlePenClick}
                      handleATVClick={handleATVClick}
                      setAssessmentUnitId={setAssessmentUnitId}
                      isAssessmentModalOpen={isAssessmentModalOpen}
                      handleCloseAssessmentModal={handleCloseAssessmentModal}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
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
      <div className={styles.sectionTitle}>Tutkinnon suorittaneen osaaminen</div>
      <div className={classNames(styles.box, styles.unitDescription)}>
        <div className={styles.descriptionContent}>
          {degreeDetails.description.fi ? (
            degreeDetails.description.fi
          ) : (
            <p>No description data.</p>
          )}
        </div>
        <div>
          <div className={styles.circleWrapIcon}>
            <Icon
              onClick={() => {
                handlePenClick('degreeDescription');
              }}
              icon='uil:pen'
              color='#0000bf'
              height='18'
              preserveAspectRatio='xMinYMid meet'
            />
          </div>
        </div>
      </div>
      <div className={styles.sectionTitle}>Tutkintotiedot</div>
      <ul className={styles.box}>
        <div className={styles.unitNameIconsContainer}>
          <div className={styles.degreeDiaryNumber}>
            <strong className={styles.unitTitle}>Määräyksen diaarinumero</strong>{' '}
            <li>{degreeDetails.diaryNumber}</li>
          </div>
          {/* <div> */}
          <div className={styles.circleWrapIcon}>
            <Icon
              onClick={() => handlePenClick('degreeInformation')}
              icon='uil:pen'
              color='#0000bf'
              height='18'
              preserveAspectRatio='xMinYMid meet'
            />
          </div>
          {/* </div> */}
        </div>
        <strong> Määräyksen päätöspäivämäärä</strong>
        <li>{formattedDate(degreeDetails.regulationDate)}</li>
        <strong>Voimaantulo</strong>
        <li>{formattedDate(degreeDetails.validFrom)}</li>
        <strong>Voimassaolon päättyminen</strong>
        <li>{formattedDate(degreeDetails.expiry)}</li>
        <strong>Siirtymäajan päättymisaika</strong>
        <li>{formattedDate(degreeDetails.transitionEnds)}</li>
      </ul>

      {/* Modal to save the degree name */}
      <DegreeNameModal
        handleCloseDegreeNameModal={handleCloseDegreeNameModal}
        degreeDetails={degreeDetails}
        setDegreeDetails={setDegreeDetails}
        saveDegreeName={saveDegreeName}
        isDegreeNameModalOpen={isDegreeNameModalOpen}
      />

      {/* Modal for updating general degree's information */}
      <DegreeInformationModal
        handleCloseDegreeInformationModal={handleCloseDegreeInformationModal}
        degreeDetails={degreeDetails}
        setDegreeDetails={setDegreeDetails}
        saveDegreeInformation={saveDegreeInformation}
        isDegreeInformationModalOpen={isDegreeInformationModalOpen}
      />

      {/* Modal for updating degree's description*/}
      <DegreeDescriptionModal
        handleCloseDegreeDescriptionModal={handleCloseDegreeDescriptionModal}
        degreeDetails={degreeDetails}
        setDegreeDetails={setDegreeDetails}
        saveDegreeDescription={saveDegreeDescription}
        isDegreeDescriptionModalOpen={isDegreeDescriptionModalOpen}
      />
      {/* Modal to delete the data */}
      <DeleteDataModal
        isDeleteDataModalOpen={isDeleteDataModalOpen}
        handleCloseDeleteDataModal={handleCloseDeleteDataModal}
      />

      {/* Notification for successfully update the data */}
      <NotificationModal
        type='success'
        title='Tiedot tallennettu'
        body='Tutkinto on tallennettu OsTu-appin tietokantaan'
        open={notificationSuccess}
        handleClose={closeSuccess}
      />
      {notificationSuccess && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress value={progress} />
        </Box>
      )}

      {/* Notification error */}
      <NotificationModal
        type='warning'
        title='Lomakkeen lähetys epäonnistui'
        open={notificationError}
        handleClose={closeError}
      />
      <div className='alignLeft'>
        <PageNavigationButtons
          handleBackText={'Takaisin'}
          handleBack={() => navigate(`/degrees/add`)}
          showForwardButton={false}
          icon={'mingcute:pencil-line'}
          style={{ justifyContent: 'flex-start' }}
        />
      </div>
    </section>
  );
};

export default CreateUnitesSummary;
