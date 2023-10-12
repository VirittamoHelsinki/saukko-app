import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import InternalApiContext from '../../../store/context/InternalApiContext';
import Stepper from '../../../components/Stepper/Stepper';
import useUnitsStore from '../../../store/zustand/unitsStore';
import useStore from '../../../store/zustand/formStore';
import { postWorkplace } from '../../../api/workplace';
import axios from "axios";
import { registration } from '../../../api/user';

function DegreeConfirmSelection() {
  const navigate = useNavigate();
  const { supervisors, businessId, name, editedCompanyName, departments, } = useStore();
  console.log(supervisors);
  console.log(departments);

  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalApiContext);
  const params = useParams();

  useEffect(() => {
    setinternalDegreeId(params.degreeId);
  }, [params.degreeId]);

  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const [isLoading, setIsLoading] = useState(false);

  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/company-info',
    },
    {
      label: 'Valitse tutkinto',
      url: '/internal/degrees',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/internal/degrees/${internalDegree._id}/units`,
    },
    {
      label: 'Vahvista',
      url: `/internal/degrees/${internalDegree._id}/units/confirm-selection`,
    },
  ];
  const handleVahvistaClick = async () => {
    try {
      setIsLoading(true);

      const supervisorPromises = supervisors.map(async (supervisor) => {
        // Create user data for the supervisor
        const userData = {
          firstName: supervisor.firstName,
          lastName: supervisor.lastName,
          email: supervisor.email,
          password: '12341234',
          role: 'supervisor',
        };
        console.log('UserDataf for registration---------------------------------', userData)
        // Register the supervisor and get the userId
        const userId = await registration(userData);
        return userId;
      });


      const supervisorIds = await Promise.all(supervisorPromises);
      console.log('Supervisor IDs:', supervisorIds);

      // const workplaceData = {
      //   supervisors: supervisorIds,
      //   businessId,
      //   name: name ? name.name : editedCompanyName,
      //   departments: departments ? departments : '',
      // };
      // const response = await postWorkplace(workplaceData);

      // Handle notifications based on the response.

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // Handle errors and notifications here
      // setIsLoading(false);
      // setOpenNotificationModal({ type: 'warning', title: 'Uusi työpaikka ei onnistunut' });
    }
  };
  return (
    <main className='confirmSelection__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Lisää uusi työpaikka' />
      <section className='confirmSelection__container'>
        <div>
          <Stepper
            activePage={4}
            totalPages={4}
            data={stepperData}
          />
        </div>
        <div className='confirmSelection__infolist-wrapper'>
          <h2 className='Degree__confirmSelection__container--secondtitle'>Yhteenveto</h2>
          <div className='confirmSelection__infolist-item'>
            <h2 className='second__title'>Työpaikka</h2>
            <p className='second__paragraph'> {businessId}</p>
            <p className='second__paragraph'>{name ? name.name : editedCompanyName}</p>
            {departments.map((department, index) => (
              <p className='second__paragraph' key={index}>
                {department.name}
              </p>
            ))}
          </div>
          {supervisors.map((ohjaaja, index) => (
            <div key={index} className='confirmSelection__infolist-item'>
              <h2 className='second__title'>Työpaikkaohjaaja</h2>
              <p className='second__paragraph'>{ohjaaja.firstName} {ohjaaja.lastName}</p>
              <p className='second__paragraph' style={{ marginBottom: '10px' }}>{ohjaaja.email}</p>
            </div>
          ))}
        </div>
        <h1 className='Degree__confirmSelection__container--secondtitle'>{degreeFound && internalDegree.name.fi}</h1>
        <div className='confirmSelection__container--units'>
          {checkedUnits?.map((unit) => (
            <SelectUnit key={unit._id} unit={unit} allUnits={degreeFound && internalDegree.units} />
          ))}
        </div>
        <PageNavigationButtons
          handleBack={() => navigate(`../internal/degrees/${internalDegree._id}/units`)}
          handleForward={handleVahvistaClick}
          forwardButtonText={'Vahvista'}
        />
      </section>
      <UserNav />
      <NotificationModal
        type='success'
        title='Uusi työpaikka lisätty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        redirectLink='/customer-list'
        onClose={() => setOpenNotificationModal(false)}
      />
      <NotificationModal
        type='warning'
        title='Uusi työpaikka ei onnistunut'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        redirectLink='/company-info'
        onClose={() => setOpenNotificationModal(false)}
      />
    </main>
  );
}

export default DegreeConfirmSelection;














