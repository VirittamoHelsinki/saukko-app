import React, { useContext } from 'react';
import WavesHeader from '../../components/Header/WavesHeader';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../components/UnitStatus/UnitStatus';
import AuthContext from '../../utils/context/AuthContext';

const UserDashboard = () => {
  const auth = useContext(AuthContext)
  const user = auth.user
  console.log(user)

  return (
    <div>
      <div>
        <WavesHeader title="Saukko"
          secondTitle={`Tervetuloa, ${user?.name}`}
          disabled={true} />
      </div>
      <div style={{ marginTop: '55%' }}>
        <h3 style={{ marginLeft: '15px', fontSize: '18px' }}>Ilmoitukset</h3>
        <NotificationBadge
          number1={10}
          number2={5}
        />
      </div>
      <div>
        <UnitStatus
          status={3}
          subheader='1. Tieto- ja viestintätekniikan perustehtävät' />
      </div>
    </div>
  );
};

export default UserDashboard;





