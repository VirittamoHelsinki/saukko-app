import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function ActivateEvaluation() {
  const navigate = useNavigate();

  return (
    <main className='activateEvaluation__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='activateEvaluation__container'>
        <PageNumbers activePage={4}/>
        ActivateEvaluation
        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ /* handleForward={() => handlePopUp()} */ forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
}

export default ActivateEvaluation;
