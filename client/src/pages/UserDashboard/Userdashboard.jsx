import React, { useContext } from 'react';
import WavesHeader from '../../components/Header/WavesHeader';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import AuthContext from '../../utils/context/AuthContext';

const Userdashboard = () => {
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
          number1={8}
          number2={4}
        />
      </div>



    </div>
  );
};

export default Userdashboard;



