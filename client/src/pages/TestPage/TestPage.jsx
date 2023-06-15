// Importing React packages
import React from 'react';

// Importing components
import PasswordInput from '../../components/PasswordInput/PasswordInput';

const TestPage = () => {
  return (
    <main className='testpage__wrapper'>
      <section className='testpage__container'>
        <PasswordInput textLabel='Password *' />
        <PasswordInput />
      </section>
    </main>
  );
};

export default TestPage;
