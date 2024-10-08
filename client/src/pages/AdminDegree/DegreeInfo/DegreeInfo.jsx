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
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import { useAuthContext } from '../../../store/context/authContextProvider';
import WithDegree from '../../../HOC/withDegree';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import FieldValueCard from '../../../components/FieldValueCard/FieldValueCard';

import { Input, Textarea, DatePicker } from '../../../components/Input';


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
  const [isEditing, setIsEditing] = useState(false);

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
      return null; // Return the placeholder text for missing data
    } else {
      const dateObj = new Date(value);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;
      return formattedDate;
    }
  }

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  useEffect(() => {
    setSiteTitle("Tutkintojen hallinnointi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta");
    if (degree) {
      setDegreeDescription(degree?.description?.fi);
      setDegreeName(degree?.name?.fi);
      setDiaryNumber(degree?.diaryNumber);
      setRegulationDate((degree?.regulationDate));
      setValidFrom((degree.validFrom));
      setExpiry((degree.expiry));
      setTransitionEnds((degree.transitionEnds));
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

  useEffect(() => {
    setIsContentChanged(true)
  }, [ degreeDescription, degreeName, diaryNumber, regulationDate, validFrom, expiry, transitionEnds ])

  // Toggle text editable mode
  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  // Button styling/CSS
  const buttonStyleSave = {
    background: '#0000bf',
    color: '#fff',
    border: 'red',
    padding: '1rem',
    width: '100%',
  };
  const buttonStyleEdit = {
    background: '#0000bf',
    color: '#fff',
    border: 'solid 2px #0000bf',
    padding: '0 1rem',
    width: '100%',
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
    return <div>{ text[selectedLanguage].loadingMessage }</div>
  }

  return (
    <div className='degreeInfo__wrapper'>
      <section className='degreeInfo__container'>
        <Stepper
          activePage={1}
          totalPages={4}
          data={stepperData}
        />

        <FieldValueCard title="Valittu tutkinto" value={degree ? degree?.name?.fi : degreeName} />

        {currentUser?.role === 'teacher' && (
          <Button
            id='editButton'
            onClick={handleEditToggle}
            type='submit'
            style={isEditing ? buttonStyleSave : buttonStyleEdit}
            text={isEditing ? 'Lopeta muokkaus' : 'Muokkaa tietoja'}
            icon={'mingcute:pencil-line'}
          />
        )}

        {
          !isEditing && (
            <div className="degreeInfo__container--info">
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Tutkinnon suorittaneen osaaminen</p>
                <p className="degreeInfo__value">{degreeDescription || '-'}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Tutkinnon nimi</p>
                <p className="degreeInfo__value">{degreeName}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Määräyksen diaarinumero</p>
                <p className="degreeInfo__value">{diaryNumber}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Määräyksen päätöspäivämäärä</p>
                <p className="degreeInfo__value">{parseDate(regulationDate)}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Voimaantulo</p>
                <p className="degreeInfo__value">{parseDate(validFrom)}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Voimassaolon päättyminen</p>
                <p className="degreeInfo__value">{expiry ? parseDate(expiry) : '-'}</p>
              </div>
              <div className="degreeInfo__field">
                <p className="degreeInfo__title">Siirtymäajan päättymisaika</p>
                <p className="degreeInfo__value">{transitionEnds ? parseDate(transitionEnds) : '-'}</p>
              </div>
            </div>
          )
        }

        {
          isEditing && (
            <div className="degreeInfo__container--edit-form">
              <Textarea
                label="Tutkinnon suorittaneen osaaminen *"
                value={degreeDescription}
                onChange={(e) => setDegreeDescription(e.target.value)}
                placeholder="Täydennä puuttuvat tiedot"
              />

              <Input
                label="Tutkinnon nimi"
                value={degreeName}
                onChange={(e) => setDegreeName(e.target.value)}
                placeholder="Kirjoita tutkinnon nimi"
              />

              <Input
                label="Määräyksen diaarinumero"
                value={diaryNumber}
                onChange={(e) => setDiaryNumber(e.target.value)}
                placeholder="Kirjoita diaarinumero"
              />

              <DatePicker
                label="Määräyksen päätöspäivämäärä"
                value={regulationDate}
                onChange={(value) => setRegulationDate(value)}
                placeholder="Valitse päivämäärä"
              />

              <DatePicker
                label="Voimaantulo"
                value={validFrom}
                onChange={(value) => setValidFrom(value)}
                placeholder="Valitse päivämäärä"
              />

              <DatePicker
                label="Voimassaolon päättyminen"
                value={expiry}
                onChange={(value) => setExpiry(value)}
                placeholder="Valitse päivämäärä"
              />

              <DatePicker
                label="Siirtymäajan päättymisaika"
                value={transitionEnds}
                onChange={(value) => setTransitionEnds(value)}
                placeholder="Valitse päivämäärä"
              />

            </div>
          )
        }

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
