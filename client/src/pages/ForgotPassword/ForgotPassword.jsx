import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';
import WavesHeader from '../../components/Header/WavesHeader';
import Notification from '../../components/Notification/Notification';
import * as EmailValidator from 'email-validator';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const formRef = useRef();
  const emailRef = useRef();

  const processForgotPassword = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    if (!EmailValidator.validate(email)) {
      console.log('Invalid email');
      return;
    }

    axios
      .post('/forgot-password', {
        email: email,
      })
      .then(function (res) {
        console.log(res);
        // setNotificationVisible(true);
      })
      .catch(function (err) {
        console.log(err);
      });

    setNotificationVisible(true);
    console.log(email);
  };

  useEffect(() => {
    setButtonDisabled(email.length === 0);
  }, [email]);

  const buttonStyleDisabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--link-disabled)',
    background: 'var(--link-disabled)',
  };

  const buttonStyleEnabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--saukko-main-black)',
    background: 'var(--saukko-main-black)',
  };

  return (
    <main className='forgotPassword__wrapper'>
      {!notificationVisible && <WavesHeader title='Saukko' fill='#9fc9eb' />}
      {!notificationVisible && (
        <section className='forgotPassword__container'>
          <h2>Unohtuiko salasana?</h2>
          <p>Lähetämme sähköpostin, jossa on ohjeet salasanan vaihtamiseen</p>
          <form ref={formRef} onSubmit={processForgotPassword}>
            <section className='forgotPassword__container--form-text'>
              <label htmlFor='email'>Sähköposti *</label>
              <input
                ref={emailRef}
                type='email'
                id='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder='Kirjoita sähköpostiosoitteesi.'
              />
            </section>
          </form>
        </section>
      )}
      {!notificationVisible && (
        <section className='forgotPassword__form--bottom'>
          <Button
            style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
            onClick={processForgotPassword}
            type='submit'
            text='Lähetä'
          />
        </section>
      )}

      {notificationVisible && (
        <Notification
          navigatePage='/logged-user'
          heading='Tarkista sähköpostisi'
          icon='gg:check-o'
        />
      )}
    </main>
  );
};

export default ForgotPassword;
