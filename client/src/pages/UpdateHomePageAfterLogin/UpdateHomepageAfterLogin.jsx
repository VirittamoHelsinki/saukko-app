import React from 'react';
import { Icon } from '@iconify/react';
import img from '../../assets/team-img.png';
import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import Button from '../../components/Button/Button';

const UpdateHomePageAfterLogin = () => {
  const buttonStyle = {
    color: 'var(--saukko-main-white)',
    background: 'var(--link-blue)',
    width: '85%',
    border: 'none',
    fontSize: '16px',
  };


  return (
    <main className='loggedpage__wrapper'>
      <WavesHeader
        fill='#9fc9eb'
        secondTitle='Tervetuloa, Alex'
        title='Saukko'
        disabled={true}
      />

      <section className='logged__user__container'>
        <h2>Tutkintosi suorittamispyyntö <br></br>odottaa vahvistamista</h2>
        <Icon icon="tabler:robot" style={{ height: '63px', width: '63px' }} />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor
        </p>

        <Button
          text='Selaa muita tutkintoja'
          icon={"formkit:arrowright"}
          style={buttonStyle}

        />
      </section>


      <UserNav></UserNav>
    </main>
  );
};

export default UpdateHomePageAfterLogin;





