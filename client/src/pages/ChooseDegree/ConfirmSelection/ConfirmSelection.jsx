// Import react packages & dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import Button from '../../../components/Button/Button';

function ConfirmSelection() {
  const navigate = useNavigate();

  return (
    <main className='confirmSelection__wrapper'>
        <WavesHeader title='Saukko' secondTitle='Autoalan perustutkinto' /> {/* Make secondTitle dynamic later */}
        <section className='confirmSelection__container'>
          <PageNumbers activePage={3}/>
        </section>
        <UserNav />
    </main>
  );
}

export default ConfirmSelection;
