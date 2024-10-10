import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useHeadingStore from '../../../store/zustand/useHeadingStore';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

const CompanySummary = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useState({});
  const [degreeName, setDegreeName] = useState('');

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
            workplace.supervisors.map((ohjaaja) => (
              <div key={ohjaaja._id} className='unit-edit__item'>
                <div className="unit-edit__text-container">
                  <h2 className='second__title'>Ohjaaja</h2>
                  <p className='second__paragraph'>
                    {ohjaaja?.firstName} {ohjaaja?.lastName}
                  </p>
                  <p
                    className='second__paragraph'
                    style={{ marginBottom: '10px' }}
                  >
                    {ohjaaja?.email}
                  </p>
                </div>
              </div>
            ))}
            
          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>{degreeName}</h2>
              {
                workplace.units && workplace.units.map((unit) => (
                  <p key={unit._id} className='second__paragraph'>{unit.name.fi}</p>
                ))
              }
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default CompanySummary;
