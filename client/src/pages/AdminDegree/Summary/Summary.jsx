// Import react packages & dependencies
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Zustand store and custom context
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import InternalApiContext from '../../../store/context/InternalApiContext';

// Import components
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import { postDegree } from '../../../api/degree';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import WithDegree from '../../../HOC/withDegree';

function Summary({ degree }) {
  const navigate = useNavigate();
  const params = useParams();

  // Get values from store management
  const {
    degreeName,
    degreeDescription,
    diaryNumber,
    regulationDate,
    validFrom,
    expiry,
    transitionEnds,
  } = useStore();
  const { allInternalDegrees, setAllInternalDegrees } = useContext(InternalApiContext);
  const { checkedUnits } = useUnitsStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  // NotificationModal
  const [notificationSuccess, setNotificationSuccess] = useState(false)
  const [notificationError, setNotificationError] = useState(false)
  const [response, setResponse] = useState(null)

  const closeSuccess = () => setNotificationSuccess(false)
  const closeError = () => setNotificationError(false)

  // Remove HTML p tags from degree description
  const regex = /(<([^>]+)>)/gi;
  const degreeDescriptionCleaned = degreeDescription?.replace(regex, '');

  function parseDate(dateString) {
    const datePattern = /^\d{2}\.\d{2}.\d{4}$/;
    if (datePattern.test(dateString)) {
      const [day, month, year] = dateString.split('.');
      const date = new Date(year, month - 1, day);
      return date;
    } else {
      return null;
    }
  }
  
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
  ];

  const handleSubmit = async () => {
    
    const degreeData = {
      diaryNumber: diaryNumber ? diaryNumber : degree.diaryNumber,
      eduCodeValue: degree ? degree.eduCodeValue : '',
      name: {
        fi: degreeName ? degreeName : degree.name.fi,
        sv: degree ? degree.name.sv : '',
        en: degree ? degree.name.en : '',
      },
      description: {
        fi: degreeDescription ? degreeDescriptionCleaned : degree.description.fi,
        sv: degree ? degree.description.sv : '',
        en: degree ? degree.description.en : '',
      },
      archived: false,
      infoURL: degree.examInfoURL,
      units: checkedUnits,
      regulationDate: parseDate(regulationDate),
      transitionEnds: parseDate(transitionEnds),
      validFrom: parseDate(validFrom),
      expiry: parseDate(expiry),
    };
    console.log('Data for post request:', degreeData)

    // Send post request
    const response = await postDegree(degreeData);
    console.log('response', response)
    // Save response to state
    setResponse(response);

    // Save degree to context
    setAllInternalDegrees([...allInternalDegrees, response])

  };

  // Trigger NotificationModal
  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta")
    if (response && allInternalDegrees.some(degree => degree._id === response._id)) {
      setNotificationSuccess(true);
    } else if (response) {
      setNotificationError(true);
    }
  }, [allInternalDegrees, response, setHeading, setSiteTitle, setSubHeading]);

  return (
    <div className='summary__wrapper'>
      <section className='summary__container'>
        <Stepper
          activePage={4}
          totalPages={4}
          data={stepperData}
        />
        <h1 className='degree-title'>{degreeName ? degreeName: degree.name?.fi}</h1>
        <div className='section-title'>Tutkinnonosat ja tehtävät </div>
        <div className='summary__container--box'>
          {checkedUnits.map((unit, index) => (
            <div key={index} className='unit-container'>
              <strong>{unit.name.fi}</strong>
              {unit.assessments && unit.assessments.map((assessment, index) => (
                <p key={index}>{index+1}. {assessment.name.fi}</p>
              ))}
            </div>
          ))}
        </div>
        <div className='section-title'> Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box'>
          {degreeDescriptionCleaned}
        </div>

        <div className='section-title'> Tutkintotiedot</div>
        <ul className='summary__container--box'>
          <strong>Määräyksen diaarinumero</strong>
          <li>{diaryNumber}</li>
          <strong> Määräyksen päätöspäivämäärä</strong>
          <li>{regulationDate}</li>
          <strong>Voimaantulo</strong>
          <li>{validFrom}</li>
          <strong>Voimassaolon päättyminen</strong>
          <li>{expiry}</li>
          <strong>Siirtymäajan päättymisaika</strong>
          <li>{transitionEnds}</li>
        </ul>

        <PageNavigationButtons
          handleBack={() =>navigate(`/degrees/${params.degreeId}/units/tasks`)}
          handleForward={handleSubmit}
          forwardButtonText={'Tallenna tiedot'}
          showForwardButton={true}
        />
        <NotificationModal
          type='success'
          title='Tiedot tallennettu!'
          body='Tiedot on tallennettu OsTu-appin tietokantaan.'
          open={notificationSuccess}
          handleClose={closeSuccess}
          redirectLink='/degrees/add'
        />
        <NotificationModal
          type='warning'
          title='Lomakkeen lähetys epäonnistui'
          open={notificationError}
          handleClose={closeError}
        />
      </section>
    </div>
  );
}

export default WithDegree(Summary);
