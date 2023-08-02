// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import useUnitsStore from '../../../unitsStore';
import DegreeContext from '../../../utils/context/DegreeContext';

function SpecifyTasks() {
  const navigate = useNavigate();

  // Set path & get degree units from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Get checked units from unitsStore
  const { checkedUnits, setUnitAtIndex } = useUnitsStore();

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Vahvista',
  ];

  return (
    <main className='confirmSelection__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='confirmSelection__container'>
        <Stepper
          activePage={3}
          totalPages={4}
          label={labelStepper}
          url={`/degrees/${degree._id}/units/tasks`}
        />

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${degree._id}/units`)}
          handleForward={''}
          forwardButtonText={'Vahvista valinnat'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default SpecifyTasks;
