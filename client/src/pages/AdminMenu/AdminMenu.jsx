import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import { Icon } from '@iconify/react';

function AdminMenu() {
  const navigate = useNavigate();

  return (
    <main className='adminMenu__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Hallinnointi' />
      <section className='adminMenu__container'>
        <div className='menuItem__container' onClick={() => navigate('/degrees/add')}>
          <div className='menuItem__topRow'>
            <h1>Tutkintojen hallinta</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Tarkastele ja lisää tutkintoja</p>
        </div>
        <div className='menuItem__container' onClick={() => navigate('/company-info')}>
          <div className='menuItem__topRow'>
            <h1>Työpaikkojen hallinta</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Tarkastele ja lisää työpaikkoja</p>
        </div>
        <div className='menuItem__container' onClick={() => navigate('/evaluation-form')}>
          <div className='menuItem__topRow'>
            <h1>Suorituksen aktivoiminen</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Katso aktiiviset asiakkaat</p>
        </div>
      </section>
      <UserNav />
    </main>
  );

}

export default AdminMenu;
