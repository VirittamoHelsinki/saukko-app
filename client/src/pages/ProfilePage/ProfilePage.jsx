// Import react packages & dependencies
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import Button from '../../components/Button/Button';
import UserNav from '../../components/UserNav/UserNav';
import AuthContext from '../../utils/context/AuthContext';

function ProfilePage() {

  // User info from AuthContext
  const { getLoggedIn, user } = useContext(AuthContext);
  console.log('Logged in user:', user);
  
  // Logout
  const navigate = useNavigate();

  const LogOut = async () => {
    await axios.get('http://localhost:5000/auth/logout');
    localStorage.removeItem('token')
    await getLoggedIn();
    navigate('/');
  };
  
  return (
    <main className='profile__wrapper'>
	    <WavesHeader title='Saukko' secondTitle={user?.name} disabled={false} />
      <section className='profile__container'>
        <h1 className='profile__container--title'>Profiili</h1>
        <div className='profile__container--row'>
          <p className='profile__container--row-value'>{user?.name}</p>
          <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
        </div>
        <div className='profile__container--row'>
          <p className='profile__container--row-value'>{user?.email}</p>
          <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
        </div>
        <div className='profile__container--row'>
          <p className='profile__container--row-value'>Vaihda salasana</p>
          <Icon icon='iconamoon:arrow-right-2' className='profile__container-row-arrow'/>
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