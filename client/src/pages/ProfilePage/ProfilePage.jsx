// Import react packages & dependencies
import { useEffect, useState } from 'react';

import { Icon } from '@iconify/react';

// Import components
//import Button from '../../components/Button/Button';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
import PopUpForm from '../../components/PopUpForm/PopUpForm';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import {
  /* logoutUser, */
  requestPasswordChangeTokenAsUser,
  resetPassword,
} from '../../api/user';
import { useAuthContext } from '../../store/context/authContextProvider';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { updateUser } from '../../api/user';


function ProfilePage() {

  // User info from AuthContext
  const { currentUser } = useAuthContext();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [emailChangeFailedModalOpen, setEmailChangeFailedModalOpen] = useState(false);
  const [invalidPasswordError, setInvalidPasswordError] = useState(false);

  // State for opening & closing modals
  const [openEmailPopUp, setOpenEmailPopUp] = useState(false);
  const [openEmailNotification, setOpenEmailNotification] = useState(false);

  const handleCloseAlertModal = () => setAlertModalOpen(false);
  const handleOpenAlertModal = () => setAlertModalOpen(true);

  const handleCloseEmailChangeFailedModal = () => setEmailChangeFailedModalOpen(false);
  const handleOpenEmailChangeFailedModal = () => setEmailChangeFailedModalOpen(true);

  const handleOpenEmailPopUp = () => setOpenEmailPopUp(true);
  const handleCloseEmailPopUp = () => setOpenEmailPopUp(false);

  const handleOpenEmailNotification = () => setOpenEmailNotification(true);
  const handleCloseEmailNotification = () => setOpenEmailNotification(false);

  // Handle Email Change Submission
  const handleSubmitEmailPopUp = async (e) => {
    e.preventDefault();

    // Get input values
    const form = e.target;
    const currentPassword = form.querySelector("[name='current-password']").value;
    const newEmail = form.querySelector("[name='new-email']").value;

    // Ensure a new email is provided
    if (!newEmail) {
      console.error('New email is required');
      return;
    }

    try {
      // Verify current password
      const response = await requestPasswordChangeTokenAsUser(currentPassword);

      if (response.status !== 200) {
        setInvalidPasswordError(true);
        return;
      }

      // If password is correct, update the email
      await updateUser(currentUser.id, { email: newEmail });
      console.log('Email updated successfully');

      // Close the email pop-up and show success notification
      handleCloseEmailPopUp();
      handleOpenEmailNotification();
    } catch (error) {
      console.error('Error updating email:', error);
      handleOpenEmailChangeFailedModal();
    }
  };

  const handleSubmitPasswordPopUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const oldPassword = form.querySelector("[name='passwordOld']").value;
    const newPassword = form.querySelector("[name='passwordNew']").value;
    const verifyPassword = form.querySelector("[name='passwordVerify']").value;

    if (newPassword !== verifyPassword) {
      form.querySelector("[name='passwordVerify']").setCustomValidity('Salasanat eivät täsmää.');
      form.querySelector("[name='passwordVerify']").reportValidity();
      return;
    } else {
      form.querySelector("[name='passwordVerify']").setCustomValidity('');
      form.querySelector("[name='passwordVerify']").reportValidity();
    }

    requestPasswordChangeTokenAsUser(oldPassword)
      .then((response) => {
        if (response.status === 200) {
          return;
        } else throw new Error(`Request "change-token" failed with status ${response.status}`);
      })
      .then(() => resetPassword(newPassword))
      .then((response) => {
        if (response.status === 200) {
          handleClosePasswordPopUp();
          handleOpenPasswordNotification();
        } else throw new Error(`Password reset failed with status ${response.status}`);
      })
      .catch((err) => {
        console.error("Failed to change password:", err);
        if (err.response && err.response.data?.errorMessage === "Invalid password") {
          setInvalidPasswordError(true);
        } else {
          handleOpenAlertModal();
        }
      });
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



  useEffect(() => {
    setSiteTitle("Profiili"), setSubHeading(""), setHeading("Oma profiili")
  }, [setHeading, setSiteTitle, setSubHeading])
  // TODO: create notification for failed email change and red errormessage when password is incorrect 
  return (
    <div className='profile__wrapper'>
      <section className='profile__container'>
        <div className='profile__container--row name'>
          <p className='profile__container--row-value'>
            {currentUser?.firstName} {currentUser?.lastName}
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
            <p className='profile__container--row-value'>{currentUser?.email}</p>
            <Icon
              icon='iconamoon:arrow-right-2'
              className='profile__container-row-arrow'
            />
          </div>
          {/* Change email pop-up */}
          <PopUpForm
            title="Vaihda sähköpostiosoite"
            content={
              <div className="popup-form">
                <label htmlFor="current-password">Anna nykyinen salasana *</label>
                <input type="password" name="current-password" required />
                {invalidPasswordError && <p style={{ color: "red" }}>Tarkista salasanasi ja yritä uudelleen!</p>}
                <label htmlFor="new-email">Anna uusi sähköposti *</label>
                <input type="email" name="new-email" required />
              </div>
            }
            buttonText="Lähetä"
            open={openEmailPopUp}
            handleClose={handleCloseEmailPopUp}
            handleSubmit={handleSubmitEmailPopUp}
          />
          {/* Success Notification for Email Change */}
          <NotificationModal
            open={openEmailNotification}
            handleClose={handleCloseEmailNotification}
            type='success'
            title='Sähköposti vaihdettu!'
            body='Voit seuraavalla kerralla kirjautua sisään uusia kirjautumistietoja käyttäen.'
          />

          {/* Failure Notification for Email Change */}
          <NotificationModal
            open={emailChangeFailedModalOpen}
            handleClose={handleCloseEmailChangeFailedModal}
            type='warning'
            title='Sähköpostin vaihtaminen epäonnistui'
            body='Sähköpostin vaihtaminen ei onnistunut. Yritä uudelleen.'
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
                {invalidPasswordError && <p style={{ color: "red" }}>Tarkista salasanasi ja yritä uudelleen!</p>}
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
            title='Tiedot päivitetty!'
            body='Voit seuraavalla kerralla kirjautua sisään uusia kirjautumistietoja käyttäen.'
          />
          <NotificationModal
            type='warning'
            title={'Salasanan vaihtaminen ei onnistunut'}
            body={'Yritä hetken päästä uudelleen.'}
            open={alertModalOpen}
            handleClose={handleCloseAlertModal}
          />
          <NotificationModal
            type='warning'
            title={'Sähköpostin vaihtaminen ei onnistunut'}
            body={'Yritä hetken päästä uudelleen.'}
            open={alertModalOpen}
            handleClose={handleCloseAlertModal}
          />
        </div>
      </section>
      {/* <section className='profile__logout'>
        <Button
          text='Kirjaudu Ulos'
          onClick={LogOut}
          icon={'grommet-icons:logout'}
        />
      </section> */}
    </div>
  );
}

export default ProfilePage;
