// import necessary react components
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../utils/context/AuthContext';
import { logoutUser } from '../../api/user';

// icon component
const UserNavIcon = (props) => {
  return (
    <button onClick={props.onClick}>

      <Icon icon={props.icon} rotate={props.rotate} />

    </button>
  );
};

// user navigation bar
const UserNav = () => {
  const { getLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = user?.role;

  const getHeaderColor = () => {
    // Define color based on role
    switch (role) {
      case 'customer':
        return '#9fc9eb';
      case 'teacher':
        return '#FFC61E';
      case 'supervisor':
        return '#f5a3c7';
      default:
        return '#9fc9eb';
    }
  };

  const headerColor = getHeaderColor();

  const wrapperStyle = {
    backgroundColor: headerColor,
  };

  const LogOut = async () => {
    await logoutUser();
    localStorage.removeItem('token')
    await getLoggedIn();
    navigate('/');
  };

  const renderIcons = () => {
    if (user?.role === 'teacher') {
      return (
        <>
          {/* home icon */}
          <UserNavIcon
            icon='material-symbols:house-outline'
            onClick={() => navigate('/userdashboard')}
          />
          {/* book icon */}
          <UserNavIcon
            icon='healthicons:i-documents-accepted'
          // onClick={() => navigate('/')}
          />
          {/* persons icon */}
          <UserNavIcon
            icon='fontisto:persons'
          // onClick={() => navigate('/')}
          />
          {/* user icon */}
          <UserNavIcon
            icon='material-symbols:person-outline'
            onClick={() => navigate('/profile')}
          />

        </>
      );
    } else if (user?.role === 'customer' || user?.role === 'supervisor') {
      return (
        <>
          {/* home icon */}
          <UserNavIcon
            icon='material-symbols:house-outline'
            onClick={() => navigate('/userdashboard')}
          />
          {/* book icon */}
          <UserNavIcon
            icon='material-symbols:menu-book-outline-sharp'
          // onClick={() => navigate('/home')}
          />

          {/* user icon */}
          <UserNavIcon
            icon='material-symbols:person-outline'
            onClick={() => navigate('/profile')}
          />

        </>
      );
    }
  };

  return (
    <main className='userNav__wrapper' style={wrapperStyle}>
      <section className='userNav__container'>
        {renderIcons()}
      </section>
    </main>

  );
};

export default UserNav;





