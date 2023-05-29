// importing react packages
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../useStore';
import axios from 'axios';

// importing components
import Button from '../../../components/Button/Button';
import WavesHeader from '../../../components/Header/WavesHeader';

const WorkingInfo = () => {
  const {
    name,
    email,
    password,
    address,
    postNumber,
    city,
    phone,
    birth,
    work,
    setWork,
    workDescription,
    setWorkDescription,
    contactPerson,
    setContactPerson,
    workPhoneNumber,
    setWorkPhoneNumber,
    workAddress,
    setWorkAddress,
    goals,
    setGoals,
  } = useStore();

  const [buttonDisabled, setButtonDisabled] = useState();

  const navigate = useNavigate();

  const processRegistration = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        name,
        email,
        password,
        address,
        postNumber,
        city,
        phone,
        birth,
        work,
        workDescription,
        contactPerson,
        workPhoneNumber,
        workAddress,
        goals,
      };
      console.log('Form data about to be sent to DB: ', registerData);
      await axios
        .post('http://localhost:5000/auth/', registerData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate('/account-created');
    } catch (err) {
      console.error(err);
      navigate('/account-failed');
    }
  };

  // button styling/CSS
  const buttonStyleDisabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--link-disabled)',
      background: 'var(--link-disabled)',
      margin: '5% 0',
    },
    buttonStyleEnabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--saukko-main-black)',
      background: 'var(--saukko-main-black)',
      margin: '5% 0',
    };

  useEffect(() => {
    setButtonDisabled(
      ![
        work,
        workDescription,
        contactPerson,
        workPhoneNumber,
        workAddress,
        goals,
      ].every((input) => input.length > 0)
    );
  }, [
    work,
    workDescription,
    contactPerson,
    workPhoneNumber,
    workAddress,
    goals,
  ]);

  return (
    <main className='workInfo__wrapper'>
      <WavesHeader
        title='Saukko'
        fill='#9fc9eb'
        secondTitle='Taustatietolomake'
      />
      <section className='workInfo__container'>
        <h2>Työpaikkatiedot</h2>

        <form onSubmit={processRegistration}>
          <section className='workInfo__container--form-text'>
            <label htmlFor=''>Työpaikkasi *</label>
            <input
              value={work}
              type='text'
              onChange={(e) => {
                setWork(e.target.value);
              }}
            />
            <label htmlFor=''>Työtehtävät mitä teet työssäsi *</label>
            <textarea
              value={workDescription}
              onChange={(e) => {
                setWorkDescription(e.target.value);
              }}
              cols='30'
              rows='10'
            ></textarea>
            <label htmlFor=''>Työpaikan yhteyshenkilö *</label>
            <input
              value={contactPerson}
              type='text'
              onChange={(e) => {
                setContactPerson(e.target.value);
              }}
            />
            <label htmlFor=''>Työpaikan puhelinnumero *</label>
            <input
              value={workPhoneNumber}
              type='text'
              onChange={(e) => {
                setWorkPhoneNumber(e.target.value);
              }}
            />
            <label htmlFor=''>Työpaikan osoite *</label>
            <input
              value={workAddress}
              type='text'
              onChange={(e) => {
                setWorkAddress(e.target.value);
              }}
            />
            <label htmlFor=''>Omat taivotteesi *</label>
            <textarea
              value={goals}
              onChange={(e) => {
                setGoals(e.target.value);
              }}
              cols='30'
              rows='10'
            ></textarea>
            <Button
              style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
              onClick={(e) =>
                buttonDisabled
                  ? console.log('button disabled')
                  : processRegistration(e)
              }
              type='submit'
              text='Lähetä'
            />{' '}
          </section>
        </form>
      </section>
    </main>
  );
};

export default WorkingInfo;
