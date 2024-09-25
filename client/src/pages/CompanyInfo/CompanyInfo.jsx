// Import components & libraries
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import Stepper from '../../components/Stepper/Stepper';

import { fetchExternalCompanyData } from '../../api/workplace';
import useStore from '../../store/zustand/formStore';
import InternalApiContext from '../../store/context/InternalApiContext';

import { CiSearch } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '@iconify/react/dist/iconify.js';
import useHeadingStore from '../../store/zustand/useHeadingStore';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const {
    businessId,
    setBusinessId,
    businessIDError,
    setBusinessIdError,
    name,
    setName,
    // eslint-disable-next-line no-unused-vars
    departments,
    setDepartmentName,
    editedCompanyName,
    setEditedCompanyName,
    supervisors,
    setSupervisors,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    työpaikkaohjaajaEmail,
    setTyöpaikkaohjaajaEmail,
  } = useStore();

  const { internalDegree } = useContext(InternalApiContext);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  useEffect(() => {
    setSiteTitle("Lisää työpaikka")
    setSubHeading("Lisää uusi työpaikka")
    setHeading("Työpaikkojen hallinta")
  }, [setSiteTitle, setSubHeading, setHeading]);

  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/company-info',
    },
    {
      label: 'Valitse tutkinto',
      url: '/internal/degrees',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/internal/degrees/${internalDegree._id}/units`,
    },
    {
      label: 'Vahvista',
      url: `/internal/degrees/${internalDegree._id}/units/confirm-selection`,
    },
  ];

  const handleBusinessId = (event) => {
    const value = event.target.value;

    const regex = /^[0-9]{7}-[0-9]$/;

    setBusinessId(value);
    setName('');

    if (regex.test(value)) {
      setBusinessIdError('');
    } else {
      setBusinessIdError('Invalid format');
    }
  };

  const handleCompanyName = (event) => {
    const value = event.target.value;
    setEditedCompanyName(value);
  };

  const handleDepartment = (event) => {
    setDepartmentName({ name: event.target.value });
  };

  const fetchCompanyName = async (businessID) => {
    try {
      const data = await fetchExternalCompanyData(businessID);

      setName(data);
      console.log('Company Name:', data);
    } catch (error) {
      throw new Error('Failed to fetch company name');
    }
  };

  const handleClearBusinessId = () => {
    setBusinessId('');
    setName(null);
    setBusinessIdError('');
  };

  const handleSearchClick = async () => {
    if (!businessIDError && businessId) {
      try {
        if (editedCompanyName) {
          setName(editedCompanyName);
        } else {
          await fetchCompanyName(businessId);
        }
      } catch (error) {
        console.error('Failed to fetch company name:', error);
      }
    }
  };

  const deleteSupervisor = (index) => {
    setSupervisors(supervisors.filter((_, i) => i !== index))
  }

  // Function to create a new supervisor object
  const createSupervisor = (firstName, lastName, työpaikkaohjaajaEmail) => {
    return {
      firstName,
      lastName,
      email: työpaikkaohjaajaEmail,
      role: 'supervisor',
      workplaceId: businessId
    };
  };
  //Adding the supervisors
  const addSupervisors = () => {
    if (firstName && lastName && työpaikkaohjaajaEmail) {

      const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      if (!emailPattern.test(työpaikkaohjaajaEmail)) {
        return;
      }

      const newSupervisor = createSupervisor(
        firstName,
        lastName,
        työpaikkaohjaajaEmail
      );
      setSupervisors([...supervisors, newSupervisor]);
      setFirstName('');
      setLastName('');
      setTyöpaikkaohjaajaEmail('');
    }
  };

  const handleForward = (e) => {
    e.preventDefault();

    // Form validation: check for empty fields
    if (
      !businessId ||
      (!name && !editedCompanyName) ||
      supervisors.length === 0
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Navigate to next page
    navigate(`../internal/degrees`);
  };

  return (
    <div className='companyInfo__wrapper'>

      <h1>Työpaikkojen hallinnointi</h1>
      <h2>Lisää uusi yksikkö</h2>

      <div className='info__stepper__container'>
        <Stepper activePage={1} totalPages={4} data={stepperData} />
      </div>


      <div className="card">
        <p>Työpaikan tiedot</p>
        <table>
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Y-tunnus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Helsingin kaupunki</td>
              <td>070-5658-9</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p>Yksikön tiedot</p>

        <div className="card__field">
          <label htmlFor='department' className=''>
            Yksikön nimi
          </label>
          <input
            className='text_input'
            id='department-name-input'
            name='Työpaikan yksikkö'
            onChange={handleDepartment}
          />
        </div>

        <div className="card__field">
          <label htmlFor='department' className=''>
            Yksikön nimi
          </label>
          <textarea
            className='text_input'
            id='department-name-input'
            name='Työpaikan yksikkö'
            rows={8}
            onChange={handleDepartment}
          />
        </div>
      </div>
    

      <PageNavigationButtons
        handleBack={() => navigate('/add/companyname')}
        handleForward={handleForward}
        showForwardButton={true}
        disabled={supervisors.length === 0}
      />
    </div>
  );
};

export default CompanyInfo;
