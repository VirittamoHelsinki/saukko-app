import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useStore from '../../store/zustand/formStore';
import useEvaluationStore from '../../store/zustand/evaluationStore';
import useUnitsStore from '../../store/zustand/unitsStore';
import ExternalApiContext from '../../store/context/ExternalApiContext';
import InternalApiContext from '../../store/context/InternalApiContext';
import useHeadingStore from '../../store/zustand/useHeadingStore';

function ClientList() {
  const navigate = useNavigate();

  // Clear saved degree and unit data on first render
  const { setDegreeId } = useContext(ExternalApiContext);
  const { setEvaluation } = useContext(InternalApiContext);
  const { resetDegreeData } = useStore();
  const { clearWorkplace, clearEvaluationFromStore } = useEvaluationStore();
  const { clearCheckedUnits } = useUnitsStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  useEffect(() => {
    setSiteTitle("Asiakkuudet")
    setSubHeading("")
    setHeading("Asiakkuuksien hallinnointi")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <div className='clientList__wrapper' id='main-wrapper'>
      <section className='clientList__container'>
        <h1>client list :P 😀</h1>
      </section>
    </div>
  );

}

export default ClientList;
