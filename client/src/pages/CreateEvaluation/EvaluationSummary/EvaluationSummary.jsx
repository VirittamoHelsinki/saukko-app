import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function EvaluationSummary() {
  const navigate = useNavigate();

  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='summary__container'>
        <div>Stepper here (waiting for update)</div>
        EvaluationSummary
        <PageNavigationButtons handleBack={() => navigate(`/evaluation-units`)} /* handleForward={() => handlePopUp()} */ forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationSummary;
