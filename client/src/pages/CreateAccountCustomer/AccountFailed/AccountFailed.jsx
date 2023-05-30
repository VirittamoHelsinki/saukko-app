// Importing react packages
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Importing components
import WavesHeader from '../../../components/Header/WavesHeader';

const AccountFailed = () => {
  const navigate = useNavigate();

  // Redirects after 5 seconds to login info page
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login-info');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className='accountFailed__wrapper'>
      <WavesHeader title='Saukko' fill='#9fc9eb' disabled='true' />
      <section className='accountFailed__container'>
        <h2>Jotain meni vikaan</h2>
        <Icon
          icon='zondicons:exclamation-solid'
          className='accountFailed__container--icon'
        />
        <p>Rekisteröinti epäonnistui. Yritä myöhemmin uudelleen.</p>
      </section>
    </main>
  );
};

export default AccountFailed;
