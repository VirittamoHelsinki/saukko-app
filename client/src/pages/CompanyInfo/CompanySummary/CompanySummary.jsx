import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHeadingContext } from '../../../store/context/headingContectProvider';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

const CompanySummary = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useState({});
  const [degreeName, setDegreeName] = useState('');

  const { setHeading } = useHeadingContext();

  useEffect(() => {
    setHeading('Työpaikkojen hallinta');
  }, [setHeading]);

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
    <div className='workplace__wrapper'>
      <section className='workplace__container'>
        <div className='workplace__infolist-wrapper'>
          <h2 className='summary__container--secondtitle'>Yhteenveto</h2>
          <div className='workplace__infolist-item'>
            <h2 className='second__title'>Työpaikka</h2>
            <p className='second__paragraph'>
              {workplace ? workplace.name : ''}
            </p>
            <p className='second__paragraph'>
              {' '}
              {workplace ? workplace.businessId : ''}
            </p>
          </div>
          {workplace.departments &&
            workplace.departments.map((department) => (
              <div key={department._id} className='workplace__infolist-item'>
                <h2 className='second__title'>Yksikko</h2>
                <p className='second__paragraph'>{department.name}</p>
              </div>
            ))}
          {workplace.supervisors &&
            workplace.supervisors.map((ohjaaja) => (
              <div key={ohjaaja._id} className='workplace__infolist-item'>
                <h2 className='second__title'>Työpaikkaohjaaja</h2>
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
            ))}
        </div>
        <div className='degree-section-wrapper'>
          <h1 className='degree-name'>{degreeName}</h1>
          <div>
            {workplace.units &&
              workplace.units.map((unit) => (
                <div key={unit._id} className='degree-units'>
                  <p>{unit.name.fi}</p>
                </div>
              ))}
          </div>
        </div>
        <PageNavigationButtons
          handleBack={() => navigate(`/add/companyname`)}
          forwardButtonText={'Muokkaa tietoja'}
          showForwardButton={true}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#0000BF',
            border: '2px solid #0000BF',
          }}
          icon={'uil:pen'}
        />
      </section>
    </div>
  );
};

export default CompanySummary;
