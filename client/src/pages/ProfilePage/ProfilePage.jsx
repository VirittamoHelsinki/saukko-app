// Import react packages & dependencies
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import Button from '../../components/Button/Button';
import UserNav from '../../components/UserNav/UserNav';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import PopUpForm from '../../components/PopUpForm/PopUpForm';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import AuthContext from '../../store/context/AuthContext';
import {
  logoutUser,
  requestPasswordChangeTokenAsUser,
  resetPassword,
} from '../../api/user';

function ProfilePage() {
  // User info from AuthContext
  const { getLoggedIn, user } = useContext(AuthContext);

  // Logout
  const navigate = useNavigate();

  const LogOut = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      await getLoggedIn();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const [invalidPasswordError, setInvalidPasswordError] = useState(false);
  
  // State for opening & closing email pop up
  const [openEmailPopUp, setOpenEmailPopUp] = useState(false);
  const handleOpenEmailPopUp = () => setOpenEmailPopUp(true);
  const handleCloseEmailPopUp = () => setOpenEmailPopUp(false);

  // State for opening & closing email notification
  const [openEmailNotification, setOpenEmailNotification] = useState(false);
  const handleOpenEmailNotification = () => setOpenEmailNotification(true);
  const handleCloseEmailNotification = () => setOpenEmailNotification(false);

  // Email form handler
  const handleSubmitEmailPopUp = (e) => {
    e.preventDefault();
    handleCloseEmailPopUp();
    handleOpenEmailNotification();

    // Verify password & change email here
  };

  // State for opening & closing password pop up
  const [openPasswordPopUp, setOpenPasswordPopUp] = useState(false);
  const handleOpenPasswordPopUp = () => setOpenPasswordPopUp(true);
  const handleClosePasswordPopUp = () => setOpenPasswordPopUp(false);

  // State for opening & closing email notification
  const [openPasswordNotification, setOpenPasswordNotification] =
    useState(false);
  const handleOpenPasswordNotification = () =>
    setOpenPasswordNotification(true);
  const handleClosePasswordNotification = () =>
    setOpenPasswordNotification(false);

  // Password form handler
  const handleSubmitPasswordPopUp = (e) => {
    e.preventDefault();

    // Get input values
    const form = e.target;
    const oldPassword = form.querySelector("[name='passwordOld']").value;
    const newPassword = form.querySelector("[name='passwordNew']").value;
    const verifyPassword = form.querySelector("[name='passwordVerify']").value;

    if (newPassword !== verifyPassword) {
      console.log(newPassword, verifyPassword)
      form.querySelector("[name='passwordVerify']").setCustomValidity('Salasanat eivät täsmää.');
      form.querySelector("[name='passwordVerify']").reportValidity();
      return;
    } else {
      form.querySelector("[name='passwordVerify']").setCustomValidity('');
      form.querySelector("[name='passwordVerify']").reportValidity();
    }

    requestPasswordChangeTokenAsUser(oldPassword)
      .then((response) => {
        console.log("We have a response", response)
        if (response.status === 200) {
          // "change-token" is set as HTTP-Only
          return;
        } else throw new Error(`Request "change-token" was failed, server returned ${response.status}`);
      })
      .then(() => resetPassword(newPassword))
      .then((response) => { // this is the password change response
        if (response.status === 200) {
          // "change-token" is now erased from the cookie jar
          handleClosePasswordPopUp();
          handleOpenPasswordNotification();
        } else throw new Error(`Request "password-reset" was failed, server returned ${response.status}`)
      })
      .catch((err) => {
        console.error("Failed to change the password", err)
        if (err.response && err.response.data && err.response.data.errorMessage === "Invalid password") {
          setInvalidPasswordError(true)
        }
      });
  }
  
  return (
    <main className='profile__wrapper'>
      <WavesHeader title='Oma profiili' disabled={true} />
      <section className='profile__container'>
        <div className='profile__container--row name'>
          <p className='profile__container--row-value'>
            {user?.firstName} {user?.lastName}
          </p>
          <Icon
            icon='iconamoon:arrow-right-2'
            className='profile__container-row-arrow'
          />
        </div>
        <div className='profile__container---change-email'>
          <div
            className='profile__container--row'
            onClick={handleOpenEmailPopUp}
          >
            <p className='profile__container--row-value'>{user?.email}</p>
            <Icon
              icon='iconamoon:arrow-right-2'
              className='profile__container-row-arrow'
            />
          </div>

          {/* Change email pop-up */}
          <PopUpForm
            title='Vaihda sähköpostiosoite'
            content={
              <div className='popup-form'>
                <PasswordInput
                  value='passwordOld'
                  inputName='passwordOld'
                  label='Vahvista nykyinen salasana *'
                />
                <label htmlFor='new-email'>Anna uusi sähköposti *</label>
                <input type='email' name='new-email' required />
              </div>
            }
            buttonText='Lähetä'
            open={openEmailPopUp}
            handleClose={handleCloseEmailPopUp}
            handleSubmit={handleSubmitEmailPopUp}
          />

          {/* Change email notification */}
          <NotificationModal
            open={openEmailNotification}
            handleClose={handleCloseEmailNotification}
            type='success'
            title='Sähköposti vaihdettu!'
            body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
          />
        </div>
        <div className='profile__container---change-password'>
          <div
            className='profile__container--row'
            onClick={handleOpenPasswordPopUp}
          >
            <p className='profile__container--row-value'>Vaihda salasana</p>
            <Icon
              icon='iconamoon:arrow-right-2'
              className='profile__container-row-arrow'
            />
          </div>

          {/* Change password pop-up */}
          <PopUpForm
            title='Vaihda salasana'
            description='Syötä alle uusi salasanasi'
            content={
              <div className='popup-form'>
                <PasswordInput value='passwordOld' inputName='passwordOld' label='Vanha salasana *' />
                <PasswordInput value='passwordNew' inputName='passwordNew' label='Uusi salasana *' />
                <PasswordInput value='passwordVerify' inputName='passwordVerify' label='Vahvista salasana *' />
                {invalidPasswordError && <p style={{color: "red"}}>Tarkista salasanasi ja yritä uudelleen!</p>}
              </div>
            }
            buttonText='Vaihda salasana'
            open={openPasswordPopUp}
            handleClose={handleClosePasswordPopUp}
            handleSubmit={handleSubmitPasswordPopUp}
          />

          {/* Change password notification */}
          <NotificationModal
            open={openPasswordNotification}
            handleClose={handleClosePasswordNotification}
            type='success'
            title='Salasana vaihdettu!'
            body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
          />
        </div>
      </section>
      <section className='profile__logout'>
        <Button
          text='Kirjaudu Ulos'
          onClick={LogOut}
          icon={'grommet-icons:logout'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default ProfilePage;
