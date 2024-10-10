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
    <div className='workplace__wrapper'>
      <section className='workplace__container'>
        <h1>Työpaikkojen hallinta</h1>
        <p>Muokkaa yksikkön tietoja</p>
      </section>
    </div>
  );
};

export default CompanySummary;
