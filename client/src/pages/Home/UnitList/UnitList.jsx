// Import React
import React, { useContext, useEffect } from 'react';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import UserNav from '../../../components/UserNav/UserNav';

// Import state management
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

const UnitList = () => {
  // Data from store management
  const { user } = useContext(AuthContext);
  const {
    evaluation,
    evaluations,
    setInternalEvaluations,
    setInternalEvaluation,
  } = useContext(InternalApiContext);
    console.log("🚀 ~ UnitList ~ evaluation1:", evaluation)

  // Set evaluation automatically when role is customer
  useEffect(() => {
    if (user.role === 'customer' ) {
      setInternalEvaluations();
    }
  }, []);

  useEffect(() => {
    if (user.role === 'customer' && evaluations && evaluations.length > 0) {
      setInternalEvaluation(evaluations[0]._id);
    }
  }, [evaluations]);

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
        {evaluation &&
          evaluation.units.map((unit, index) => (
            <div key={index}>
              <p>{unit._id}</p>
              {unit.assessments.map((assess, index) => (
                <p key={index}>{assess.name.fi}</p>
              ))}
              <UnitStatus
                key={unit._id}
                unitId={unit._id}
                status={unit.status}
                subheader={unit.name.fi}
                link={`/userperformance/${unit._id}`}
              />
            </div>
          ))}
      </div>
      <UserNav />
    </main>
  );
};

export default UnitList;
