import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function EvaluationUnits() {
  const navigate = useNavigate();

  return (
    <main className='evaluationUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationUnits__container'>
        EvaluationUnits
        <PageNavigationButtons handleBack={() => navigate(`/evaluation-workplace`)} handleForward={() => navigate(`/evaluation-summary`)} forwardButtonText={'Seuraava'}/>
      </section>      
      <UserNav />
    </main>
  );
}

export default EvaluationUnits;
