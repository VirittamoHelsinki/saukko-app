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
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

const UnitList = () => {
  const navigate = useNavigate();
  // Data from store management
  const { user } = useContext(AuthContext);
  const { evaluation, evaluations, setInternalEvaluations, setInternalEvaluation } = useContext(InternalApiContext);
  
  // Set evaluation automatically when role is customer
  useEffect(() => {
    if (user.role === 'customer') {
      setInternalEvaluations()
    }
  }, [])

  useEffect(() => {
    if (user.role === 'customer' && evaluations && evaluations.length > 0) {
      setInternalEvaluation(evaluations[0]._id);
    }
  }, [evaluations])
  
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
            unitId={unit._id}
            status={unit.status}
            subheader={unit.name.fi}
            link='/userperformance'
          />
        ))}
      </div>
      <div className='unitList__button'>
        <Button
          style={{
            color: '#0000BF',
            fontSize: '15px',
            border: '2px solid #0000BF',
            width: '60%',
            height: '50px',
          }}
          text='Tarkastele sopimusta'
          color='info'
          icon='la:file-alt'
          onClick={() => navigate('/contract-info')}
        />
      </div>

      <UserNav />
    </main>
  );
};

export default UnitList;
