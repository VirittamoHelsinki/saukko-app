
import React, { useContext } from 'react';
import WavesHeader from '../../components/Header/WavesHeader';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../components/UnitStatus/UnitStatus';
import AuthContext from '../../utils/context/AuthContext';

const UserDashboard = () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  console.log(user);

  return (
    <div>
      <div>
        <WavesHeader
          title="Saukko"
          secondTitle={`Tervetuloa, ${user?.name}`}
          disabled={true}
        />
      </div>
      <div style={{ marginTop: '55%' }}>
        <h3 style={{ marginLeft: '15px', fontSize: '18px' }}>Ilmoitukset</h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div>
        {user?.role === 'supervisor' && (
          <>
            <h3 className='headingStyle'>Omat suoritukset</h3>
            <UnitStatus
              status={1}
              subheader="1. Tieto- ja viestintätekniikan perustehtävät"
            />
            <UnitStatus
              status={3}
              subheader="7. Ohjelmointi"
            />
            <UnitStatus
              status={4}
              subheader="9. Sulautetun järjestelmän toteuttaminen"
            />
            <UnitStatus
              status={5}
              subheader="15. Kulunvalvonta- tai turvajärjestelmän asennus"
            />
            <UnitStatus
              status={6}
              subheader="16. Kyberturvallisuuden ylläpitäminen"
            />
          </>
        )}
        {user?.role === 'customer' && (
          <>
            <h3 className='headingStyle'>Omat suoritukset</h3>
            <UnitStatus
              status={1}
              subheader="1. Tieto- ja viestintätekniikan perustehtävät"
            />
            <UnitStatus
              status={2}
              subheader="7. Ohjelmointi"
            />
            <UnitStatus
              status={4}
              subheader="9. Sulautetun järjestelmän toteuttaminen"
            />
            <UnitStatus
              status={5}
              subheader="15. Kulunvalvonta- tai turvajärjestelmän asennus"
            />
            <UnitStatus
              status={6}
              subheader="16. Kyberturvallisuuden ylläpitäminen"
            />
          </>
        )}

      </div>
    </div>
  );
};

export default UserDashboard;









