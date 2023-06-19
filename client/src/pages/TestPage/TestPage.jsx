// Importing React packages
import React from 'react';
import useStore from '../../useStore';

// Importing components
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import NotificationModal from '../../components/NotificationModal/NotificationModal';

const TestPage = () => {
  const { password, passwordOld, passwordVerify } = useStore();
  return (
    <main className='testpage__wrapper'>
      <section className='testpage__container'>
        <PasswordInput value='passwordOld' label='Vanha salasana *' />
        <PasswordInput value='password' label='Uusi salasana *' />
        <PasswordInput value='passwordVerify' label='Vahvista salasana *' />

        <p>This is the old password: {passwordOld}</p>
        <p>This is the new password: {password}</p>
        <p>This is the verify password: {passwordVerify}</p>
      </section>

      <section>
        <NotificationModal />
      </section>
    </main>
  );
};

export default TestPage;
