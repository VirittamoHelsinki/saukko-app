import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useStore from '../../store/zustand/formStore';
import useEvaluationStore from '../../store/zustand/evaluationStore';
import useUnitsStore from '../../store/zustand/unitsStore';
import ExternalApiContext from '../../store/context/ExternalApiContext';
import InternalApiContext from '../../store/context/InternalApiContext';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Aktiiviset asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Arkistoidut asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>

      </section>
    </div>
  );

}

export default ClientList;
