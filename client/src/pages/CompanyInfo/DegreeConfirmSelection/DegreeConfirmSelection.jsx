// Import react packages & dependencies
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import InfoList from '../../../components/InfoList/InfoList';
import InternalDegreeContext from '../../../utils/context/InternalDegreeContext';
import Stepper from '../../../components/Stepper/Stepper';
import useUnitsStore from '../../../store/unitsStore';
import useStore from '../../../store/useStore';

function DegreeConfirmSelection() {
  const navigate = useNavigate();
  const { työpaikkaohjaajat, businessID, companyName, editedCompanyName, departmentName } = useStore();
  console.log('Työpaikkaohjaajat from store:', työpaikkaohjaajat)
  console.log('Y tunnus from store:', businessID)
  console.log('Yrityksen nimi from store:', companyName)
  console.log('Muokattu yrityksen nimi from store:', editedCompanyName)
  console.log('Yksikön nimi from store:', departmentName)

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
        <div className='confirmSelection__infolist-wrapper'>
          <h2 className='Degree__confirmSelection__container--secondtitle'>Yhteenveto</h2>
          <div className='confirmSelection__infolist-item'>
            <h2 className='second__title'>Työpaikka</h2>
            <p className='second__paragraph'> {businessID}</p>
            <p className='second__paragraph'>{companyName ? companyName.name : editedCompanyName}</p>
            <p className='second__paragraph'>{departmentName ? departmentName : ''}</p>
          </div>
          {työpaikkaohjaajat.map((ohjaaja, index) => (
            <div key={index} className='confirmSelection__infolist-item'>
              <h2 className='second__title'>Työpaikkaohjaaja</h2>
              <p className='second__paragraph'>{ohjaaja.firstName} {ohjaaja.lastName}</p>
              <p className='second__paragraph' style={{ marginBottom: '10px' }}>{ohjaaja.email}</p>
            </div>
          ))}
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