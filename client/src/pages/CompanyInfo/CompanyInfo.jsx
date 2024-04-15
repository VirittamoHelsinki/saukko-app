// Import components & libraries
import { useContext } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import Button from '../../components/Button/Button';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { fetchExternalCompanyData } from '../../api/workplace';
import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import { useNavigate } from 'react-router';
import Stepper from '../../components/Stepper/Stepper';
import useStore from '../../store/zustand/formStore';
import InternalApiContext from '../../store/context/InternalApiContext';

// Import MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  // Labels and urls for Stepper
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

  return (
    <div>
      <WavesHeader
        title='Saukko'
        fill='#9fc9eb'
        secondTitle='Lisää uusi työpaikka'
      />
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
            <Typography sx={{ fontSize: '22px', fontWeight: '500px' }}>
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
              <div className='text_input businessID__search-field' style={{ padding: 0, position: 'relative' }}>
                <input type="text" id='business-id-input'
                  style={{width: '100%', height: '100%', margin: 0}}
                  name='Työpaikan Y-tunnus'
                  required
                  placeholder='1234567-6'
                  value={businessId}
                  onChange={handleBusinessId} />
                <div style={{ position: 'absolute', margin: '1em'}}>
                  <RxCrossCircled
                  style={{marginRight: '.5em'}}
                    className='cross-icone-style'
                    aria-hidden='true'
                    onClick={handleClearBusinessId}
                  />
                  <CiSearch
                    className='search-icone-style'
                    aria-hidden='true'
                    onClick={handleSearchClick}
                  />
                </div>
              </div>
              {/* <input className='text_input businessID__search-field' id='business-id-input'
                name='Työpaikan Y-tunnus'
                required
                placeholder='1234567-6'
                value={businessId}
                onChange={handleBusinessId}>
                <RxCrossCircled
                  className='cross-icone-style'
                  aria-hidden='true'
                  onClick={handleClearBusinessId}
                />
                <CiSearch
                  className='search-icone-style'
                  aria-hidden='true'
                  onClick={handleSearchClick}
                />
              </input> */}
            </div>
            {/* <IconSearch className="search-icone-style" aria-hidden="true" onClick={handleSearchClick} /> */}
            <div>
              <label
                className='workplace-form-label'
                htmlFor='company-name-input'
              >
                Työpaikka *
              </label>
              <input
                type='text'
                className='text_input businessID__search-field text_input'
                id='company-name-input'
                name='Työpaikan Y-tunnus'
                required
                value={editedCompanyName || (name && name.name) || ''}
                onChange={handleCompanyName}
              >
              </input>
            </div>

            <div className='department-container'>
              <label htmlFor='department' className='workplace-form-label'>
                {' '}
                Yksikkö (ei pakollinen){' '}
              </label>
              <input
                className='text_input businessID__search-field'
                id='department-name-input'
                name='Työpaikan yksikkö'
                onChange={handleDepartment}
              />
            </div>
          </form>
        </Accordion>
      </div>
      <div style={{ margin: '16px', marginBottom: '28px' }}>
        <Accordion
          className='heading_style'
          heading='2. Työpaikkaohjaajan tiedot'
          language='en'
          style={{
            backgroundColor: '#F2F2F2',
            paddingTop: '17px',
            paddingBottom: '17px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography sx={{ fontSize: '22px', fontWeight: '500px' }}>
              2. Työpaikkaohjaajan tiedot
            </Typography>
          </AccordionSummary>
          <form onSubmit={handleForward}>
            <div className='ohjaajat-info'>
              {supervisors
                .slice()
                .reverse()
                .map((ohjaaja, index) => (
                  <div
                    key={index}
                    style={{
                      borderBottom: '2px solid white',
                      marginTop: '9px',
                      marginBottom: '9px',
                    }}
                  >
                    <label
                      className='workplace-form-label'
                      htmlFor={`first-name-input-${index}`}
                    >
                      Etunimi *
                    </label>
                    <input
                      className='text_input businessID__search-field'
                      id={`first-name-input-${index}`}
                      name='Etunimi'
                      required
                      value={ohjaaja.firstName}
                      readOnly
                    />
                    <label
                      className='workplace-form-label'
                      htmlFor={`last-name-input-${index}`}
                    >
                      Sukunimi *
                    </label>
                    <input className='text_input businessID__search-field' id={`last-name-input-${index}`}
                      name='Sukunimi'
                      required
                      value={ohjaaja.lastName}
                      readOnly
                    />
                    <label
                      className='workplace-form-label'
                      htmlFor={`email-input-${index}`}
                    >
                      Sähköposti *
                    </label>
                    <input
                      className='text_input businessID__search-field' id={`email-input-${index}`}
                      style={{ marginBottom: '20px' }}
                      name='Sähköposti'
                      type='email'
                      required
                      value={ohjaaja.email}
                      readOnly
                    />
                  </div>
                ))}
            </div>
            <div className='ohjaja' style={{}}>
              <label
                className='workplace-form-label'
                htmlFor='first-name-input'
              >
                Etunimi *
              </label>
              <input
                className='text_input businessID__search-field'
                id='first-name-input'
                name='Etunimi'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} />
              <div>
                <label
                  className='workplace-form-label'
                  htmlFor='last-name-input'
                >
                  Sukunimi *
                </label>
                <div
                  className='text_input businessID__search-field'
                  id='last-name-input'
                  name='Sukunimi'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className='workplace-form-label' htmlFor='email-input'>
                  Sähkoposti *
                </label>
                <div
                  className='text_input businessID__search-field'
                  id='email-input'
                  name='Sähkoposti'
                  type='email'
                  required
                  value={työpaikkaohjaajaEmail}
                  onChange={(e) => setTyöpaikkaohjaajaEmail(e.target.value)}
                />
              </div>
              <Button
                text='Lisää toinen ohjaaja'
                style={{
                  marginLeft: '17%',
                  marginBottom: '30px',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  marginTop: '25px',
                  width: '65%',
                }}
                icon={'ic:baseline-plus'}
                onClick={addSupervisors}
              />
            </div>
          </form>
        </Accordion>
      </div>
      <PageNavigationButtons
        handleBack={() => navigate('/admin-menu')}
        handleForward={handleForward}
        showForwardButton={true}
      />
      <div style={{ marginBottom: '90px' }}>
        <UserNav></UserNav>
      </div>
    </div>
  );
};

export default CompanyInfo;
