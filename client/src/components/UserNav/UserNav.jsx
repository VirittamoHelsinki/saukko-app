import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthContext from '../../store/context/AuthContext';
import InternalApiContext from '../../store/context/InternalApiContext';

import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import{ MenuIcon } from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material/Drawer';

const UserNav = ({ checkUnsavedChanges, handleNavigation, destination }) => {
  const { user } = useContext(AuthContext);
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clear chosen evaluation : old version Navbar
  /* useEffect(() => {
    const routesToExclude = [
      '/customer-list',
      '/unit-list',
      '/contract-info',
      '/userperformance',
    ];
    const isExcludedRoute = routesToExclude.some(
      (route) => location.pathname === route
    );
    if (
      !isExcludedRoute &&
      evaluation !== null &&
      (user.role === 'teacher' || user.role === 'supervisor')
    ) {
      setEvaluation(null);
    }
  }, [location.pathname, evaluation]);
 */

  //hamburger
  useEffect(() => {
    const routesToExclude = ['/customer-list', '/unit-list', '/contract-info', '/userperformance'];
    const isExcludedRoute = routesToExclude.some(route => location.pathname === route);
    if (!isExcludedRoute && evaluation !== null && (user.role === 'teacher' || user.role === 'supervisor')) {
      setEvaluation(null);
    }
  }, [location.pathname, evaluation, user.role, setEvaluation]);


  const handleIconClick = (destination) => {
    checkUnsavedChanges();
    handleNavigation(destination);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className='userNav__wrapper'>
      {/* Customer : old version Nav */}
      {/* {user && user.role === 'customer' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/unit-list')
                : () => navigate('/unit-list')
            }
          />
          <Icon
            icon='bx:file'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/contract-info')
                : () => navigate('/contract-info')
            }
          />
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />{' '}
        </div>
      )} */}

      {/* Supervisor : old Nav version */}
      {/* {user && user.role === 'supervisor' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {evaluation && (
            <Icon
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )}
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />
        </div>
      )} */}

      {/* Teacher : old Nav version */}
      {/* {user && user.role === 'teacher' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {evaluation && (
            <Icon
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )}
          <Icon
            icon='mingcute:group-line'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/admin-menu')
                : () => navigate('/admin-menu')
            }
          />
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />
        </div>
      )} */}

      {/* hamburger menu*/}
      <div className="mobile-menu-button" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
      <div className={`userNav__menu ${isMenuOpen ? 'userNav__menu--open' : ''}`}>
        <div className="userNav__menu__closeBtn" onClick={toggleMenu}>
          x
        </div>
        {/* Menu Items */}
        <div className={`userNav__icons ${user.role}`}>
          {user.role !== 'customer' && evaluation && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>}
          {user.role === 'teacher' && <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>} 
          <div className='nav_menu_list'>
            <div className='nav_menu_title'>
              <h4>Profiili</h4>
              <h4>Kirjaudu ulos</h4>
              <Icon
                icon="material-symbols:logout-rounded"
                onClick={() => navigate('/profile')} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserNav;
