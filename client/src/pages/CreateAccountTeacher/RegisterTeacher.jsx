// Importing react packages
import { React, useState, useEffect, useContext } from 'react';
import AuthContext from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useStore from '../../useStore';
import { Icon } from '@iconify/react';
import axios from 'axios';

// Importing components
import Button from '../../components/Button/Button';
import WavesHeader from '../../components/Header/WavesHeader';

const RegisterTeacher = () => {
  /**
   * State variables for storing form input values.
   * The role variable indicates to the backend the
   * specific role to which the data belongs.
   */

  const {
    role,
    setRole,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordVerify,
    setPasswordVerify,
    academy,
    setAcademy,
    education,
    setEducation,
    phone,
    setPhone,
  } = useStore();

  // State variables for password visibility toggling
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);

  // State variable for button disabled state
  const [buttonDisabled, setButtonDisabled] = useState();

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle password visibility for password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

  /**
   * Function to handle the form submission and register the teacher.
   * It sends a POST request with form data to the server.
   * If successful, navigates to '/form-teacher-sent'; otherwise, navigates to '/account-failed'.
   */
  const processRegistration = async (e) => {
    e.preventDefault();

    try {
      const registerData = {
        role,
        name,
        email,
        password,
        passwordVerify,
        academy,
        education,
        phone,
      };
      await axios
        .post('http://localhost:5000/auth/', registerData)
        .then((res) => {
          console.log(res);
          navigate('/form-teacher-sent');
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
      ![name, email, password, passwordVerify, academy, education, phone].every(
        (input) => input.length > 0
      )
    );
  }, [name, email, password, passwordVerify, academy, education, phone]);

  /**
   * Sets the role to teacher to indicate to the
   * backend the specific role to which the data
   * belongs.
   */

  useEffect(() => {
    setRole('teacher');
  }, []);

  return (
    <main className='register__wrapper'>
      {/* Header component */}
      <WavesHeader
        title='Saukko'
        secondTitle='Luo tili'
        fill='#ffe977'
        header='#ffe977'
      />
      <section className='register__container'>
        <h2>Opettajan tiedot</h2>

        <form>
          <section className='register__container--form-text'>
            {/* Name input */}
            <label htmlFor=''>Nimi *</label>
            <input
              value={name}
              type='text'
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
            {/* Academy input */}
            <label htmlFor=''>Oppilaitos *</label>
            <input
              value={academy}
              type='text'
              onChange={(e) => {
                setAcademy(e.target.value);
              }}
            />
            {/* Education input */}
            <label htmlFor=''>Koulutusala *</label>
            <input
              value={education}
              type='text'
              onChange={(e) => {
                setEducation(e.target.value);
              }}
            />
            {/* Phone input */}
            <label htmlFor=''>Puhelinnumero *</label>
            <input
              value={phone}
              type='text'
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <p>
              Jos sinulla on jo tili <a href='/login'>Kirjaudu sisään</a>
            </p>
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

export default RegisterTeacher;
