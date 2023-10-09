// Import react packages & dependencies
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Zustand store and custom context
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useCriteriaFieldsContext } from '../../../store/context/CriteriaFieldsContext';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

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
  } = useStore();
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { allInternalDegrees, setAllInternalDegrees } = useContext(InternalApiContext);
  const { criteriaFields } = useCriteriaFieldsContext();
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
      diaryNumber: degree.diaryNumber,
      eduCodeValue: degree.eduCodeValue,
      name: degree.name,
      description: degree.description,
      archived: false,
      infoURL: degree.examInfoURL || '',
      units: degree.units,
    };

    // Post the new degree to the internal database
    // and save the response to a variable.
    const newDegree = await postDegree(degreeData);

    // Save degree to Context store.
    setAllInternalDegrees([...allInternalDegrees, newDegree]);

    navigate(`/customer-list`);
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
          {criteriaFields.map((innerArray, index) => (
            <div key={index}>
              <strong className='mb'>{checkedUnits[index]?.name?.fi}</strong>

              {innerArray.map((element, index) => (
                <p key={element}>
                  {index + 1 + '. '}
                  {element}
                </p>
              ))}
              {index < criteriaFields.length - 1 && <hr />}
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
      </section>
      <UserNav />
    </main>
  );
}

export default Summary;
