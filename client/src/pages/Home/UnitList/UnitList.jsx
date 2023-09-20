import React, { useContext } from 'react';
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import UserNav from '../../../components/UserNav/UserNav';
import AuthContext from '../../../store/context/AuthContext';
import formStore from '../../../store/zustand/formStore';

const UnitList = () => {
  const { user } = useContext(AuthContext);
  const { chosenCustomerId } = formStore();

  return (
    <main className='unitList__wrapper'>
      <WavesHeader
        title="Saukko"
        secondTitle={`Tervetuloa, ${user?.firstName}`}
      />
      <div className='unitList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div className='unitList__units'>
        <h3> Omat suoritukset </h3>
        <UnitStatus
          status={1}
          subheader="1. Tieto- ja viestintätekniikan perustehtävät"
          link='/userperformance'
        />
        <UnitStatus
          status={2}
          subheader="7. Ohjelmointi"
          link='/userperformance'
        />
        <UnitStatus
          status={4}
          subheader="9. Sulautetun järjestelmän toteuttaminen"
          link='/userperformance'
        />
        <UnitStatus
          status={5}
          subheader="15. Kulunvalvonta- tai turvajärjestelmän asennus"
          link='/userperformance'
        />
        <UnitStatus
          status={6}
          subheader="16. Kyberturvallisuuden ylläpitäminen"
          link='/userperformance'
        />
      </div>
      <UserNav />
    </main>
  );
};

export default UnitList;













