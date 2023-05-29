// importing react packages
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// importing components
import WavesHeader from '../../../components/Header/WavesHeader';

const AccountCreated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/logged-user');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className='accountCreated__wrapper'>
      <WavesHeader title='Saukko' fill='#9fc9eb' disabled='true' />
      <section className='accountCreated__container'>
        <h2>Tili on luotu!</h2>
        <Icon icon='gg:check-o' className='accountCreated__container--icon' />
      </section>
    </main>
  );
};

export default AccountCreated;
