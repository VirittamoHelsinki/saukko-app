import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InternalApiContext from '../../store/context/InternalApiContext';
import { Icon } from '@iconify/react';
import { Box, Button, Grid, Typography } from '@mui/material';
import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';
import { useAuthContext } from '../../store/context/authContextProvider';

const UserNav = ({ checkUnsavedChanges, handleNavigation, setMenuIsOpen, menuIsOpen }) => {
  const { currentUser } = useAuthContext();
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();

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
      (currentUser?.role === 'teacher' || currentUser?.role === 'supervisor')
    ) {
      setEvaluation(null);
    }
  }, [location.pathname, evaluation, currentUser, setEvaluation]);

  const handleIconClick = (destination) => {
    checkUnsavedChanges();
    handleNavigation(destination);
  };

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <main className='userNav__wrapper'>
      {/* for hamburger menu*/}
      {/* <div className='mobile-menu-button' onClick={toggleMenu}>
        <Icon icon='ci:menu-alt-05' />
      </div> */}
      <div
        className={`userNav__menu ${menuIsOpen ? 'userNav__menu--open' : ''}`}
      >
        <div className='userNav__menu__closeBtn' onClick={toggleMenu}>
          x
        </div>
        {/* Hamburger  Menu Items */}
        {/* set background color user's role */}
        <div className={`userNav__icons ${currentUser?.role}`}>
          <Box sx={{ height: '20vh', marginTop: '50px' }}>
            <img src={HelsinkiLogo} alt='' />
            <h1>OsTu</h1>
          </Box>
          {currentUser && currentUser.role === 'teacher' && (
            <>
              <Typography
                sx={{ fontWeight: '600', cursor: 'pointer' }}
                onClick={() => {
                  toggleMenu();
                  // Check for unsaved changes and navigate if needed
                  /* if (checkUnsavedChanges) {
                    handleIconClick('/degrees/add');
                  } else {
                    navigate('/degrees/add');
                  } */
                  navigate('/');
                }}
              >
                Home
              </Typography>
              <Typography
                sx={{ fontWeight: '600', cursor: 'pointer' }}
                onClick={() => {
                  toggleMenu();
                  // Check for unsaved changes and navigate if needed
                  if (checkUnsavedChanges) {
                    handleIconClick('/degrees/add');
                  } else {
                    navigate('/degrees/add');
                  }
                }}
              >
                Tutkinnot
              </Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/add/companyname');
                }
                }
                sx={{ fontWeight: '600', cursor: 'pointer' }}>Työpaikat</Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/evaluation-form');
                }}
                sx={{ fontWeight: '600', cursor: 'pointer' }}>
                + Luo uusi sopimus
              </Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                }}
                sx={{ fontWeight: '600', cursor: 'pointer' }}>Asiakkuudet</Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                }}
                sx={{ fontWeight: '600', cursor: 'pointer' }}>Opettajat</Typography>
            </>
          )}
          <div>
            {currentUser && currentUser.role !== 'teacher' && (
              <>
                <Typography
                  sx={{ fontWeight: '600', cursor: 'pointer' }}
                  onClick={() => {
                    toggleMenu();
                    navigate('/');
                  }}
                >
                  Home
                </Typography>
              </>
            )}
          </div>
          <Typography
            sx={{ fontWeight: '600', cursor: 'pointer' }}
            onClick={() => {
              toggleMenu();
              navigate('/profile');
            }}
          >
            Profiili
          </Typography>
          {/*  {user.role !== 'customer' && evaluation && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>} */}
          {/*  {user.role === 'teacher' && <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>}  */}
          <Grid container alignItems='flex-start' justifyContent='flex-end'>
            <Grid item>
              <Button
                onClick={() => {
                  toggleMenu();
                  navigate('/profile')
                }}
                sx={{ marginRight: '20px', marginBottom: '20px', cursor: 'pointer' }}
              >
                <Typography sx={{ fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                  Kirjaudu ulos
                </Typography>
                <Icon
                  icon='websymbol:logout'
                  color='black'
                  style={{ marginLeft: '10px' }}
                />
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
  );
};

export default UserNav;