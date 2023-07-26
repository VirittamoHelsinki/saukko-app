import React, { useEffect, useRef } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { scroller } from 'react-scroll';
import { TextInput } from 'hds-react';
import { Icon } from '@iconify/react';
import { IconCrossCircle, IconSearch } from 'hds-react';
import Button from '../../components/Button/Button';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import useStore from '../../useStore';
import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';




const CompanyInfo = () => {
  const {
    businessID,
    setBusinessId,
    businessIDError,
    setBusinessIdError,
    companyName,
    setCompanyName,
    editedCompanyName,
    setEditedCompanyName,
    työpaikkaohjaajat,
    setTyöpaikkaohjaajat,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    työpaikkaohjaajaEmail,
    setTyöpaikkaohjaajaEmail,
    setEmail,
    setEmailError,
  } = useStore();

  const pageNavigationRef = useRef(null);

  const handleBusinessId = (event) => {
    const value = event.target.value;

    const regex = /^[0-9]{7}-[0-9]$/;

    setBusinessId(value);
    setCompanyName('');

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


  const fetchCompanyName = async (businessID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/business/${businessID}`);
      if (!response.ok) {
        setCompanyName('');
        throw new Error('Failed to fetch company name');
      }
      const data = await response.json();
      setCompanyName(data);
    } catch (error) {
      throw new Error('Failed to fetch company name');
    }
  };

  const handleClearBusinessId = () => {
    setBusinessId('');
    setCompanyName(null);
    setBusinessIdError('');
  };

  const handleSearchClick = async () => {
    if (!businessIDError && businessID) {
      try {
        if (editedCompanyName) {
          setCompanyName(editedCompanyName);
        } else {
          await fetchCompanyName(businessID);
        }
      } catch (error) {
        console.error('Failed to fetch company name:', error);
      }
    }
  };

  const addTyöpaikkaohjaaja = (event) => {
    event.preventDefault();
    if (firstName && lastName && työpaikkaohjaajaEmail) {
      const newTyöpaikkaohjaaja = {
        firstName,
        lastName,
        email: työpaikkaohjaajaEmail,
        role: 'supervisor'
      };
      setTyöpaikkaohjaajat([...työpaikkaohjaajat, newTyöpaikkaohjaaja]);
      setFirstName('');
      setLastName('');
      setTyöpaikkaohjaajaEmail('');

    }
  };

  return (

    <div>
      <WavesHeader title='Saukko' fill='#9fc9eb' secondTitle='Lisää uusi työpaikka' />
      <div style={{ margin: '16px', marginBottom: '28px', marginTop: '300px' }}>
        <Accordion
          className="heading_style"
          sx={{ backgroundColor: '#F2F2F2', paddingTop: '17px', paddingBottom: '20px' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: '22px', fontWeight: '500px' }}>1. Työpaikka tiedot</Typography>
          </AccordionSummary>
          <form >
            <div>
              <label className="työpaikkä_tiedot" htmlFor="business-id-input">
                Työpaikan Y-tunnus *
              </label>
              <TextInput
                id="business-id-input"
                className="text_input"
                name="Työpaikan Y-tunnus"
                required
                placeholder='1234567-6'

                value={businessID}
                onChange={handleBusinessId}
              />
              <div className="icone-style">
                <IconCrossCircle
                  className="custom-icon"
                  aria-hidden="true"
                  onClick={handleClearBusinessId}
                />
                <IconSearch className="custom-icon" aria-hidden="true" onClick={handleSearchClick} />
              </div>
              {/* {businessIDError && (
                <span style={{ color: 'red', fontSize: '14px' }}>{businessIDError}</span>
              )} */}
            </div>

            <div>
              {companyName !== null && (
                <div>
                  <label className="työpaikkä_tiedot" htmlFor="company-name-input">
                    Työpaikka *
                  </label>
                  <TextInput
                    id="company-name-input"
                    className="text_input"
                    name="Työpaikan Y-tunnus"
                    required
                    value={editedCompanyName || (companyName && companyName.name) || ''}
                    onChange={handleCompanyName}
                  />
                </div>
              )}
            </div>
          </form>
        </Accordion>
      </div>
      <div style={{ margin: '16px', marginBottom: '28px' }}>
        <Accordion
          card
          border
          className="heading_style"
          heading="2. Työpaikkaohjaajan tiedot"
          language="en"
          style={{ backgroundColor: '#F2F2F2', paddingTop: '17px', paddingBottom: '17px' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: '22px', fontWeight: '500px' }}>2. Työpaikkaohjaajan tiedot</Typography>
          </AccordionSummary>
          <form >
            <div className='ohjaajat-info' >
              {työpaikkaohjaajat.slice().reverse().map((ohjaaja, index) => (
                <div key={index} style={{ borderBottom: '2px solid white', marginTop: '9px', marginBottom: '9px' }}>
                  <label className="työpaikkä_tiedot" htmlFor={`first-name-input-${index}`}>
                    Etunimi *
                  </label>
                  <TextInput
                    id={`first-name-input-${index}`}
                    className="text_input"
                    name="Etunimi"
                    required
                    value={ohjaaja.firstName}
                    readOnly
                  />

                  <label className="työpaikkä_tiedot" htmlFor={`last-name-input-${index}`}>
                    Sukunimi *
                  </label>
                  <TextInput
                    id={`last-name-input-${index}`}
                    className="text_input"
                    name="Sukunimi"
                    required
                    value={ohjaaja.lastName}
                    readOnly
                  />

                  <label className="työpaikkä_tiedot" htmlFor={`email-input-${index}`}>
                    Sähköposti *
                  </label>
                  <TextInput
                    id={`email-input-${index}`}
                    style={{ marginBottom: '20px' }}
                    className="text_input"
                    name="Sähköposti"
                    type="email"
                    required
                    value={ohjaaja.email}
                    readOnly
                  />
                </div>
              ))}
            </div>
            <div className='ohjaja' style={{}}>
              <label className="työpaikkä_tiedot" htmlFor="first-name-input">
                Etunimi *
              </label>
              <TextInput

                id="first-name-input"
                className="text_input"
                name="Etunimi"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <div>
                <label className="työpaikkä_tiedot" htmlFor="last-name-input">
                  Sukunimi *
                </label>
                <TextInput
                  id="last-name-input"
                  className="text_input"
                  name="Sukunimi"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="työpaikkä_tiedot" htmlFor="email-input">
                  Sähkoposti *
                </label>
                <TextInput
                  id="email-input"
                  className="text_input"
                  name="Sähkoposti"
                  type="email"
                  required
                  value={työpaikkaohjaajaEmail}
                  onChange={(e) => setTyöpaikkaohjaajaEmail(e.target.value)}
                />
              </div>
              <Button

                text="Lisää toinen ohjaaja"
                style={{
                  marginLeft: '17%',
                  marginBottom: '30px',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  marginTop: '25px',
                  width: '65%'
                }}
                icon={'ic:baseline-plus'}
                onClick={addTyöpaikkaohjaaja}
              />
            </div>
          </form>
        </Accordion>
      </div>
      {/* Adding the functionality of the button later */}

      <PageNavigationButtons forwardButtonText={'Seurava'} style={{ marginBottom: '30px' }} />


      <div style={{ marginTop: '80px' }}>
        <UserNav></UserNav>
      </div>
    </div>

  );
};

export default CompanyInfo;


































































