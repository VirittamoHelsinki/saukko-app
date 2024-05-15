// Import react packages
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import state management
import useStore from '../../../store/zustand/formStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';

// Import components
import Stepper from '../../../components/Stepper/Stepper';
import Hyperlink from '../../../components/Hyperlink/Hyperlink';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Button from '../../../components/Button/Button';
import ContentEditable from 'react-contenteditable';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import WithDegree from '../../../HOC/withDegree';

function DegreeInfo({ degree, loading }) {
  const navigate = useNavigate();
  const params = useParams();

  // Get values from state management
  const { currentUser } = useAuthContext();
  const { allDegrees } = useContext(ExternalApiContext);
  const {
    degreeName,
    setDegreeName,
    degreeDescription,
    setDegreeDescription,
    diaryNumber,
    setDiaryNumber,
    regulationDate,
    setRegulationDate,
    validFrom,
    setValidFrom,
    expiry,
    setExpiry,
    transitionEnds,
    setTransitionEnds,
  } = useStore();

  // Set state
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // Opening / closing notificationModal
  const [openNotificationModalDate, setOpenNotificationModalDate] = useState(false)
  const handleCloseDate = () => setOpenNotificationModalDate(false)

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: degree.units ? 'Valitse tutkinnonosat' : 'Lisää tutkinnonosat',
      url: degree.units ? `/degrees/${params.degreeId}/units` : `/degrees/${params.degreeId}/edit-units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/summary`
    },
  ]

  // Parse date or handle "N/A" or empty string
  function parseDate(value) {
    if (value === null || value === 'N/A' || value === '') {
      return 'Täydennä puuttuvat tiedot'; // Return the placeholder text for missing data
    } else {
      const dateObj = new Date(value);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  }

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setSiteTitle("Tutkintojen hallinnointi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta");
    if (degree) {
      setDegreeDescription(degree?.description?.fi);
      setDegreeName(degree?.name?.fi);
      setDiaryNumber(degree?.diaryNumber);
      setRegulationDate(parseDate(degree?.regulationDate));
      setValidFrom(parseDate(degree.validFrom));
      setExpiry(parseDate(degree.expiry));
      setTransitionEnds(parseDate(degree.transitionEnds));
    } else {
      // If fetch by ID fails set data from allDegrees
      if (
        !degreeDescription ||
        !degreeName ||
        !diaryNumber ||
        !regulationDate ||
        !validFrom ||
        !expiry ||
        !transitionEnds
      ) {
        const matchingDegree = allDegrees.find(degree => degree._id === parseInt(params.degreeId));
        if (matchingDegree) {
          setDegreeDescription('Täydennä puuttuvat tiedot');
          setDegreeName(matchingDegree.name.fi);
          setDiaryNumber(matchingDegree.diaryNumber);
          setRegulationDate('Täydennä puuttuvat tiedot');
          setValidFrom('Täydennä puuttuvat tiedot');
          setExpiry('Täydennä puuttuvat tiedot');
          setTransitionEnds('Täydennä puuttuvat tiedot');
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [degree]);

  // Toggle text editable mode
  const handleEditToggle = () => {
    setIsEditable((prevState) => !prevState);
  };

  // Button styling/CSS
  const buttonStyleSave = {
    background: '#0000bf',
    color: '#fff',
    border: 'red',
    padding: '1rem',
    marginTop: '20px',
    width: '90%',
  };
  const buttonStyleEdit = {
    background: '#fff',
    color: '#0000bf',
    border: 'solid 2px #0000bf',
    padding: '0 1rem',
    marginTop: '20px',
    width: '90%',
  };

  // Form validation
  const handleForward = () => {
    // Check date format
    const datePattern = /^\d{2}\.\d{2}.\d{4}$/;

    if (
      (typeof regulationDate === 'string' && regulationDate !== 'Täydennä puuttuvat tiedot' && regulationDate !== '' && !datePattern.test(regulationDate)) ||
      (typeof validFrom === 'string' && validFrom !== 'Täydennä puuttuvat tiedot' && validFrom !== '' && !datePattern.test(validFrom)) ||
      (typeof expiry === 'string' && expiry !== 'Täydennä puuttuvat tiedot' && expiry !== '' && !datePattern.test(expiry)) ||
      (typeof transitionEnds === 'string' && transitionEnds !== 'Täydennä puuttuvat tiedot' && transitionEnds !== '' && !datePattern.test(transitionEnds))
    ) {
      setOpenNotificationModalDate(true);
      return;
    }

    // Navigate to the next page
    if (degree) {
      navigate(`/degrees/${params.degreeId}/units`)
    } else {
      navigate(`/degrees/${params.degreeId}/edit-units`)
    }
  }

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div className='degreeInfo__wrapper'>
      <section className='degreeInfo__container'>
        <Stepper
          activePage={1}
          totalPages={4}
          data={stepperData}
        />
        <h1 className='degree-title'>
          {degree ? degree?.name?.fi : degreeName}
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {currentUser?.role === 'teacher' && (
            <Button
              id='editButton'
              onClick={handleEditToggle}
              type='submit'
              style={isEditable ? buttonStyleSave : buttonStyleEdit}
              text={isEditable ? 'Lopeta muokkaus' : 'Muokkaa tietoja'}
              icon={'mingcute:pencil-line'}
            />
          )}
        </div>

        <div className='degreeInfo__container--info'>
          <div className='degreeInfo__container--info--block'>
            <h1>Tutkinnon suorittaneen osaaminen</h1>
            {degreeDescription ? (
              <div
                id='degreeDescriptionTextBox'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ContentEditable
                  html={degreeDescription === 'N/A' ? 'Täydennä puuttuvat tiedot' : degreeDescription}
                  onChange={(e) => {
                    setDegreeDescription(e.target.value === 'Täydennä puuttuvat tiedot' ? 'N/A' : e.target.value);
                    setIsContentChanged(true);
                  }}
                  tagName='p'
                  disabled={!isEditable}
                  className={isEditable ? 'border-input' : ''}
                />
              </div>
            ) : (
              <p>Täydennä puuttuvat tiedot</p>
            )}
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <p>Tutkinon nimi</p>
            <div
              id='degreeNameTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={degreeName ?? "degreeName is NULL"}
                onChange={(e) => {
                  setDegreeName(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <p>Määräyksen diaarinumero</p>
            <div
              id='diaryNumberTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={diaryNumber ?? "diaryNumber is NULL"}
                onChange={(e) => {
                  setDiaryNumber(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <p>Määräyksen päätöspäivämäärä</p>
            <div
              id='regulationDateTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={regulationDate ?? "regulationDate is NULL"}
                onChange={(e) => {
                  setRegulationDate(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <p>Voimaantulo</p>
            <div
              id='validFromTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={validFrom ?? "validFrom is NULL"}
                onChange={(e) => {
                  setValidFrom(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <p>Voimassaolon päättyminen</p>
            <div
              id='expiryTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={expiry ?? "expiry is NULL"}
                onChange={(e) => {
                  setExpiry(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
          <div className='degreeInfo__container--info--block'>
            <p>Siirtymäajan päättymisaika</p>
            <div
              id='transitionEndsTextBox'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ContentEditable
                html={transitionEnds ?? "transitionEnds is NULL"}
                onChange={(e) => {
                  setTransitionEnds(e.target.value)
                  setIsContentChanged(true)
                }}
                tagName='p'
                disabled={!isEditable}
                className={isEditable ? 'border-input' : ''}
              />
            </div>
          </div>
        </div>

        <Hyperlink
          linkText={'Lue lisää tästä linkistä'}
          linkSource={degree.examInfoURL}
        />

        <PageNavigationButtons
          handleBack={() => navigate('/degrees')}
          handleForward={handleForward}
          showForwardButton={true}
          forwardButtonText={
            isContentChanged ? 'Tallenna ja jatka' : 'Seuraava'
          }
        />
      </section>
      <NotificationModal
        type='warning'
        title='Tallennus epäonnistui'
        body='Täytä päivämäärät muodossa DD.MM.YYYY'
        open={openNotificationModalDate}
        handleClose={handleCloseDate}
      />
    </div>
  );
}

export default WithDegree(DegreeInfo);