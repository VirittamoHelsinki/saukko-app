import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthContext from '../../store/context/AuthContext';
import InternalApiContext from '../../store/context/InternalApiContext';

import { Icon } from '@iconify/react';

const ExUserNav = ({ checkUnsavedChanges, handleNavigation, destination }) => {
  const { user } = useContext(AuthContext);
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();


  // Clear chosen evaluation : old version Navbar
  useEffect(() => {
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


  useEffect(() => {
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
  }, [location.pathname, evaluation, user.role, setEvaluation]);

  const handleIconClick = (destination) => {
    checkUnsavedChanges();
    handleNavigation(destination);
  };


  return (
    <main className='userNav__wrapper'>
      {/* Customer : old version Nav : (sprint11) we can save old ver.nav for a while
       change main className='userNav__wrapper' when we need to change old version */}
       {user && user.role === 'customer' && (
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
      )}

      {/* Supervisor : old Nav version */}
      {user && user.role === 'supervisor' && (
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
      )} 

      {/* Teacher : old Nav version */}
      {user && user.role === 'teacher' && (
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
      )}
    </main>
  );
};

export default ExUserNav;