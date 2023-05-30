// Importing react packages
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../useStore';
import { Icon } from '@iconify/react';

// Importing components
import Button from '../../../components/Button/Button';
import WavesHeader from '../../../components/Header/WavesHeader';

const LoginInfo = () => {
  // State variables for storing form input values
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordVerify,
    setPasswordVerify,
  } = useStore();

  // State variables for password visibility toggling
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);

  // State variable for button disabled state
  const [buttonDisabled, setButtonDisabled] = useState();

  const navigate = useNavigate();

  // Toggle password visibility for password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

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
      ![name, email, password, passwordVerify].every(
        (input) => input.length > 0
      )
    );
  }, [name, email, password, passwordVerify]);

  return (
    <main className='loginInfo__wrapper'>
      {/* Header component */}
      <WavesHeader title='Saukko' fill='#9fc9eb' secondTitle='Luo tili' />
      <section className='loginInfo__container'>
        <h2>Omat tiedot</h2>

        <form>
          <section className='loginInfo__container--form-text'>
            {/* Name input */}
            <label htmlFor=''>Nimi *</label>
            <input
              value={name}
              type='name'
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {/* Email input */}
            <label htmlFor=''>Sähköposti *</label>
            <input
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* Password input */}
            <label htmlFor=''>Salasana *</label>
            <div className='password__container'>
              <input
                type={showPassword ? 'text' : 'password'}
                class='password-input'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {console.log('password length', password.length)}
              {password.length > 0 && (
                <span
                  className='password-icon'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon icon='mdi:eye-off-outline' className='eye-off' />
                  ) : (
                    <Icon icon='mdi:eye-outline' className='eye-on' />
                  )}
                </span>
              )}
            </div>
            {/* Password verification input */}
            <label htmlFor=''>Vahvista salasana *</label>
            <div className='password__container'>
              <input
                type={showPasswordVerify ? 'text' : 'password'}
                class='password-input'
                value={passwordVerify}
                onChange={(e) => {
                  setPasswordVerify(e.target.value);
                }}
              />

              {passwordVerify.length > 0 && (
                <span
                  className='password-icon'
                  onClick={togglePasswordVerifyVisibility}
                >
                  {/* Toggle password verification visibility icon */}
                  {showPasswordVerify ? (
                    <Icon icon='mdi:eye-off-outline' className='eye-off' />
                  ) : (
                    <Icon icon='mdi:eye-outline' className='eye-on' />
                  )}
                </span>
              )}
            </div>
            <p>
              Jos sinulla on jo tili <a href='/login'>Kirjaudu sisään</a>
            </p>
            {/* Button component */}
            <Button
              style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
              onClick={(e) =>
                buttonDisabled
                  ? console.log('button disabled')
                  : navigate('/general-info')
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

export default LoginInfo;
