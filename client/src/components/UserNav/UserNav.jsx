import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AuthContext from '../../store/context/AuthContext';
import formStore from '../../store/zustand/formStore';

const UserNav = () => {
  const { user } = useContext(AuthContext);
  const { chosenEvaluationId, clearChosenEvaluationId } = formStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Clear chosen evaluation
  useEffect(() => {
    const routesToExclude = ['/customer-list', '/unit-list', '/contract-info', '/userperformance'];
    const isExcludedRoute = routesToExclude.some(route => location.pathname === route);
    if (!isExcludedRoute && chosenEvaluationId !== null) {
      clearChosenEvaluationId();
    }
  }, [location.pathname, chosenEvaluationId, clearChosenEvaluationId]);

  return (
    <main className='userNav__wrapper'>
        {/* Customer */}
        {user && user.role === 'customer' &&
          <div className={`userNav__icons ${user.role}`}>
            <Icon icon="ic:outline-home" onClick={() => navigate('/unit-list')}/>
            <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>
            <Icon icon="mdi:user-outline" onClick={() => navigate('/profile')}/>
          </div>
        }

        {/* Supervisor */}
        {user && user.role === 'supervisor' &&
          <div className={`userNav__icons ${user.role}`}>
            <Icon icon="ic:outline-home" onClick={() => navigate('/customer-list')}/>
            {chosenEvaluationId && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>}
            <Icon icon="mdi:user-outline" onClick={() => navigate('/profile')}/>
          </div>
        }

        {/* Teacher */}
        {user && user.role === 'teacher' &&
          <div className={`userNav__icons ${user.role}`}>
            <Icon icon="ic:outline-home" onClick={() => navigate('/customer-list')}/>
            {chosenEvaluationId && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>}
            <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>
            <Icon icon="mdi:user-outline" onClick={() => navigate('/profile')}/>
          </div>
        }
    </main>
  );
};

export default UserNav;