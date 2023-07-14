import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function EvaluationUnits() {
  const navigate = useNavigate();

  return (
    <main className='evaluationUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationUnits__container'>
        <PageNumbers activePage={3}/>
        EvaluationUnits
        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ /* handleForward={() => navigate(`/evaluation-workplace`)} */ forwardButtonText={'Seuraava'}/>
      </section>      
      <UserNav />
    </main>
  );
}

export default EvaluationUnits;
