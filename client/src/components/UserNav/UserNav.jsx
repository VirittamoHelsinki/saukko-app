import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InternalApiContext from '../../store/context/InternalApiContext';
import { Icon } from '@iconify/react';
import { Box, Button, Grid, Typography, List, ListItem } from '@mui/material';
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
    <div className='userNav__wrapper'>
      {/* for hamburger menu*/}
      {/* <div className='mobile-menu-button' onClick={toggleMenu}>
        <Icon icon='ci:menu-alt-05' />
      </div> */}
      <div
        className={`userNav__menu ${menuIsOpen ? 'userNav__menu--open' : ''}`}
      >
        {/* <div className='userNav__menu__closeBtn' onClick={toggleMenu}>
          x
        </div> */}
        {/* Hamburger  Menu Items */}
        {/* set background color user's role */}
        <div className={`userNav__icons ${currentUser?.role}`}>
          <Box sx={{ height: '20vh', marginTop: '50px' }}>
            <img src={HelsinkiLogo} alt='' />
            <h1>OsTu</h1>
          </Box>
          <Box
            alignItems='left'
            style={{ maxHeight: '100%', overflowY: 'auto', marginLeft: '-30px' }}
            sx={{
              marginTop: '12px',
              width: '45%',
              height: '100vh',
              fontSize: '32px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ textAlign: 'left', flexGrow: 1 }}>
              <List>
                <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                  <Typography
                    className='NavText'
                    onClick={() => {
                      toggleMenu();
                      navigate('/');
                    }}
                  >
                    Etusivu
                  </Typography>
                </ListItem>
                {currentUser && currentUser.role === 'teacher' && (
                  <>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                      <Typography
                        className='NavText'
                        onClick={() => {
                          toggleMenu();
                          // Check for unsaved changes and navigate if needed
                          if (checkUnsavedChanges) {
                            handleIconClick('/degrees/add');
                          } else {
                            navigate('/degrees/add');
                          }
                        }}
                        style={{ height: '100%' }}
                      >
                        Tutkinnot
                      </Typography>
                    </ListItem>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                      <Typography
                        onClick={() => {
                          toggleMenu();
                          navigate('/add/companyname');
                        }
                        }
                        className='NavText'
                      >
                        Työpaikat
                      </Typography>
                    </ListItem>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                      <Typography
                        onClick={() => {
                          toggleMenu();
                          navigate('/evaluation-form');
                        }}
                        className='NavText'
                      >
                        + Luo uusi sopimus
                      </Typography>
                    </ListItem>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                      <Typography
                        onClick={() => {
                          toggleMenu();
                          navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                        }}
                        className='NavText'
                      >
                        Asiakkuudet
                      </Typography>
                    </ListItem>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '10px' }}>
                      <Typography
                        onClick={() => {
                          toggleMenu();
                          navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                        }}
                        className='NavText'
                      >
                        Opettajat
                      </Typography>
                    </ListItem>
                  </>
                )}
                <ListItem style={{ marginBottom: '20px' }}>
                  <Typography
                    className='NavText'
                    onClick={() => {
                      toggleMenu();
                      navigate('/profile');
                    }}
                  >
                    Profiili
                  </Typography>
                </ListItem>
              </List>
            </div>
          </Box>
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
    </div>
  );
};

export default UserNav;