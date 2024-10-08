import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Stepper from '../../../components/Stepper/Stepper';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';

import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import useEvaluationStore from '../../../store/zustand/evaluationStore';
import { Typography } from '@mui/material';
import useHeadingStore from '../../../store/zustand/useHeadingStore';

function EvaluationUnits() {
  const navigate = useNavigate();

  // Get values & functions from zustand store
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  console.log('Checked units:', checkedUnits);
  const { workplace } = useEvaluationStore();
  console.log("🚀 ~ EvaluationUnits ~ workplace:", workplace)
  const { openNotificationModal, setOpenNotificationModal } = useStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();
  console.log('workplace.degreeId:', workplace.degreeId);



  useEffect(() => {
    setSiteTitle("Suorituksen aktiivoiminen"), setSubHeading("Lisää uusi asiakas"), setHeading("Asiakkuudet")
  }, [setHeading, setSiteTitle, setSubHeading]);
  // Check if at least one unit is chosen and redirect
  const handleValidation = () => {
    if (checkedUnits.length > 0) {
      navigate('/evaluation-summary');
    } else {
      setOpenNotificationModal(true);
    }
  };

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form',
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units',
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary',
    },
  ];

  return (
    <div className='evaluationUnits__wrapper'>
      <section className='evaluationUnits__container'>
        <Stepper activePage={3} totalPages={4} data={stepperData} />
        <h1>
          {workplace && workplace.name
            ? workplace.name
            : 'Ei dataa tietokannasta'}
        </h1>

        <div className='evaluationUnits__container--units'>
          {workplace && workplace.units
            ? workplace.units.map((unit) => (
              <SelectUnit
                key={unit._id}
                unit={unit}
                allUnits={workplace.units}
              />
            ))
            : 'ei dataa APIsta'}
        </div>

        <PageNavigationButtons
          handleBack={() => navigate(`/evaluation-workplace`)}
          handleForward={handleValidation}
          showForwardButton={true}
        />
      </section>
      <NotificationModal
        type='warning'
        title=
        {
          <Typography style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '25px', }}>
            Valitse tutkinnonosat
          </Typography>
        }
        body={
          <div style={{ padding: '10px' }}>
            <Typography style={{ fontSize: '14px' }}>
              Valitse ainakin yksi tutkinnonosa.
            </Typography>
          </div>
        }
        open={openNotificationModal}
      />
    </div>
  );
}

export default EvaluationUnits;
