// Import components & libraries
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import Stepper from '../../components/Stepper/Stepper';

import { fetchExternalCompanyData } from '../../api/workplace';
import useStore from '../../store/zustand/formStore';
import InternalApiContext from '../../store/context/InternalApiContext';
import { useHeadingContext } from '../../store/context/headingContectProvider';

import { CiSearch } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '@iconify/react/dist/iconify.js';

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
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

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
    };
  };
  //Adding the supervisors
  const addSupervisors = () => {
    if (firstName && lastName && työpaikkaohjaajaEmail) {
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
      !firstName ||
      !lastName ||
      !työpaikkaohjaajaEmail
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Form validation: Regex for email format
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (!emailPattern.test(työpaikkaohjaajaEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Create supervisor & save to temporary storage
    if (firstName && lastName && työpaikkaohjaajaEmail) {
      const newSupervisor = createSupervisor(
        firstName,
        lastName,
        työpaikkaohjaajaEmail
      );
      addSupervisors(newSupervisor);
    }

    // Navigate to next page
    navigate(`../internal/degrees`);
  };

  console.log("wtf", supervisors);

  return (
    <div className='companyInfo__wrapper'>
      <div className='info__stepper__container'>
        <Stepper activePage={1} totalPages={4} data={stepperData} />
      </div>
      <div style={{ margin: '16px', marginBottom: '28px', marginTop: '60px' }}>
        <Accordion
          className='heading_style'
          sx={{
            backgroundColor: '#F2F2F2',
            paddingTop: '17px',
            paddingBottom: '20px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography 
              sx={{ fontSize: '22px' }}>
              1. Työpaikka tiedot
            </Typography>
          </AccordionSummary>
          <form onSubmit={handleForward}>
            <div>
              <label
                className='workplace-form-label'
                htmlFor='business-id-input'
              >
                Työpaikan Y-tunnus *
              </label>
              <div className='text_input businessID__search-field'>
                <input
                  type='text'
                  id='business-id-input'
                  className='text_input_businessID'
                  name='Työpaikan Y-tunnus'
                  required
                  placeholder='1234567-6'
                  value={businessId}
                  onChange={handleBusinessId}
                />
                <RxCrossCircled
                  className='cross-icon-style'
                  aria-hidden='true'
                  onClick={handleClearBusinessId}
                />
                <CiSearch
                  className='search-icon-style'
                  aria-hidden='true'
                  onClick={handleSearchClick}
                />
              </div>
              <label
                className='workplace-form-label'
                htmlFor='company-name-input'
              >
                Työpaikka *
              </label>
              <div className='text_input businessInformation'>
                <input
                  type='text'
                  className='text_input_businessInformation'
                  id='company-name-input'
                  name='Työpaikan Y-tunnus'
                  required
                  value={editedCompanyName || (name && name.name) || ''}
                  onChange={handleCompanyName}
                ></input>
              </div>
              <label htmlFor='department' className='workplace-form-label'>
                Yksikkö (ei pakollinen)
              </label>
              <div className='text_input businessInformation'>
                <input
                  className='text_input_businessInformation'
                  id='department-name-input'
                  name='Työpaikan yksikkö'
                  onChange={handleDepartment}
                />
              </div>
            </div>
          </form>
        </Accordion>
      </div>
      <div style={{ margin: '16px', marginBottom: '28px' }}>
        <Accordion
          className='heading_style'
          heading='2. Työpaikkaohjaajan tiedot'
          language='en'
          sx={{
            backgroundColor: '#F2F2F2',
            paddingTop: '17px',
            paddingBottom: '20px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography sx={{ fontSize: '22px' }}>
              2. Työpaikkaohjaajan tiedot
            </Typography>
          </AccordionSummary>
          <div className='ohjaajat-info'>
            {supervisors
              .map((ohjaaja, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: '4px solid white',
                    marginTop: '9px',
                    marginBottom: '9px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                  }}
                >
                  <div className='supervisor-information'>
                    <div className='field'>
                      <p className='field-name'>Etunimi:</p>
                      <p className='field-value'>{ohjaaja.firstName}</p>
                    </div>
                    <div className='field'>
                      <p className='field-name'>Sukunimi:</p>
                      <p className='field-value'>{ohjaaja.lastName}</p>
                    </div>
                    <div className='field'>
                      <p className='field-name'>Sähköposti:</p>
                      <p className='field-value'>{ohjaaja.email}</p>
                    </div>
                  </div>

                  <div className="delete-edit-buttons">
                    <button className="button--secondary" onClick={() => deleteSupervisor(index)}>
                      <Icon icon={'lucide:trash'} color="red" />
                      <span>Poista</span>
                    </button>
                    <button className="button--primary" onClick={() => {}} disabled>
                      <Icon icon={'lucide:plus'} />
                      <span>Muokkaa</span>
                    </button>
                  </div>

                </div>
              ))}
          </div>


          <form onSubmit={handleForward}>
            <div>
              <label
                className='workplace-form-label'
                htmlFor='first-name-input'
              >
                Etunimi *
              </label>
              <div className='text_input supervisorInformation'>
                <input
                  className='text_input_supervisorInformation'
                  id='first-name-input'
                  name='Etunimi'
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <label className='workplace-form-label' htmlFor='last-name-input'>
                Sukunimi *
              </label>
              <div className='text_input supervisorInformation'>
                <input
                  className='text_input_supervisorInformation'
                  id='last-name-input'
                  name='Sukunimi'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <label className='workplace-form-label' htmlFor='email-input'>
                Sähkoposti *
              </label>
              <div className='text_input supervisorInformation'>
                <input
                  className='text_input_supervisorInformation'
                  id='email-input'
                  name='Sähkoposti'
                  type='email'
                  required
                  value={työpaikkaohjaajaEmail}
                  onChange={(e) => setTyöpaikkaohjaajaEmail(e.target.value)}
                />
              </div>
              <Button
                text='Lisää ohjaaja'
                style={{
                  marginLeft: '17%',
                  marginBottom: '30px',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  marginTop: '25px',
                  width: '65%',
                  border: 'none',
                }}
                icon={'ic:baseline-plus'}
                onClick={addSupervisors}
              />
            </div>


          </form>
        </Accordion>
      </div>
      <PageNavigationButtons
        handleBack={() => navigate('/add/companyname')}
        handleForward={handleForward}
        showForwardButton={true}
      />
    </div>
  );
};

export default CompanyInfo;
