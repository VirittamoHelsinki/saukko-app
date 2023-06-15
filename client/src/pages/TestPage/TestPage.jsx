// Importing React packages
import React from 'react';

// Importing components
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const TestPage = () => {
  return (
    <main className='testpage__wrapper'>
      <section className='testpage__container'>
        <PasswordInput label='Vanha salasana *' />
        <PasswordInput label='Uusi salasana *' />
        <PasswordInput label='Vahvista salasana *' />
      </section>
    </main>
  );
};

export default TestPage;
