import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import { Icon } from '@iconify/react';
import useStore from '../../store/zustand/formStore';
import useEvaluationStore from '../../store/zustand/evaluationStore';
import useUnitsStore from '../../store/zustand/unitsStore';
import ExternalApiContext from '../../store/context/ExternalApiContext';
import InternalApiContext from '../../store/context/InternalApiContext';

function AdminMenu() {
  const navigate = useNavigate();

  // Clear saved degree and unit data on first render
  const { setDegreeId } = useContext(ExternalApiContext);
  const { setEvaluation } = useContext(InternalApiContext);
  const { resetDegreeData } = useStore();
  const { clearWorkplace, clearEvaluationFromStore } = useEvaluationStore();
  const { clearCheckedUnits } = useUnitsStore();

  useEffect(() => {
    resetDegreeData()
    setDegreeId('')
    setEvaluation(null)
    clearEvaluationFromStore()
    clearWorkplace()
    clearCheckedUnits()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='adminMenu__wrapper' id='main-wrapper'>
      <WavesHeader title='Saukko' secondTitle='Hallinnointi' />
      <section className='adminMenu__container'>
        <div className='menuItem__container' id='degrees-menu-item' onClick={() => navigate('/degrees/add')}>
          <div className='menuItem__topRow'>
            <h1>Tutkintojen hallinta</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Tarkastele ja lisää tutkintoja</p>
        </div>
        <div className='menuItem__container' id='jobs-menu-item' onClick={() => navigate('/add/companyname')}>
          <div className='menuItem__topRow'>
            <h1>Työpaikkojen hallinta</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Tarkastele ja lisää työpaikkoja</p>
        </div>
        <div className='menuItem__container' id='evaluation-menu-item' onClick={() => navigate('/evaluation-form')}>
          <div className='menuItem__topRow'>
            <h1>Suorituksen aktivoiminen</h1>
            <Icon icon="formkit:arrowright" />
          </div>
          <p>Lisää uusi asiakkuus</p>
        </div>
      </section>
      <UserNav />
    </main>
  );

}

export default AdminMenu;
