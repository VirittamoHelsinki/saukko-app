// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import { useTheme } from '@mui/material/styles';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import useUnitsStore from '../../../unitsStore';
import DegreeContext from '../../../utils/context/DegreeContext';
import {
  CriteriaFieldsContextProvider,
  useCriteriaFieldsContext,
} from '../../../utils/context/CriteriaFieldsContext';

function Summary() {
  const navigate = useNavigate();

  // Set path & get degree units from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  const { criteriaFields, setCriteriaFields } = useCriteriaFieldsContext();

  // Get checked units from unitsStore
  const { checkedUnits } = useUnitsStore();

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Yhteenveto',
  ];

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
        <PageNavigationButtons
          handleBack={() =>
            navigate(`/degrees/${degree._id}/units/confirm-selection`)
          }
          handleForward={() =>
            navigate(`/degrees/${degree._id}/units/tasks/summary`)
          }
          forwardButtonText={'Tallenna tiedot'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default Summary;
