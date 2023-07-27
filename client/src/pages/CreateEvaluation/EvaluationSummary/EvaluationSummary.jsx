// Import react packages
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InfoList from '../../../components/InfoList/InfoList';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import useEvaluationStore from '../../../evaluationStore';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import useUnitsStore from '../../../unitsStore';
import useStore from '../../../useStore';

function EvaluationSummary() {
  const navigate = useNavigate();

  // Get data & functions from evaluationStore
  const customer = useEvaluationStore((state) => state.customer);
  const evaluation = useEvaluationStore((state) => state.evaluation);
  const workplace = useEvaluationStore((state) => state.workplace);
  const supervisor = useEvaluationStore((state) => state.supervisor);
  const clearEvaluation = useEvaluationStore((state) => state.clearEvaluation);

  console.log('Customer from store:', customer);
  console.log('Evaluation from store:', evaluation);
  console.log('Workplace from store:', workplace);
  console.log('Supervisor from store:', supervisor);

  // Get data & functions from unitsStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

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
      title: 'Työpaikkaohjaaja',
      content: supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : '',
    },
  ];
  console.log('summary data', summaryData);

  // NotificationModal logic
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleSendToServer = () => {
    // Create user in DB with temporary password and send invitation email
    // Create evaluation in DB with user._id from DB

    // Clear data from storage
    clearEvaluation();
    clearCheckedUnits();

    // Trigger NotificationModal
    setOpenNotificationModal(true);
  }

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='summary__container'>
        <div>Stepper here (waiting for update)</div>
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
        redirectLink='/userdashboard'
      />
    </main>
  );
}

export default EvaluationSummary;
