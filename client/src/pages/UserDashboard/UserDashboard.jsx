import React, { useContext } from 'react';
import WavesHeader from '../../components/Header/WavesHeader';
import NotificationBadge from '../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../components/UnitStatus/UnitStatus';
import UserNav from '../../components/UserNav/UserNav';
import AuthContext from '../../store/context/AuthContext';
import formStore from '../../store/zustand/formStore';
import CustomerList from './CustomerList/CustomerList';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const { chosenCustomerId } = formStore();

  return (
    <main className='dashboardPage__wrapper'>
      <div>
        <WavesHeader
          title="Saukko"
          secondTitle={!chosenCustomerId ? `Tervetuloa, ${user?.firstName}` : 'Asiakkaan nimi'}
          disabled={true}
        />
      </div>
      <div style={{ marginTop: '55%' }}>
        <h3 style={{ marginLeft: '15px', fontSize: '20px' }}>Ilmoitukset</h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div style={{ marginBottom: '50px' }}>

        {/* Customer */}
        {user?.role === 'customer' && (
          <>
            <h3 className='headingStyle'>Omat suoritukset</h3>
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
          </>
        )}

        {/* Teacher or Supervisor */}
        {(user?.role === 'teacher' || user?.role === 'supervisor') && (
          <>
            {!chosenCustomerId && 
              <>
                <h3 className='headingStyle'>Asiakkaiden suoritukset</h3>
                <CustomerList />
              </>
            }
            {chosenCustomerId &&
              <>
                <h3 className='headingStyle'>Omat suoritukset</h3>
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
              </>
            }
          </>
          )
        }

      </div>
      <UserNav />
    </main>
  );
};

export default UserDashboard;













