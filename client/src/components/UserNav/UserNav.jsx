import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AuthContext from '../../store/context/AuthContext';

const UserNav = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <main className='userNav__wrapper'>
        {user && (user.role === 'customer' || user.role === 'supervisor') &&
          <div className={`userNav__icons ${user.role}`}>
            <Icon icon="ic:outline-home" onClick={() => navigate('/userdashboard')}/>
            <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>
            <Icon icon="mdi:user-outline" onClick={() => navigate('/profile')}/>
          </div>
        }

        {user && user.role === 'teacher' &&
          <div className={`userNav__icons ${user.role}`}>
            <Icon icon="ic:outline-home" onClick={() => navigate('/userdashboard')}/>
            <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>
            <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>
            <Icon icon="mdi:user-outline" onClick={() => navigate('/profile')}/>
          </div>
        }
    </main>
  );
};

export default UserNav;