// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Button from '../../../components/Button/Button';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import InternalDegreeContext from '../../../utils/context/InternalDegreeContext';
import Stepper from '../../../components/Stepper/Stepper';
import { padding } from '@mui/system';
import useUnitsStore from '../../../store/unitsStore';
import useStore from '../../../store/useStore';

function DegreeConfirmSelection() {
  const navigate = useNavigate();
  const { työpaikkaohjaajat, businessID, companyName } = useStore();
  // Set path & get degree units from DegreeContext
  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalDegreeContext);
  const params = useParams();

  useEffect(() => {
    setinternalDegreeId(params.degreeId);
  }, []);

  // Get checked units from unitsStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);



  // NotificationModal logic
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };
  // Text for stepper's labels
  const labelStepper = [
    'Lisää tiedot',
    'Valitse tutkinto',
    'Valitse tutkinnonosat',
    'Vahvista',
  ];

  return (
    <main className='confirmSelection__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Lisää uusi työpaikka' />
      <section className='confirmSelection__container'>
        <div >
          <Stepper
            activePage={4}
            totalPages={4}
            label={labelStepper}

          />
        </div>
        <div>
          <h2 className='Degree__confirmSelection__container--secondtitle'>Yhteenveto</h2>
          <div style={{ backgroundColor: '#E6E6E6', margin: '14px', marginBottom: '0px', paddingBottom: '8px' }}>
            <h2 className='second__title'>Työpaikka</h2>
            <p className='second__paragraph'> {businessID}</p>
            <p className='second__paragraph'>{companyName?.name}</p>
          </div>
          <div style={{ backgroundColor: '#F2F2F2', margin: '14px', marginTop: '0px', paddingBottom: '8px' }}>
            <h2 className='second__title'>Työpaikkaohjaaja</h2>
            <ul >
              {työpaikkaohjaajat.map((ohjaaja, index) => (
                <li key={index}>
                  <p className='second__paragraph'>{ohjaaja.firstName} {ohjaaja.lastName}</p>
                  <p className='second__paragraph' style={{ marginBottom: '10px' }}>{ohjaaja.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h1 className='Degree__confirmSelection__container--secondtitle'>{degreeFound && internalDegree.name.fi}</h1>
        <div className='confirmSelection__container--units'>
          {console.log(console.log('checked units confirm selection page: ', checkedUnits))}
          {checkedUnits?.map((unit) => (
            <SelectUnit key={unit._id} unit={unit} allUnits={degreeFound && internalDegree.units} />
          ))}
        </div>
        <PageNavigationButtons
          handleBack={() => navigate(`../internal/degrees/${internalDegree._id}/units`)}
          handleForward={handleNotificationModalOpen}
          forwardButtonText={'Vahvista'}
        />
      </section>
      <UserNav />
      <NotificationModal
        type='success'
        title='Uusi työpaikka lisätty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        redirectLink='/evaluation-summary'
      />

    </main>
  );
}

export default DegreeConfirmSelection;


