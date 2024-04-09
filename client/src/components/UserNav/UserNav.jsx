import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthContext from '../../store/context/AuthContext';
import InternalApiContext from '../../store/context/InternalApiContext';

import { Icon } from '@iconify/react';
import { Box, Button, Grid, Typography, List, ListItem } from '@mui/material';

import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';

const UserNav = ({ checkUnsavedChanges, handleNavigation }) => {
  const { user } = useContext(AuthContext);
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className='userNav__wrapper'>
      {/* for hamburger menu*/}
      {/* teacher */}
      <div className='mobile-menu-button' onClick={toggleMenu}>
        {/* Hamburger icon */}
        <Icon icon='ci:menu-alt-05' />
      </div>
      <div
        className={`userNav__menu ${isMenuOpen ? 'userNav__menu--open' : ''}`}
      >
        <div className='userNav__menu__closeBtn' onClick={toggleMenu}>
          x
        </div>
        {/* Hamburger  Menu Items */}
        {/* set background color user's role */}
        <div 
          sx={{bgcolor: 'text.disabled'}}
          className={`userNav__icons ${user.role}`}>
          <Box 
            sx={{ height: '20vh', width: '18vw', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <img
              sx={{width: '100%'}} 
              src={HelsinkiLogo} alt='' />
            <h1>OsTu</h1>
          </Box>
          {user && user.role === 'teacher' && (
          <Box 
            alignItems='center'
            sx={{ 
              marginTop: '-50px', width:'35%', height:'50%',
              fontSize:'32px', fontWeight: '600', cursor: 'pointer'
               }}
            >
            <div style={{ textAlign: 'left'}}>
              <List>
                <ListItem style={{ marginBottom: '20px',paddingBottom: '15px' }}>
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
                <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
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
                <ListItem style={{ marginBottom: '20px',paddingBottom: '15px' }}>
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
                <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
                  <Typography 
                    onClick={()=>{
                      toggleMenu();
                      navigate('/evaluation-form');
                  }}
                    className='NavText'
                    >
                    + Luo uusi sopimus
                  </Typography>
                </ListItem>
                <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
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
                <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
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
                <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
                  <Typography
                    className='NavText'
                    onClick={() =>{
                      toggleMenu(); 
                      navigate('/profile');}}
                    >
                      Profiili
                  </Typography>
                </ListItem>
              </List>
              {/* tästä entinen koodi */}
              {/* <Typography
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px' }}
                onClick={() => {
                  toggleMenu();
                  navigate('/');
                }}
              >
                Home
              </Typography>
              <Typography
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px' }}
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
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px'  }}
                >Työpaikat</Typography>
              <Typography 
                onClick={()=>{
                  toggleMenu();
                  navigate('/evaluation-form');
              }}
                className='NavText'
                sx={{ fontWeight: '600', cursor:'pointer', marginBottom: '10px', fontSize:'32px' }}
                >
                + Luo uusi sopimus
              </Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                }}
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px'  }}
                >Asiakkuudet</Typography>
              <Typography
                onClick={() => {
                  toggleMenu();
                  navigate('/'); // ominaiisuus ei vielä valmis:sprint 12
                }}
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px'  }}
                >
                  Opettajat
              </Typography>
              <Typography
                className='NavText'
                sx={{ fontWeight: '600', cursor: 'pointer', marginBottom: '10px', fontSize:'32px' }}
                onClick={() =>{
                  toggleMenu(); 
                  navigate('/profile');}}
                >
                  Profiili
              </Typography> */}
            </div>
          </Box>
          )}
          
          {/* For customer and TPO */}
          {user && user.role !== 'teacher' && (
          <Box
            alignItems='center'
            sx={{ 
              marginTop: '20px', width:'35%', height:'50%',
              fontSize:'32px', fontWeight: '600', cursor: 'pointer'
              }}>
              <div className='nav-MenuList'>
                  <div style={{ textAlign: 'left'}}>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
                      <Typography
                        className='NavText'
                        sx={{ fontWeight: '600', cursor: 'pointer', fontSize:'32px'  }}
                        onClick={() => {
                          toggleMenu();
                          navigate('/');
                        }}
                      >
                        Etusivu
                      </Typography>
                    </ListItem>
                    <ListItem style={{ marginBottom: '20px', paddingBottom: '15px' }}>
                      <Typography
                        className='NavText'
                        sx={{ fontWeight: '600', cursor: 'pointer', fontSize:'32px' }}
                        onClick={() =>{
                          toggleMenu(); 
                          navigate('/profile');}}
                        >
                        Profiili
                      </Typography>
                    </ListItem>
                  </div>
              </div>
          </Box>    
          )}
              {/*  {user.role !== 'customer' && evaluation && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>} */}
              {/*  {user.role === 'teacher' && <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>}  */}
              {/* Kirjaudu ulos logo */}
              <Grid container alignItems='flex-start' justifyContent='flex-end'>
                <Grid item>
                  <Button
                    onClick={() =>{
                      toggleMenu(); 
                      navigate('/profile')}}
                    sx={{ marginRight: '20px', marginBottom: '20px', cursor: 'pointer' }}
                  >
                    <Typography 
                      sx={{ fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
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