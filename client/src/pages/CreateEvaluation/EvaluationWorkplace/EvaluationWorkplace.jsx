import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function EvaluationWorkplace() {
  const navigate = useNavigate();

  return (
    <main className='evaluationWorkplace__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationWorkplace__container'>
        <PageNumbers activePage={2}/>
        EvaluationWorkplace
        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ /* handleForward={() => navigate(`/evaluation-workplace`)} */ forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
}

export default EvaluationWorkplace;

