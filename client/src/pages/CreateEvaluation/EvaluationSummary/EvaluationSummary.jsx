// Import react packages
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InfoList from '../../../components/InfoList/InfoList';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import Stepper from '../../../components/Stepper/Stepper';
import useUnitsStore from '../../../store/zustand/unitsStore';
import useStore from '../../../store/zustand/formStore';

function EvaluationSummary() {
  const navigate = useNavigate();

  // Get data from store management
  const { customer, evaluation, workplace, department, supervisor, clearEvaluation } = useEvaluationStore();
  const { checkedUnits, clearCheckedUnits } = useUnitsStore();

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
      content: evaluation ? evaluation.endDate.format('DD.MM.YYYY'): '',
    },
    {
      title: 'Työpaikka',
      content: workplace ? workplace.name : '', 
    },
    {
      title: 'Y - tunnus',
      content:  workplace ? workplace.businessId : '',
    },
    {
      title: 'Työpaikanyksikkö',
      content:  department ? department.name : '',
    },
    {
      title: 'Työpaikkaohjaaja',
      content: supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : '',
    },
  ];
  console.log('summary data', summaryData);

  // Remove department from array if there is no department
  if (!department) {
    const indexToRemove = summaryData.findIndex(item => item.title === 'Työpaikanyksikkö');
    if (indexToRemove !== -1) {
      summaryData.splice(indexToRemove, 1);
    }
  }

  // NotificationModal logic
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleSendToServer = () => {

    // Clear data from storage
    clearEvaluation();
    clearCheckedUnits();

    // Trigger NotificationModal
    setOpenNotificationModal(true);
  }

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form'
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace'
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units'
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary'
    },
  ];
  
  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='summary__container'>
        <Stepper
            activePage={4}
            totalPages={4}
            data={stepperData}
        />
        <InfoList title={'Yhteenveto'} data={summaryData}/>
        <h1>Degree name (FIX THIS)</h1> {/* Degree name from workplace */}
        {console.log(console.log('checked units evaluation summary page: ', checkedUnits))}
        {checkedUnits?.map((unit) => (
          <SelectUnit key={unit._id} unit={unit} allUnits={checkedUnits && checkedUnits}/>
        ))}
        <PageNavigationButtons 
          handleBack={() => navigate(`/evaluation-units`)} 
          handleForward={handleSendToServer}
          forwardButtonText={'Seuraava'}
        />
      </section>
      <UserNav />
      <NotificationModal
        type='success'
        title='Kutsut lähetetty!'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}
        redirectLink='/admin-menu'
      />
    </main>
  );
}

export default EvaluationSummary;
