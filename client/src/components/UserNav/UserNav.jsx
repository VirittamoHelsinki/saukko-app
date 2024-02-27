import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AuthContext from '../../store/context/AuthContext';
import InternalApiContext from '../../store/context/InternalApiContext';

const UserNav = ({ checkUnsavedChanges, handleNavigation, destination }) => {
  const { user } = useContext(AuthContext);
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear chosen evaluation
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

  const handleIconClick = (destination) => {
    checkUnsavedChanges();
    handleNavigation(destination);
  };

  return (
    <main className='userNav__wrapper'>
      {/* Customer */}
      {user && user.role === 'customer' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            id='customer-home-icon'
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/unit-list')
                : () => navigate('/unit-list')
            }
          />
          <Icon
            id='customer-file-icon'
            icon='bx:file'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/contract-info')
                : () => navigate('/contract-info')
            }
          />
          <Icon
            id='customer-profile-icon'
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />{' '}
        </div>
      )}

      {/* Supervisor */}
      {user && user.role === 'supervisor' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            id='supervisor-home-icon'
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {evaluation && (
            <Icon
            id='supervisor-file-icon'
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )}
          <Icon
            id='supervisor-profile-icon'
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />
        </div>
      )}

      {/* Teacher */}
      {user && user.role === 'teacher' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            id='teacher-home-icon'
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {evaluation && (
            <Icon
              id='teacher-file-icon'
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )}
          <Icon
            id='teacher-admin-icon'
            icon='mingcute:group-line'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/admin-menu')
                : () => navigate('/admin-menu')
            }
          />
          <Icon
            id='teacher-profile-icon'
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

export default UserNav;
