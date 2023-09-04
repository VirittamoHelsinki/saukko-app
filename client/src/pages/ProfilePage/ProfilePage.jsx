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
import useStore from '../../store/useStore';
import AuthContext from '../../utils/context/AuthContext';
import { logoutUser } from '../../api/user';

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

  // Open NotificationModal
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  // Pop-up logic
  const [openPasswordPopUp, setOpenPasswordPopUp] = useState(false);
  const handleOpenPasswordPopUp = () => setOpenPasswordPopUp(true);
  const handleClosePasswordPopUp = () => setOpenPasswordPopUp(false);

  const handleSubmitPasswordPopUp = () => {
    handleClosePasswordPopUp();
    setOpenNotificationModal(true);

    // Check for correct old password & change password here
  }
  
  return (
    <main className='profile__wrapper'>
	    <WavesHeader title='Saukko' secondTitle='Profiili' disabled={false} />
      <section className='profile__container'>
        <div className='profile__container--row'>
          <p className='profile__container--row-value'>{user?.firstName} {user?.lastName}</p>
          <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
        </div>
        <div className='profile__container--row'>
          <p className='profile__container--row-value'>{user?.email}</p>
          <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
        </div>
        <div className='profile__container---change-password'>
          <div className='profile__container--row' onClick={handleOpenPasswordPopUp}>
            <p className='profile__container--row-value'>Vaihda salasana</p>
            <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
          </div>

          {/* Change password pop-up */}
          <PopUpForm 
            title='Vaihda salasana' 
            description='Syötä alle uusi salasanasi'
            buttonText='Vaihda salasana'
            open={openPasswordPopUp}
            handleClose={handleClosePasswordPopUp}
            handleSubmit={handleSubmitPasswordPopUp}
          />

          {/* NotificationModal for changed password */}
          <NotificationModal
            open={openNotificationModal}
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
  )
}

export default ProfilePage