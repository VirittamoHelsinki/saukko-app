// Importing react packages
import { React, useState, useEffect, useContext } from 'react';
import AuthContext from '../../../store/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store/zustand/formStore';
import axios from 'axios';

// Importing components
import Button from '../../../components/Button/Button';
import WavesHeader from '../../../components/Header/WavesHeader';

const WorkingInfo = () => {
  /**
   * State variables for storing form input values.
   * The role variable indicates to the backend the
   * specific role to which the data belongs.
   */

  const {
    role,
    setRole,
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

  // State variable for button disabled state
  const [buttonDisabled, setButtonDisabled] = useState();

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Function to handle the form submission and register the customer.
   * It sends a POST request with form data to the server.
   * If successful, navigates to '/account-created'; otherwise, navigates to '/account-failed'.
   */
  const processRegistration = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        role,
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
      await axios
        // REFACTOR this to extract url if this page is still used
        .post('http://localhost:5000/auth/', registerData)
        .then((res) => {
          console.log(res);
          navigate('/account-created');
        })
        .catch((err) => {
          console.log(err);
        });
      await getLoggedIn();
    } catch (err) {
      console.error(err);
      navigate('/account-failed');
    }
  };

  // Button styling/CSS
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

  // Check if all input fields are filled to enable/disable the button
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

  /**
   * Sets the role to customer to indicate to the
   * backend the specific role to which the data
   * belongs.
   */

  useEffect(() => {
    setRole('customer');
  }, []);

  return (
    <main className='workInfo__wrapper'>
      {/* Header component */}
      <WavesHeader
        title='Saukko'
        fill='#9fc9eb'
        secondTitle='Taustatietolomake'
      />
      <section className='workInfo__container'>
        <h2>Työpaikkatiedot</h2>

        <form onSubmit={processRegistration}>
          <section className='workInfo__container--form-text'>
            {/* Work place input */}
            <label htmlFor=''>Työpaikkasi *</label>
            <input
              value={work}
              type='text'
              onChange={(e) => {
                setWork(e.target.value);
              }}
            />
            {/* Job description input */}
            <label htmlFor=''>Työtehtävät mitä teet työssäsi *</label>
            <textarea
              value={workDescription}
              onChange={(e) => {
                setWorkDescription(e.target.value);
              }}
              cols='30'
              rows='10'
            ></textarea>
            {/* Contact person input */}
            <label htmlFor=''>Työpaikan yhteyshenkilö *</label>
            <input
              value={contactPerson}
              type='text'
              onChange={(e) => {
                setContactPerson(e.target.value);
              }}
            />
            {/* Work phone number input */}
            <label htmlFor=''>Työpaikan puhelinnumero *</label>
            <input
              value={workPhoneNumber}
              type='text'
              onChange={(e) => {
                setWorkPhoneNumber(e.target.value);
              }}
            />
            {/* Work address input */}
            <label htmlFor=''>Työpaikan osoite *</label>
            <input
              value={workAddress}
              type='text'
              onChange={(e) => {
                setWorkAddress(e.target.value);
              }}
            />
            {/* Goals input */}
            <label htmlFor=''>Omat taivotteesi *</label>
            <textarea
              value={goals}
              onChange={(e) => {
                setGoals(e.target.value);
              }}
              cols='30'
              rows='10'
            ></textarea>
            {/* Button component */}
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
