// Import react packages & dependencies
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Zustand store and custom context
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';

import { postDegree } from '../../../api/degree';

function Summary() {
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
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { allInternalDegrees, setAllInternalDegrees } = useContext(InternalApiContext);
  const { checkedUnits } = useUnitsStore();

  // Remove HTML p tags from degree description
  const regex = /(<([^>]+)>)/gi;
  const degreeDescriptionCleaned = degreeDescription.replace(regex, '');

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/degrees/${params.degreeId}/units`
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
      eduCodeValue: degree.eduCodeValue,
      name: {
        fi: degreeName ? degreeName : degree.name.fi,
        sv: degreeFound ? degree.name.sv : '',
        en: degreeFound ? degree.name.en : '',
      },
      description: {
        fi: degreeDescription ? degreeDescription : degree.description.fi,
        sv: degreeFound ? degree.description.sv : '',
        en: degreeFound ? degree.description.en : '',
      },
      archived: false,
      infoURL: degree.examInfoURL,
      units: checkedUnits,
    };
    console.log('Data for post request:', degreeData)

    // Post the new degree to the internal database
    // and save the response to a variable.
    /* const newDegree = await postDegree(degreeData); */

    // Save degree to Context store.
    /* setAllInternalDegrees([...allInternalDegrees, newDegree]); */

    // Trigger NotificationModal
    /* setOpenNotificationModal(true); */
  };

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
      <section className='summary__container'>
        <Stepper
          activePage={4}
          totalPages={4}
          data={stepperData}
        />
        <h1 className='degree-title'>{degreeFound ? degree.name.fi : degreeName}</h1>
        <div className='section-title'>Tutkinnonosat ja tehtävät </div>
        <div className='summary__container--box'>
          {checkedUnits.map((unit, index) => (
            <div key={index} className='unit-container'>
              <strong>{unit.name.fi}</strong>
              {unit.assessments.map((assessment, index) => (
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
        />
        <NotificationModal
          type='success'
          title='Tiedot tallennettu'
          body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
          open={openNotificationModal}
          redirectLink='/admin-menu'
        />
      </section>
      <UserNav />
    </main>
  );
}

export default Summary;
