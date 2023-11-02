// Import React
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import UserNav from '../../../components/UserNav/UserNav';

// Import state management
import formStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

const UnitList = () => {
  const navigate = useNavigate();

  // Data from store management
  const { user } = useContext(AuthContext);
  const { evaluations } = useContext(InternalApiContext);
  const { chosenEvaluationId } = formStore();
  const evaluation = evaluations.find(evaluation => evaluation._id === chosenEvaluationId)
  console.log('Chosen evaluation:', evaluation)

  // Redirect to CustomerList if chosenEvaluation is undefined
  useEffect(() => {
    !evaluation && navigate('/customer-list')
  }, [evaluation]);

  return (
    <main className='unitList__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={`Tervetuloa, ${user?.firstName}`}
      />
      <div className='unitList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div className='unitList__units'>
        <h3> Omat suoritukset </h3>
        {evaluation && evaluation.units.map(unit => (
          <UnitStatus
            key={unit._id}
            status={unit.status}
            subheader={unit.name.fi}
            link='/userperformance'
          />
        ))}
      </div>
      <UserNav />
    </main>
  );
};

export default UnitList;
