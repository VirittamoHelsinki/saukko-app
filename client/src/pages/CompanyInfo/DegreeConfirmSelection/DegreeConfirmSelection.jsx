import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
import InfoList from '../../../components/InfoList/InfoList';

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

  const nameOfUnits = checkedUnits.map((unit) => unit.name.fi)

  const unitsNameByOne = nameOfUnits.map((name) => ({ content: name }))
  console.log('each unit name:', unitsNameByOne)

  const handleVahvistaClick = async () => {
    try {
      setIsLoading(true);

      // Prepare workplace data
      const departmentData = Object.keys(departments).map((key) => {
        const department = { name: departments[key] };
        // Check if the department exists in Zustand
        if (departments[key].length > 0) {
          department.supervisors = []; // Supervisors will be added later
        }
        return department;
      });

      const workplaceData = {
        businessId: businessId,
        name: name ? name.name : editedCompanyName,
        departments: departmentData,
        degreeId: params.degreeId,
        units: checkedUnits.map((unit) => ({
          _id: unit._id,
          name: { fi: unit.name.fi },
          assessments: unit.assessments.map((assessment) => ({
            _id: assessment._id,
            name: { fi: assessment.name.fi },
            criteria: assessment.criteria.map((criterion) => ({
              _id: criterion._id,
              fi: criterion.fi,
            })),
          })),
        })),
      };

      console.log('Sending workplace Data:', workplaceData);

      // Create the workplace first
      const response = await postWorkplace(workplaceData);
      const createdWorkplace = response.data; // Assuming the API returns the created workplace object with its ID

      console.log('API Response:', createdWorkplace);

      if (response.status === 201 || response.status === 200) {
        // Now that the workplace is created, register supervisors with the workplaceId
        const supervisorData = supervisors.map(async (supervisor) => {
          const userData = {
            firstName: supervisor.firstName,
            lastName: supervisor.lastName,
            email: supervisor.email,
            password: '12341234',
            role: 'supervisor',
            workplaceId: createdWorkplace._id, // Use the newly created workplace ID
            evaluationId: null
          };

          // Register the supervisor and get the userId
          const userResponse = await registration(userData);
          const userId = userResponse.data.userId;
          return userId;
        });

        // This gives an array of supervisor userIds.
        const supervisorIds = await Promise.all(supervisorData);

        // Update the workplace with supervisor IDs
        const updatedWorkplaceData = {
          supervisors: supervisorIds,
          departments: departmentData.map(dept => ({
            ...dept,
            supervisors: supervisorIds // Add supervisors to departments
          }))
        };

        await postWorkplace({ ...createdWorkplace, ...updatedWorkplaceData });

        const updatedWorkplaces = await fetchAllInternalWorkplaces();
        console.log('Updated Workplaces:', updatedWorkplaces);

        setWorkplaces(updatedWorkplaces);
        resetWorkplaceData();
        clearCheckedUnits();
        setIsSuccess(true);
      } else {
        setIsFailure(true);
      }
    } catch (error) {
      console.error('Error while submitting workplace data:', error);
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
        <InfoList data={unitsNameByOne} />
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
