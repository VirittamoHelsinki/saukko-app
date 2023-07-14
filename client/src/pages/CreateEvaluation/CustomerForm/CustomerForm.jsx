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

        {/* Customer information form */}
        <form>
          <div className='form__firstName'>
            <label>Etunimi *</label>
            <input />
          </div>
          <div className='form__lastName'>
            <label>Sukunimi *</label>
            <input />
          </div>
          <div className='form__email'>
            <label>Sähköposti *</label>
            <input type='email'/>
          </div>
          <div className='form__startDate'>
            <label>Asiakkuuden aloituspäivä *</label>
            <input type='date'/>
          </div>
          <div className='form__endDate'>
            <label>Asiakkuuden lopetuspäivä *</label>
            <input type='date'/>
          </div>
          <div className='form__extensionEndDate'>
            <label>Täydennysjakson päättymispäivä *</label>
            <input type='date'/>
          </div>
          <div className='form__tasks'>
            <label>Työtehtäväsi *</label>
            <textarea />
          </div>
          <div className='form__goals'>
            <label>Omat tavoitteesi *</label>
            <textarea />
          </div>
        </form>

        <PageNavigationButtons /* handleBack={() => navigate(`/`)} */ handleForward={() => navigate(`/evaluation-workplace`)} forwardButtonText={'Seuraava'}/>
      </section>
      <UserNav />
    </main>
  );
};

export default CustomerForm;
