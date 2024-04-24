// Import react packages
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InfoList from '../../../components/InfoList/InfoList';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import useEvaluationFormStore from '../../../store/zustand/evaluationFormStore';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import Stepper from '../../../components/Stepper/Stepper';

// Import state management
import useUnitsStore from '../../../store/zustand/unitsStore';

// Import API call functions
import { registration } from '../../../api/user';
import { createEvaluation } from '../../../api/evaluation';
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useAuthContext } from '../../../store/context/authContextProvider';

function EvaluationSummary() {
  const navigate = useNavigate();

  // Get data from store management
  const { workplace, department, supervisor } = useEvaluationStore();
  const { customer, evaluation, resetFormData } = useEvaluationFormStore(); // Include resetFormData
  const { checkedUnits } = useUnitsStore();
  const { currentUser } = useAuthContext();
  const { setInternalEvaluations } = useContext(InternalApiContext);

  // NotificationModal
  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);

  const closeSuccessNotification = () => setSuccessNotification(false);
  const closeErrorNotification = () => setErrorNotification(false);

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
      title: 'Työpaikkaohjaaja',
      content: supervisor
        ? `${supervisor.firstName} ${supervisor.lastName}`
        : '',
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

  const handleUserPostReq = async () => {
    // Format data
    const userRequestData = {
      firstName: customer && customer.firstName ? customer.firstName : null,
      lastName: customer && customer.lastName ? customer.lastName : null,
      email: customer && customer.email ? customer.email : null,
      password: '123456',
      role: 'customer',
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
      handleEvaluationPostReq(userId);

      // Reset form data after successful submission
      resetFormData();
    } else {
      setErrorNotification(true);
    }
  };

  const handleEvaluationPostReq = async (userId) => {
    // Format evaluation data
    const evaluationRequestData = {
      degreeId: workplace && workplace.degreeId ? workplace.degreeId : null,
      customerId: userId,
      teacherId: currentUser && currentUser.id ? currentUser.id : null,
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
    } else {
      setErrorNotification(true);
    }
  };

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
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='summary__container'>
        <Stepper activePage={4} totalPages={4} data={stepperData} />
        <InfoList title={'Yhteenveto'} data={summaryData} />
        <h1>
          {workplace && workplace.name
            ? workplace.name
            : 'Ei dataa tietokannasta'}
        </h1>
        {checkedUnits?.map((unit) => (
          <SelectUnit
            key={unit._id}
            unit={unit}
            allUnits={checkedUnits && checkedUnits}
          />
        ))}
        <PageNavigationButtons
          handleBack={() => navigate(`/evaluation-units`)}
          handleForward={handleUserPostReq}
          forwardButtonText={'Tallenna'}
          showForwardButton={true}
        />
      </section>
      <UserNav />
      <NotificationModal
        type='success'
        title='Suorituksen aktivoiminen onnistui'
        body='Asiakkaan tiedot tallennettu'
        open={successNotification}
        handleClose={closeSuccessNotification}
        redirectLink='/'
      />
      <NotificationModal
        type='warning'
        title='Suorituksen aktivoiminen epäonnistui'
        body='Tarkista että kaikki kentät on täytetty'
        open={errorNotification}
        handleClose={closeErrorNotification}
      />
    </main>
  );
}

export default EvaluationSummary;
