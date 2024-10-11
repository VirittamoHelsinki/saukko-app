import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Checkbox, FormControlLabel, Switch } from '@mui/material';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import AddSupervisorModal from '../../../components/AddSupervisorModal/AddSupervisorModal';

const CompanySummary = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useState({});
  const [degreeName, setDegreeName] = useState('');

  // Modal state
  const [isSupervisorModalOpen, setIsSupervisorModalOpen] = useState(false);

  // Workplace unit state
  const [unitName, setUnitName] = useState(''); // Yksikön nimi
  const [supervisors, setSupervisors] = useState([]); // Yksikön ohjaajat
  const [assessments, setAssessments] = useState([]); // Yksikön tutkinnonosat
  const [archive, setArchive] = useState(false); // Yksikön arkistointi

  const { setHeading } = useHeadingStore();



  useEffect(() => {
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get(`/api/workplace/${companyId}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch workplace data', error);
      }
    };

    const fetchDegreeName = async (degreeId) => {
      try {
        const response = await axios.get(`/api/internal/degree/${degreeId}`);
        return response.data.name.fi;
      } catch (error) {
        console.error('Failed to fetch degree data', error);
      }
    };

    fetchWorkplaces().then((workplaceData) => {
      if (workplaceData && workplaceData.degreeId) {
        console.log(workplace);
        
        setWorkplace(workplaceData);
        fetchDegreeName(workplaceData.degreeId).then((degreeName) => {
          if (degreeName) {
            setDegreeName(degreeName);
          }
        });
      }
    });
  }, [companyId]);

  return (
    <div className='unit-edit__wrapper'>
      <section className='unit-edit__container'>
        <div className="unit-edit__header">
          <h1>Työpaikkojen hallinta</h1>
          <p>Muokkaa yksikkön tietoja</p>
        </div>

        <div className='unit-edit__info'>
          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Työpaikka</h2>
              <p className='second__paragraph'>
                Helsingin kaupunki
              </p>
              <p className='second__paragraph'>
                070-5658-9
              </p>
            </div>

          </div>

          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Yksikkö</h2>
              <p className='second__paragraph'>
                {workplace ? workplace.name : '-'}
              </p>
            </div>

            { /* empty div to make the grid look proper */ }
            <div></div>

            <button
              className="button edit"
            >
              <Icon icon={"mingcute:pencil-line"} fontSize={20} />
            </button>
          </div>

          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Yksikön lisätiedot</h2>
              <p className='second__paragraph'>
                { workplace?.info ? workplace.info : "-"}
              </p>
            </div>
          </div>

          {workplace.supervisors &&
            workplace.supervisors.map((supervisor) => (
              <div key={supervisor._id} className='unit-edit__item'>
                <div className="unit-edit__text-container">
                  <h2 className='second__title'>Ohjaaja</h2>
                  <p className='second__paragraph'>
                    { `${supervisor?.firstName} ${supervisor?.lastName} `}
                    { supervisor?.archived && <span style={{ color: 'red', fontSize: 14, fontStyle: "italic", }}>(Arkistoitu)</span> }
                  </p>
                  <p
                    className='second__paragraph'
                    style={{ marginBottom: '10px' }}
                  >
                    {supervisor?.email}
                  </p>
                </div>

                { /* empty div to make the grid look proper */ }
                <div></div>

                <button className="button edit">
                  <Icon icon={"mingcute:pencil-line"} fontSize={20} />
                </button>
              </div>
            ))}

          <div className='unit-edit__item'>
            <button className="new-supervisor" onClick={() => setIsSupervisorModalOpen(true)}>
              + Lisää uusi ohjaaja
            </button>
          </div>

          <div className="unit-edit__item">
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Tutkinnon nimi</h2>
              <p className='second__paragraph'>{degreeName}</p>
            </div>
          </div>


          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Tutkinnon osat</h2>
              {
                workplace.units && workplace.units.map((unit) => (
                  <p key={unit._id} className='second__paragraph'>{unit.name.fi}</p>
                ))
              }
            </div>

            { /* empty div to make the grid look proper */ }
            <div></div>

            <button className="button edit">
              <Icon icon={"mingcute:pencil-line"} fontSize={20} />
            </button>
          </div>

          <div className="archive-toggle-container">
            <FormControlLabel
              control={<Checkbox checked={false} onChange={() => {}} color="primary" />}
              label="Arkistoi yksikkö"
            />
          </div>
        </div>

        <PageNavigationButtons
          handleBack={() => navigate(`/add/companyname/${companyId}`)}
          handleForward={() => {}}
          forwardButtonText="Tallenna muutokset"
          showForwardButton={true}
          icon={<div></div>} // empty div to hide the icon
        />

        <AddSupervisorModal
          isOpen={isSupervisorModalOpen}
          onClose={() => setIsSupervisorModalOpen(false)}
          //setSupervisors={setSupervisors}
          //supervisors={supervisors}
        />

      </section>
    </div>
  );
};

export default CompanySummary;
