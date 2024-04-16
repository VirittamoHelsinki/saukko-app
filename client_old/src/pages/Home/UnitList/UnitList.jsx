// Import React
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import UserNav from '../../../components/UserNav/UserNav';
import Button from '../../../components/Button/Button';

// Import state management
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useAuthContext } from '../../../store/context/authContextProvider';

const UnitList = () => {
  const navigate = useNavigate();
  // Data from store management
  const { currentUser } = useAuthContext();
  const {
    evaluation,
    evaluations,
    setInternalEvaluations,
    setInternalEvaluation,
    allInternalDegrees,
  } = useContext(InternalApiContext);

  const degreeName =
    allInternalDegrees &&
    allInternalDegrees.find((degree) => degree._id === evaluation?.degreeId);
  console.log('🚀 ~ UserPerformance ~degree name:', degreeName);

  // Set evaluation automatically when role is customer
  useEffect(() => {
    if (currentUser.role === 'customer') {
      setInternalEvaluations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.role === 'customer' && evaluations && evaluations.length > 0) {
      setInternalEvaluation(evaluations[0]._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluations]);

  return (
    <main className='unitList__wrapper'>
      {currentUser.role === 'teacher' || currentUser.role === 'supervisor' ? (
        <WavesHeader
          title={`${evaluation?.customerId.firstName} ${evaluation?.customerId.lastName}`}
          secondTitle='Suoritukset'
          disabled={true}
        />
      ) : (
        <WavesHeader
          title={`Tervetuloa, ${evaluation?.customerId.firstName} `}
          secondTitle='Suoritukset'
          disabled={true}
        />
      )}

      <div className='unitList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div className='unitList__units'>
        {currentUser.role === 'customer' ? (
          <>
            <h3 style={{ paddingLeft: '35px', margin: '3rem 0' }}>
              {degreeName?.name.fi}
            </h3>
            <h3> Omat suoritukset </h3>
          </>
        ) : (
          <h3> Asiakkaan suoritukset </h3>
        )}

        {evaluation &&
          evaluation.units.map((unit) => (
            <UnitStatus
              key={unit._id}
              unitId={unit._id}
              status={unit.status}
              subheader={unit.name.fi}
              link='/userperformance'
            />
          ))}
        <div className='unitList__button'>
          <Button
            style={{
              color: '#0000BF',
              fontSize: '15px',
              border: '2px solid #0000BF',
              width: '14rem',
              height: '50px',
            }}
            text='Tarkastele sopimusta'
            color='info'
            icon='bx:file'
            onClick={() => navigate('/contract-info')}
          />
        </div>
      </div>

      <UserNav />
    </main>
  );
};

export default UnitList;
