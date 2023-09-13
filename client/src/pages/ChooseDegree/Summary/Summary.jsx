// Import react packages & dependencies
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Zustand store and custom context
import useStore from '../../../store/useStore';
import useUnitsStore from '../../../store/unitsStore';
import DegreeContext from '../../../utils/context/DegreeContext';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

import { useCriteriaFieldsContext } from '../../../utils/context/CriteriaFieldsContext';

import { postDegree } from '../../../api/degree';

function Summary() {
  const navigate = useNavigate();

  const {
    degreeDescription,
    diaryNumber,
    regulationDate,
    validFrom,
    expiry,
    transitionEnds,
    addDegree,
  } = useStore();

  // Set path & get degree units from DegreeContext
  const { degree, degreeFound } = useContext(DegreeContext);
  const { criteriaFields } = useCriteriaFieldsContext();

  // Get checked units from unitsStore
  const { checkedUnits } = useUnitsStore();

  // Remove HTML p tags from degree description
  const regex = /(<([^>]+)>)/gi;
  const degreeDescriptionCleaned = degreeDescription.replace(regex, '');

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Yhteenveto',
  ];

  const handleSubmit = async () => {
    // TODO: Add correct fields from store to degreeData
    const degreeData = {
      diaryNumber: diaryNumber,
      eduCodeValue: '?',
      name: degree.name,
      description: degree.description,
      archived: false,
      infoURL: null,
      units: degree.units,
    };

    console.log('degreeData: ', degreeData)

    const newDegree = await postDegree(degreeData);

    addDegree(newDegree);

    navigate(`/userdashboard`);
  };

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='summary__container'>
        <Stepper
          activePage={4}
          totalPages={4}
          label={labelStepper}
          url={`/degrees/${degree._id}/units/tasks`}
        />
        <div className='section-title'>Tutkinnonosat ja tehtävät </div>
        <div className='summary__container--box'>
          {criteriaFields.map((innerArray, index) => (
            <>
              <strong className='mb'>{checkedUnits[index]?.name?.fi}</strong>

              {innerArray.map((element, index) => (
                <p key={element}>
                  {index + 1 + '. '}
                  {element}
                </p>
              ))}
              {index < criteriaFields.length - 1 && <hr />}
            </>
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
          handleBack={() =>
            navigate(`/degrees/${degree._id}/units/confirm-selection`)
          }
          handleForward={handleSubmit}
          forwardButtonText={'Tallenna tiedot'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default Summary;
