import { useState, useCallback, useEffect } from 'react';
import alert from '../../assets/circle-red.svg'
import Button from '../../components/Button/Button';
import { loginUser } from '../../api/user';
import { Icon } from '@iconify/react';
import useHeadingStore from '../../store/zustand/useHeadingStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const processLogin = useCallback(async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };
      await loginUser(loginData);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage('Sähköposti tai salasana on väärin. Yritä uudelleen.');
      } else {
        console.error(err);
      }
    }
  }, [email, password]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (!buttonDisabled) {
          processLogin(e);
        } else {
          console.log('button disabled');
        }
      }
    };

    // Adding event listener to the whole document for simplicity
    document.addEventListener('keypress', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [buttonDisabled, processLogin]);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(![email, password].every((input) => input.length > 0));
  }, [email, password]);


  useEffect(() => {
    setSiteTitle("Suorituksen aktiivoiminen"), setSubHeading("Lisää uusi asiakas"), setHeading("Asiakkuudet")
  }, [setHeading, setSiteTitle, setSubHeading])


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
    <div className='loginPage__wrapper'>
      <section className='loginPage__container'>
        <h2>Kirjaudu sisään</h2>

        <form onSubmit={processLogin}>
          <section className='loginPage__container--form-text'>
            <label htmlFor=''>Sähköposti *</label>
            <input
              type='email'
              id='email'
              className={`email-input ${errorMessage ? 'error' : ''}`}
              onChange={(e) => {
                setEmail(e.target.value);
              }}

            />
            <label htmlFor=''>Salasana *</label>
            <div className="password__container">
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className={`password-input ${errorMessage ? 'error' : ''}`}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password.length > 0 && (
                <span
                  id='password-toggle'
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
                  <a href='/forgot-password' id='forgot-password-link'>Unohtuiko salasana?</a>
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

    </div>
  );
};

export default LoginPage;
