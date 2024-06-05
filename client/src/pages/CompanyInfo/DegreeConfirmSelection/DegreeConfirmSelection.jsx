import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import InternalApiContext from '../../../store/context/InternalApiContext';
import Stepper from '../../../components/Stepper/Stepper';

import useUnitsStore from '../../../store/zustand/unitsStore';
import useStore from '../../../store/zustand/formStore';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import { postWorkplace } from '../../../api/workplace';
import { registration } from '../../../api/user';
import { fetchAllInternalWorkplaces } from '../../../api/workplace';
import { Typography } from '@mui/material';

function DegreeConfirmSelection() {
  const navigate = useNavigate();
  const {
    supervisors,
    businessId,
    name,
    editedCompanyName,
    departments,
    resetWorkplaceData,
  } = useStore();

  const { setinternalDegreeId, internalDegree, degreeFound, setWorkplaces } =
    useContext(InternalApiContext);

  const params = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setSiteTitle('Lisää työpaikka'),
      setSubHeading('Lisää uusi työpaikka'),
      setHeading('Työpaikkojen hallinta');
  }, [setSiteTitle, setSubHeading, setHeading]);

  useEffect(() => {
    setinternalDegreeId(params?.degreeId);
    // console.log('internal degree-------------', params.degreeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.degreeId]);


  const { checkedUnits, clearCheckedUnits } = useUnitsStore();
  //const checkedUnits = useUnitsStore((state) => state?.checkedUnits);

  console.log('checkedunits.........', checkedUnits);

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const { openNotificationModal, setOpenNotificationModal } = useStore();

  // eslint-disable-next-line no-unused-vars
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

        // Register the supervisor and get the userId
        const userResponse = await registration(userData);
        const userId = userResponse.data.userId;
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
        businessId: businessId,
        name: name ? name.name : editedCompanyName,
        departments: departmentData ? departmentData : '',
        degreeId: params.degreeId,
        units: checkedUnits.map((unit) => ({
          _id: unit._id,
          name: {
            fi: unit.name.fi,
          },
          assessments: unit.assessments.map((assessment) => ({
            _id: assessment._id,
            name: {
              fi: assessment.name.fi,
            },
            criteria: assessment.criteria.map((criterion) => ({
              _id: criterion._id,
              fi: criterion.fi,
            })),
          })),
        })),
      };
      console.log('🚀 ~ handleVahvistaClick ~ workplaceData:', workplaceData);

      console.log('Sending workplace Data:', workplaceData);
      //  The supervisors field contains an array of valid ObjectId values.

      const response = await postWorkplace(workplaceData);

      console.log('API Response------:', response);

      setIsLoading(false);

      if (response.status === 201 || response.status === 200) {
        const updatedWorkplaces = await fetchAllInternalWorkplaces();
        console.log(
          '🚀 ~ handleVahvistaClick ~ updatedWorkplaces:',
          updatedWorkplaces
        );

        setWorkplaces(updatedWorkplaces);
        resetWorkplaceData();
        clearCheckedUnits();
        setIsSuccess(true);
      } else {
        setIsFailure(true);
      }
    } catch (error) {
      console.error('Error while submitting workplace data:',error);
      setIsLoading(false);
      setIsFailure(true);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setOpenNotificationModal(true);
    } else if (isFailure) {
      setOpenNotificationModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isFailure]);

  return (
    <div className='confirmSelection__wrapper'>
      <section className='confirmSelection__container'>
        <div>
          <Stepper activePage={4} totalPages={4} data={stepperData} />
        </div>
        <div className='confirmSelection__infolist-wrapper'>
          <h2 className='Degree__confirmSelection__container--secondtitle'>
            Yhteenveto
          </h2>
          <div className='confirmSelection__infolist-item'>
            <h2 className='second__title'>Työpaikka</h2>
            <p className='second__paragraph'>
              {name ? name?.name : editedCompanyName}
            </p>
            <p className='second__paragraph'> {businessId}</p>
          </div>
          {departments?.name && (
            <div className='confirmSelection__infolist-item'>
              <h2 className='second__title'>Yksikko</h2>
              <p className='second__paragraph'>{departments?.name}</p>
            </div>
          )}

          {supervisors.map((ohjaaja, index) => (
            <div key={index} className='confirmSelection__infolist-item'>
              <h2 className='second__title'>Työpaikkaohjaaja</h2>
              <p className='second__paragraph'>
                {ohjaaja?.firstName} {ohjaaja?.lastName}
              </p>
              <p className='second__paragraph' style={{ marginBottom: '10px' }}>
                {ohjaaja?.email}
              </p>
            </div>
          ))}
        </div>
        <h1 className='Degree__confirmSelection__container--secondtitle'>
          {degreeFound && internalDegree?.name?.fi}
        </h1>
        <div className='confirmSelection__container--units'>
          {checkedUnits?.map((unit) => (
            <SelectUnit
              key={unit?._id}
              unit={unit}
              allUnits={degreeFound && internalDegree?.units}
            />
          ))}
        </div>
        <PageNavigationButtons
          handleBack={() =>
            navigate(`../internal/degrees/${internalDegree?._id}/units`)
          }
          handleForward={handleVahvistaClick}
          forwardButtonText={'Vahvista'}
          showForwardButton={true}
        />
      </section>
      {isSuccess && (
        <NotificationModal
          type='success'
          title='Uusi työpaikka lisätty'
          body='Tiedot on tallennettu OsTu-appin tietokantaan.'
          open={openNotificationModal}
          redirectLink='/add/companyname'
        />
      )}

      {isFailure && (
        <NotificationModal
          type='warning'
          title={
            <div>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  marginRight: '25px',
                }}
              >
                Tietojen tallentaminen ei onnistunut
              </Typography>
            </div>
          }
          body={
            <div style={{ padding: '10px' }}>
              <Typography style={{ fontSize: '14px' }}>
                Tietojen tallentaminen tietokantaan ei onnistunut.
              </Typography>
              <Typography style={{ fontSize: '14px' }}>
                Virhekoodi: [virhekoodi UIDV4]
              </Typography>
            </div>
          }
          sx={{ marginLeft: '1rem' }}
          open={openNotificationModal}
          redirectLink='/company-info'
        />
      )}
    </div>
  );
}

export default DegreeConfirmSelection;
