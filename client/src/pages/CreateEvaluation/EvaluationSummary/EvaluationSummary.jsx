// Import react packages
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InfoList from '../../../components/InfoList/InfoList';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import Stepper from '../../../components/Stepper/Stepper';
import { Typography } from '@mui/material';

// Import state management
import useEvaluationFormStore from '../../../store/zustand/evaluationFormStore';
import { createEvaluation } from '../../../api/evaluation';
import { registration, updateUser } from '../../../api/user';
import useUnitsStore from '../../../store/zustand/unitsStore';
import InternalApiContext from '../../../store/context/InternalApiContext';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import useHeadingStore from '../../../store/zustand/useHeadingStore';

function EvaluationSummary() {
  const navigate = useNavigate();

  // Get data from store management
  const { workplace, department, supervisor } = useEvaluationStore();
  const { customer, evaluation, resetFormData } = useEvaluationFormStore(); // Include resetFormData
  const { checkedUnits, clearCheckedUnits } = useUnitsStore();
  const { setInternalEvaluations } = useContext(InternalApiContext);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { allInternalDegrees } = useContext(InternalApiContext);

  // NotificationModal
  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);

  const closeSuccessNotification = () => setSuccessNotification(false);
  const closeErrorNotification = () => setErrorNotification(false);

  useEffect(() => {
    setSiteTitle('OsTu'),
      setSubHeading('Lisää uusi asiakas'),
      setHeading('Asiakkuudet');
  }, [setSiteTitle, setHeading, setSubHeading]);

  console.log(evaluation);
  
  
  // Data array for InfoList component
  const summaryData = [
    {
      title: 'Nimi',
      content: customer ? `${customer.firstName} ${customer.lastName}` : '',
    },
    {
      title: 'Sähköposti',
      content: customer ? customer.email : '',
    },
    {
      title: 'Asiakkuuden aloituspäivä',
      content: evaluation ? evaluation.startDate.format('DD.MM.YYYY') : '',
    },
    {
      title: 'Asiakkuuden lopetuspäivä',
      content: evaluation ? evaluation.endDate.format('DD.MM.YYYY') : '',
    },
    {
      title: 'Työpaikka',
      content: workplace ? workplace.name : '',
    },
    {
      title: 'Y - tunnus',
      content: workplace ? workplace.businessId : '',
    },
    {
      title: 'Työpaikanyksikkö',
      content: department ? department.name : '',
    },
    {
      title: 'Ohjaaja',
      content: supervisor
        ? `${supervisor.firstName} ${supervisor.lastName}`
        : '',
    },
    {
      title: 'Työtehtäväsi',
      content: evaluation ? evaluation.workTasks : '',
    },
    {
      title: 'Omat tavoitteesi',
      content: evaluation ? evaluation.workGoals : '',
    },
    {
      title: 'Opettaja',
      content: evaluation ? (evaluation.teacher.firstName + ' ' + evaluation.teacher.lastName) : '',
    },
  ];

  // Remove department from summaryData if there is no department
  if (!department) {
    const indexToRemove = summaryData.findIndex(
      (item) => item.title === 'Työpaikanyksikkö'
    );
    if (indexToRemove !== -1) {
      summaryData.splice(indexToRemove, 1);
    }
  }

  const nameOfUnits = checkedUnits.map((unit) => unit.name.fi)

  const unitsNameByOne = nameOfUnits.map((name) => ({
    content: name,
  }))

  const updateUserWithEvaluationId = async (userId, evaluationId) => {
    const updateUserData = {
      evaluationId: evaluationId,
    };

    try {
      const response = await updateUser(userId, updateUserData);
      console.log('User updated with evaluationId:', response.data);
    } catch (error) {
      console.error('Error updating user with evaluationId:', error);
      setErrorNotification(true);
    }
  };

  const handleUserPostReq = async () => {
    // Format data
    const userRequestData = {
      firstName: customer && customer.firstName ? customer.firstName : null,
      lastName: customer && customer.lastName ? customer.lastName : null,
      email: customer && customer.email ? customer.email : null,
      password: '123456',
      role: 'customer',
      workplaceId: workplace._id,
      evaluationId: null,
    };
    console.log('User POST request:', userRequestData);

    // If all values are found send POST request for creating user
    if (
      userRequestData.firstName !== null &&
      userRequestData.lastName !== null &&
      userRequestData.email !== null
    ) {
      const response = await registration(userRequestData);
      const userId = response.data.userId;
      const evaluationId = await handleEvaluationPostReq(userId);

      if (evaluationId) {
        // Update the customer with the evaluationId
        await updateUserWithEvaluationId(userId, evaluationId);

        setSuccessNotification(true);
        resetFormData();
        clearCheckedUnits();
      } else {
        setErrorNotification(true);
      }

    } else {
      setErrorNotification(true);
    }
  };


  const handleEvaluationPostReq = async (userId) => {
    // Format evaluation data
    const evaluationRequestData = {
      degreeId: workplace && workplace.degreeId ? workplace.degreeId : null,
      customerId: userId,
      teacherId: evaluation && evaluation.teacher._id ? evaluation.teacher._id : null,
      supervisorId: supervisor && supervisor._id ? supervisor._id : null,
      workplaceId: workplace && workplace._id ? workplace._id : null,
      units: checkedUnits,
      startDate:
        evaluation && evaluation.startDate ? evaluation.startDate.$d : null,
      endDate: evaluation && evaluation.endDate ? evaluation.endDate.$d : null,
      workTasks:
        evaluation && evaluation.workTasks ? evaluation.workTasks : null,
      workGoals:
        evaluation && evaluation.workGoals ? evaluation.workGoals : null,
    };
    console.log('Evaluation POST request:', evaluationRequestData);

    // If all values are found send POST request for evaluation
    if (
      evaluationRequestData.degreeId !== null &&
      evaluationRequestData.customerId !== null &&
      evaluationRequestData.teacherId !== null &&
      evaluationRequestData.supervisorId !== null &&
      evaluationRequestData.workplaceId !== null &&
      evaluationRequestData.startDate !== null &&
      evaluationRequestData.endDate !== null &&
      evaluationRequestData.workTasks !== null &&
      evaluationRequestData.workGoals !== null
    ) {
      const response = await createEvaluation(evaluationRequestData);
      console.log('Evaluation POST response:', response);
      setSuccessNotification(true);
      setInternalEvaluations(); // Save evaluation to InternalApiContext
      return response._id
    } else {
      setErrorNotification(true);
    }
  };

  const matchingDegree = allInternalDegrees.find((degree) => degree._id === workplace.degreeId);

  let customerDegreeName = "No matching degree found";
  if (matchingDegree) {
    customerDegreeName = matchingDegree.name.fi;
  }

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form',
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units',
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary',
    },
  ];


  return (
    <div className='summary__wrapper'>
      <section className='summary__container'>
        <Stepper activePage={4} totalPages={4} data={stepperData} />
        <InfoList title={'Yhteenveto'} data={summaryData} />
        <h2 className='evaluation-summary-degreeName'>
          {customerDegreeName}
        </h2>
        <InfoList
          className="evaluation-summary-degreeName-infoList"
          data={unitsNameByOne}
        />
        <PageNavigationButtons
          handleBack={() => navigate(`/evaluation-units`)}
          handleForward={handleUserPostReq}
          forwardButtonText={'Lähetä kutsut'}
          showForwardButton={true}
        />
      </section>
      <NotificationModal
        type='success'
        title={
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginRight: '1rem',
            }}
          >
            Kutsut lähetetty!
          </Typography>
        }
        body={
          <Typography style={{ fontSize: '14px', marginRight: '2rem' }}>
            Sopimukseen liitetyille henkilöille on lähetetty kirjautumiskutsut.
          </Typography>
        }
        open={successNotification}
        handleClose={closeSuccessNotification}
        redirectLink='/'
      />
      <NotificationModal
        type='warning'
        title={
          <Typography
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginRight: '25px',
            }}
          >
            Suorituksen aktivoiminen epäonnistui
          </Typography>
        }
        body={
          <div style={{ padding: '10px' }}>
            <Typography style={{ fontSize: '14px' }}>
              Tarkista että kaikki kentät on täytetty.
            </Typography>
          </div>
        }
        open={errorNotification}
        handleClose={closeErrorNotification}
      />
    </div>
  );
}

export default EvaluationSummary;
