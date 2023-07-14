import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

function CustomerForm() {
  const navigate = useNavigate();

  return (
    <main className='customerForm__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='customerForm__container'>
        <PageNumbers activePage={1}/>
        <h1>Lisää asiakkaan tiedot</h1>
        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ handleForward={() => navigate(`/evaluation-workplace`)} forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
};

export default CustomerForm;
