// Importing react packages
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/useStore';

// Importing components
import Button from '../../../components/Button/Button';
import WavesHeader from '../../../components/Header/WavesHeader';

const GeneralInfo = () => {
  // State variables for storing form input values
  const {
    address,
    setAddress,
    postNumber,
    setPostNumber,
    city,
    setCity,
    phone,
    setPhone,
    birth,
    setBirth,
  } = useStore();

  // State variable for button disabled state
  const [buttonDisabled, setButtonDisabled] = useState();

  const navigate = useNavigate();

  // Button styling/CSS
  const buttonStyleDisabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--link-disabled)',
      background: 'var(--link-disabled)',
      paddingLeft: '12%',
      margin: '5% 0',
    },
    buttonStyleEnabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--saukko-main-black)',
      background: 'var(--saukko-main-black)',
      paddingLeft: '12%',
      margin: '5% 0',
    };

  // Check if all input fields are filled to enable/disable the button
  useEffect(() => {
    setButtonDisabled(
      ![address, postNumber, city, phone, birth].every(
        (input) => input.length > 0
      )
    );
  }, [address, postNumber, city, phone, birth]);

  return (
    <main className='generalInfo__wrapper'>
      {/* Header component */}
      <WavesHeader
        title='Saukko'
        fill='#9fc9eb'
        secondTitle='Taustatietolomake'
      />
      <section className='generalInfo__container'>
        <h2>Omat tiedot</h2>

        <form>
          <section className='generalInfo__container--form-text'>
            {/* Address input */}
            <label htmlFor=''>Osoite *</label>
            <input
              value={address}
              type='text'
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <div className=' generalInfo__container--two-fields'>
              <div className='input-container'>
                {/* Post number input */}
                <label htmlFor=''>Postin numero *</label>
                <input
                  value={postNumber}
                  type='text'
                  onChange={(e) => {
                    setPostNumber(e.target.value);
                  }}
                />
              </div>
              <div className='input-container'>
                {/* City input */}
                <label htmlFor=''>Kaupunki *</label>
                <input
                  value={city}
                  type='text'
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
            </div>
            {/* Phone input */}
            <label htmlFor=''>Puhelin *</label>
            <input
              value={phone}
              type='text'
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            {/* Date of birth input */}
            <label htmlFor=''>Syntymä aika *</label>
            <input
              value={birth}
              type='text'
              onChange={(e) => {
                setBirth(e.target.value);
              }}
            />
            {/* Button component */}
            <Button
              style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
              onClick={(e) =>
                buttonDisabled
                  ? console.log('button disabled')
                  : navigate('/work-info')
              }
              type='submit'
              text='Seuraava'
              icon={'typcn:arrow-right'}
            />{' '}
          </section>
        </form>
      </section>
    </main>
  );
};

export default GeneralInfo;
