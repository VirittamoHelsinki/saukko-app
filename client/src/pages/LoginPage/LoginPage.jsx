// importing react packages
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import AuthContext from '../../store/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alert from '../../assets/circle-red.svg'
// importing components
import Button from '../../components/Button/Button';
import WavesHeader from '../../components/Header/WavesHeader';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import { Icon } from '@iconify/react';
import { loginUser } from '../../api/user';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [buttonDisabled, setButtonDisabled] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // processes the login after fields have been filled and the "login" button has been pressed
  const processLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      await loginUser(loginData);
      await getLoggedIn();
      navigate('/userdashboard');

    } catch (err) {
      // Handle the error here
      if (err.response && err.response.status === 401) {
        // 401 status code means unauthorized (wrong password)
        setErrorMessage('Salasana väärin');
      } else {
        console.error(err);
      }
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(![email, password].every((input) => input.length > 0));
  }, [email, password]);

  // button styling/CSS
  const buttonStyleDisabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--link-disabled)',
    background: 'var(--link-disabled)',
  },
    buttonStyleEnabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--saukko-main-black)',
      background: 'var(--saukko-main-black)',
    };

  return (
    <main className='loginPage__wrapper'>
      <WavesHeader title='Saukko' fill='#00005E' />
      <section className='loginPage__container'>
        <h2>Kirjaudu sisään</h2>

        <form onSubmit={processLogin}>
          <section className='loginPage__container--form-text'>
            <label htmlFor=''>Sähköposti *</label>
            <input
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}

            />
            <label htmlFor=''>Salasana *</label>
            <div className="password__container">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password.length > 0 && (
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon icon="mdi:eye-off-outline" className="eye-off" />
                  ) : (
                    <Icon icon="mdi:eye-outline" className="eye-on" />
                  )}
                </span>
              )}
            </div>
            {errorMessage && (
              <div className='error__container'>
                <div className='error__msg__container'>
                  <img src={alert} alt="alert" />
                  <p className="error-message">{errorMessage}</p>
                </div>
                <div className='forgot-password-link'>
                  <a href='/forgot-password'>Unohtuiko salasana?</a>
                </div>
              </div>
            )}

            {!errorMessage && <a href='/forgot-password'>Unohtuiko salasana?</a>}

          </section>
        </form>
      </section>
      <section className='loginPage__form--bottom'>

        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={(e) =>
            buttonDisabled ? console.log('button disabled') : processLogin(e)
          }
          type='submit'
          text='Kirjaudu sisään'
        />
      </section>

    </main>
  );
};

export default LoginPage;





