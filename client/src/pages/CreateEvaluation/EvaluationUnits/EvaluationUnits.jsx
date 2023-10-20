import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Stepper from '../../../components/Stepper/Stepper';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import useEvaluationStore from '../../../store/zustand/evaluationStore';

function EvaluationUnits() {
  const navigate = useNavigate();

  // Get values & functions from zustand store
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  console.log('Checked units:', checkedUnits);
  const { workplace } = useEvaluationStore();
  const { openNotificationModal, setOpenNotificationModal } = useStore();

  // Check if at least one unit is chosen and redirect
  const handleValidation = () => {
    if (checkedUnits.length > 0) {
      navigate('/evaluation-summary')
    } else {
      setOpenNotificationModal(true);
    }
  };

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form'
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace'
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units'
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary'
    },
  ];
  
  return (
    <main className='evaluationUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationUnits__container'>
        <Stepper
            activePage={3}
            totalPages={4}
            data={stepperData}
        />
        <h1>{workplace && workplace.name ? workplace.name : 'Ei dataa tietokannasta'}</h1>

        <div className='evaluationUnits__container--units'>
          { workplace && workplace.units ? 
            workplace.units.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={workplace.units}/>
            ))
          : 'ei dataa APIsta'}
        </div>

        <PageNavigationButtons handleBack={() => navigate(`/evaluation-workplace`)} handleForward={handleValidation}/>
      </section>      
      <UserNav />
      <NotificationModal
        type='warning'
        title='Valitse tutkinnonosat'
        body='Valitse ainakin yksi tutkinnonosa'
        open={openNotificationModal}
      />
    </main>
  );
}

export default EvaluationUnits;
