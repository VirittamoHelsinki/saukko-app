// Import react packages & dependencies
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import Button from '../../components/Button/Button';
import UserNav from '../../components/UserNav/UserNav';
import NotificationModal from '../../components/NotificationModal/NotificationModal';
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

  // NotificationModal logic
  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  // Pop-up logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('change-password__popup')) {
      handleClose();
    }
  };

  const handlePasswordSubmit = () => {
    handleClose();
    setOpenNotificationModal(true);
  };

  // Password field logic
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
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
          <div className='profile__container--row' onClick={handleOpen}>
            <p className='profile__container--row-value'>Vaihda salasana</p>
            <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
          </div>

          {/* Change password pop-up */}
          {open && (
            <div className='change-password__popup' onClick={handleOverlayClick}>
              <div className='change-password__popup-content'>
                <Icon icon='ph:x-bold' onClick={handleClose}/>
                <div className='change-password__popup-title'>
                  <h2>Vaihda salasana</h2>
                  <p>Syötä alle uusi salasanasi</p>
                </div>
                <div className='change-password__popup-form'>
                    <label>Vanha salasana *</label>
                  <div>
                    <input type={showPassword ? 'text' : 'password'} name='old-password'/>
                    <Icon icon="ph:eye" onClick={handleClickShowPassword} />
                  </div>
                  <label>Uusi salasana *</label>
                  <div>
                    <input type={showPassword ? 'text' : 'password'} name='new-password'/>
                    <Icon icon="ph:eye" onClick={handleClickShowPassword} />
                  </div>
                  <label>Vahvista salasana *</label>
                  <div>
                    <input type={showPassword ? 'text' : 'password'} name='confirm-password'/>
                    <Icon icon="ph:eye" onClick={handleClickShowPassword} />
                  </div>
                </div>
                <Button
                  className='change-password__popup-submit'
                  text='Vaihda salasana'
                  onClick={handlePasswordSubmit}
                />
              </div>
            </div>
          )}

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