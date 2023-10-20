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
import { IconTwitter } from 'hds-react';
import { arrayIncludes } from '@mui/x-date-pickers/internals/utils/utils';

function DegreeConfirmSelection() {
  const navigate = useNavigate();
  const { supervisors, businessId, name, editedCompanyName, departments, } = useStore();
  // console.log(supervisors);
  // console.log('depatments----------', departments);


  const { setinternalDegreeId, internalDegree, degreeFound } = useContext(InternalApiContext);

  const params = useParams();

  useEffect(() => {
    setinternalDegreeId(params.degreeId);
    // console.log('internal degree-------------', params.degreeId);
  }, [params.degreeId]);

  const checkedUnits = useUnitsStore((state) => state.checkedUnits);

  console.log('checkedunits.........', checkedUnits)

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)

  const { openNotificationModal, setOpenNotificationModal } = useStore();

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

      const supervisorData = supervisors.map(async (supervisor) => {
        // Creating user data for the supervisor
        const userData = {
          firstName: supervisor.firstName,
          lastName: supervisor.lastName,
          email: supervisor.email,
          password: '12341234',
          role: 'supervisor',
        };
        // console.log('UserDataf for registration---------------------------------', userData)

        // Register the supervisor and get the userId
        const userResponse = await registration(userData);
        const userId = userResponse.data.userId
        return userId;
      });

      //This  gives  an array of supervisor userIds.
      const supervisorIds = await Promise.all(supervisorData);
      // console.log('Supervisor IDs:', supervisorIds);

      let departmentData = [];


      departmentData = Object.keys(departments).map((key) => {
        const department = { name: departments[key] };
        const departmentSupervisor = supervisorIds;
        // Check if the department exists in Zustand
        if (departments[key].length > 0) {
          // If the department exists, save supervisors to department.supervisors
          department.supervisors = departmentSupervisor;
        } else {
          // If the department does not exist, save supervisors to the main supervisors array
          supervisors.push(...supervisorIds);
        }

        return department;
      });


      const workplaceData = {
        supervisors: supervisorIds,
        businessId,
        name: name ? name.name : editedCompanyName,
        departments: departmentData ? departmentData : '',
        degreeId: params.degreeId,
        units: checkedUnits.map((unit) => ({
          _id: unit._id,
          name: {
            fi: unit.name.fi,
          },
          // assessments: [],
        }))

      };

      console.log('Sending workplace Data:', workplaceData);
      //  The supervisors field contains an array of valid ObjectId values.

      const response = await postWorkplace(workplaceData);

      console.log('API Response------:', response);

      setIsLoading(false);

      if (response.status === 201 || 200) {
        setIsSuccess(true);
      } else {
        setIsFailure(true);
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      setIsFailure(true);
      setIsSuccess(false);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setOpenNotificationModal(true);
    } else if (isFailure) {
      setOpenNotificationModal(true)
    }
  }, [isSuccess, isFailure]);

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
            <p className='second__paragraph'>{name ? name.name : editedCompanyName}</p>
            <p className='second__paragraph'> {businessId}</p>

          </div>
          {departments.name && (
            <div className='confirmSelection__infolist-item'>
              <h2 className='second__title'>Yksikko</h2>
              <p className='second__paragraph'>{departments.name}</p>
            </div>
          )}

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
      {isSuccess && (
        <NotificationModal
          type='success'
          title='Uusi työpaikka lisätty'
          body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
          open={openNotificationModal}
          redirectLink='/admin-menu'
        />
      )}

      {isFailure && (
        <NotificationModal
          type='warning'
          title='Uusi työpaikka ei onnistunut'
          body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
          open={openNotificationModal}
          redirectLink='/company-info'

        />
      )}

    </main>
  );
}

export default DegreeConfirmSelection;












