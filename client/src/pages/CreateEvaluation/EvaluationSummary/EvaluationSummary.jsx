// Import react packages
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import local files & components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import InfoList from '../../../components/InfoList/InfoList';
import useEvaluationStore from '../../../evaluationStore';

function EvaluationSummary() {
  const navigate = useNavigate();

  // Get customer data from store
  const customer = useEvaluationStore((state) => state.customer);
  const evaluation = useEvaluationStore((state) => state.evaluation);

  console.log('Customer from store:', customer)
  console.log('Evaluation from store:', evaluation)

  const summaryData = [
    {
      title: 'Nimi',
      content: `${customer.firstName} ${customer.lastname}`,
    },
    {
      title: 'Sähköposti',
      content: customer.email,
    },
    {
      title: 'Asiakkuuden aloituspäivä',
      content: evaluation.startDate.format('DD.MM.YYYY'),
    },
    {
      title: 'Asiakkuuden lopetuspäivä',
      content: evaluation.endDate.format('DD.MM.YYYY'),
    },
    {
      title: 'Työpaikka',
      content: '', // Fix when getting workplaces from DB
    },
    {
      title: 'Y - tunnus',
      content: '', // Fix when getting workplaces from DB
    },
    {
      title: 'Työpaikkaohjaaja',
      content: '', 
    },
  ]

  console.log('summary data', summaryData)

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='summary__container'>
        <div>Stepper here (waiting for update)</div>
        <InfoList title={'Yhteenveto'} data={summaryData}/>
        <PageNavigationButtons handleBack={() => navigate(`/evaluation-units`)} /* handleForward={() => handlePopUp()} */ forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationSummary;
