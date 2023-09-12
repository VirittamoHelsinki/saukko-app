// Importing React packages
import React from 'react';
import useStore from '../../store/useStore';

// Importing components
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import InfoList from '../../components/InfoList/InfoList';
import Button from '@mui/material/Button';
import PerformancesFeedback from '../../components/PerformancesFeedback/PerformancesFeedback'

const TestPage = () => {
  const {
    password,
    passwordOld,
    passwordVerify,
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleClickOpen = () => {
    setOpenNotificationModal(true);
  };

  const data = [
    {
      title: 'Asiakkaan nimi',
      content: 'Alex Tenerio',
    },
    {
      title: 'Koulutus',
      content: 'Tieto- ja viestintätekniikan perustutkinto',
    },
    {
      title: 'Työpaikka',
      content: 'Lorem ipsum OY',
    },
    {
      title: 'Opettaja',
      content: 'Sanna Virtanen',
    },
    {
      title: 'Ohjaaja',
      content: 'Jonna Koskinen',
    },
  ];

  return (
    <main className='testpage__wrapper'>
      <InfoList title='tiedot' data={data} />

      <section className='testpage__container'>
        <PasswordInput value='passwordOld' label='Vanha salasana *' />
        <PasswordInput value='password' label='Uusi salasana *' />
        <PasswordInput value='passwordVerify' label='Vahvista salasana *' />

        <p>This is the old password: {passwordOld}</p>
        <p>This is the new password: {password}</p>
        <p>This is the verify password: {passwordVerify}</p>
      </section>

      <section>
        <NotificationModal
          type='warning'
          title='Vahvistus ei onnistunut'
          body='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia tempore porro ex repudiandae. Architecto, ad voluptatem! Libero ad harum sint tempore ex enim dignissimos, corporis fugiat quasi veniam! Possimus, iste!'
          open={openNotificationModal}
        />

        <Button variant='outlined' onClick={handleClickOpen}>
          Open dialog
        </Button>
      </section>
      <section >
        {/* <PerformancesFeedback></PerformancesFeedback> */}
      </section>
    </main>
  );
};

export default TestPage;
