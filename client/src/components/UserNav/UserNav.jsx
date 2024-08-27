import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InternalApiContext from '../../store/context/InternalApiContext';
import { Icon } from '@iconify/react';
import { Button, Grid, Typography } from '@mui/material';
import { useAuthContext } from '../../store/context/authContextProvider';
import { logoutUser } from '../../api/user';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotificationModal from '../../pages/Home/Notification/NotificationModal';

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const UserNav = () => {
  const { currentUser } = useAuthContext();
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  const handleProceed = () => {
    setShowWarning(false);
    setMenuIsOpen(true);
  };

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

  // Render these if currentUser's role is 'teacher'
  const navigationLinkData = [
    {
      to: "/degrees/add",
      label: "Tutkinnot",
    },
    {
      to: "add/companyname",
      label: "Työpaikat",
    },
    {
      to: "/evaluation-form",
      label: "+ Luo uusi sopimus",
    },
    {
      to: "/404",
      label: "Asiakkuudet",
    },
    {
      to: "/404",
      label: "Opettajat",
    },
  ];

  const handleNavigationLinkClick = (to) => {
    toggleMenu();
    navigate(to);
  }

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);
  const closeMenu = () => setMenuIsOpen(false);

  const LogOut = async () => {
    try {
      await logoutUser();
      toggleMenu();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleMenuToggle = () => {
    const regex = /^\/degrees\/(?!add\b)[a-zA-Z0-9]+(\/(units|edit-units|units\/tasks|summary))?$|^\/company-info$|^\/internal\/degrees(\/[a-zA-Z0-9]+\/units(\/confirm-selection)?)?$|^\/(evaluation-form|evaluation-workplace|evaluation-units|evaluation-summary)$|^\/userperformance\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/;

    if (!menuIsOpen && regex.test(location.pathname)) {
      setShowWarning(true);
      return;
    }

    setMenuIsOpen((oldValue) => !oldValue);
  };




  return (
    <>
      <Dialog
        open={showWarning}
        onClose={handleWarningClose}
        aria-labelledby="warning-dialog-title"
        aria-describedby="warning-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            position: 'relative',
            background: '#FFF4B4', // Gradient background for the dialog
            paddingLeft: '8px', // Space for the accent line
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '8px',
              height: '100%',
              backgroundColor: '#DCA500', // Accent color
              zIndex: 1, // Ensure it is behind the content but in front of the background
            },
          }
        }}
      >
        <DialogTitle id="warning-dialog-title" sx={{
          backgroundColor: '#FFF4B4',
          color: 'black',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          zIndex: 2, // Ensure title is on top
        }}>Varoitus</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#FFF4B4', display: 'flex', alignItems: 'center', zIndex: 2 }}>
          <ErrorOutlineIcon sx={{ color: '#DCA500', marginRight: 1 }} /> {/* Icon color and margin */}
          <p id="warning-dialog-description" style={{ margin: 0 }}>
            Jos poistut sivulta, tallentamattomat tiedot menetetään.
          </p>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#FFF4B4', zIndex: 2, justifyContent: 'center', gap: '20px' }}>
          <Button
            onClick={handleWarningClose}
            sx={{
              color: '#0000BF',
              borderColor: '#0000BF',
              backgroundColor: 'white',
              border: '2px solid',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '0',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 191, 0.1)',
              }
            }}
          >
            Peruuta
          </Button>
          <Button
            onClick={handleProceed}
            sx={{
              color: '#FFFFFF',
              backgroundColor: '#0000BF',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '0',
              '&:hover': {
                backgroundColor: '#0000A0',
              }
            }}
          >
            Poistu sivulta
          </Button>
        </DialogActions>
      </Dialog>

      <div className='userNav__wrapper'>
        { /* Background shadow for the opened hamburger menu */}
        <div className={`userNav__shadow ${menuIsOpen ? '' : 'hidden'}`} onClick={closeMenu}></div>

        <div className="userNav__toggle">
          {/* HAMBURGER MENU TOGGLE */}
          <button onClick={() => handleMenuToggle()} >
            <Icon
              icon={menuIsOpen ? 'material-symbols:close' : 'ci:hamburger-md'}
              style={{ pointerEvents: "none" }} // Disable pointer events on icon
            />
          </button>
        </div>


        <div className={`userNav__menu ${menuIsOpen ? 'userNav__menu--open' : ''} ${currentUser?.role}`}>

          <div className="logo">
            <svg className="helsinki-logo" xmlns="http://www.w3.org/2000/svg" width="113" height="52" viewBox="0 0 113 52" fill="none">
              <path d="M56.5228 51.1609L54.8307 49.4841C52.5463 47.2287 49.4637 45.9665 46.2536 45.9719H14.4276C10.8561 45.9927 7.42207 44.596 4.87898 42.0881C2.33589 39.5803 0.891373 36.1661 0.862305 32.5946L0.862305 0H112.137V32.6151C112.099 36.1958 110.643 39.6152 108.087 42.1233C105.531 44.6314 102.085 46.0233 98.5042 45.9937H66.7691C65.1788 45.9868 63.6027 46.2935 62.131 46.8961C60.6592 47.4988 59.3207 48.3856 58.192 49.5059L56.5228 51.1609ZM4.09056 3.19756V32.6151C4.11186 35.3376 5.21209 37.9406 7.14994 39.853C9.08779 41.7654 11.705 42.8312 14.4276 42.8166H46.2523C50.0297 42.8154 53.6761 44.2008 56.4998 46.7099C59.3189 44.1934 62.9684 42.8073 66.7473 42.8179H98.5055C101.24 42.8441 103.874 41.7848 105.828 39.8721C107.783 37.9594 108.899 35.3496 108.932 32.6151V3.19756H4.09056Z" fill="black" />
              <path d="M55.635 30.5313C54.5477 30.6164 53.4578 30.403 52.483 29.9141C51.5081 29.4252 50.6853 28.6794 50.1032 27.7571L52.802 26.2811C52.9636 26.8891 53.3282 27.4236 53.8354 27.7958C54.3425 28.168 54.9617 28.3556 55.5902 28.3275C56.5277 28.3275 57.0867 27.9323 57.0867 27.2711C57.0867 26.5343 56.1786 26.2977 55.03 25.9984C54.8382 25.9486 54.6386 25.8961 54.434 25.8398C51.9169 25.2003 50.6928 24.1285 50.6928 22.5579C50.6928 20.6393 52.5244 19.2554 55.0415 19.2554C56.021 19.2108 56.9961 19.4108 57.8789 19.8376C58.7616 20.2643 59.5241 20.9043 60.0975 21.6996L57.4474 23.1552C57.3108 22.6532 57.0082 22.2124 56.589 21.9044C56.1697 21.5964 55.6586 21.4395 55.1387 21.4592C54.2575 21.4592 53.687 21.8429 53.687 22.4274C53.687 23.0349 54.4826 23.2357 55.5826 23.5133C55.9458 23.6054 56.35 23.709 56.7708 23.8369C58.4898 24.3638 60.0809 25.1236 60.0809 27.0958C60.0841 27.5939 59.9646 28.085 59.7328 28.5259C59.501 28.9667 59.1641 29.3436 58.752 29.6232C57.8325 30.2422 56.7431 30.5596 55.635 30.5313ZM36.9996 30.5313C36.2929 30.5551 35.5886 30.4357 34.9292 30.1803C34.2698 29.9248 33.6689 29.5387 33.1626 29.0451C32.6494 28.4913 32.251 27.8413 31.9904 27.1326C31.7298 26.424 31.6122 25.6707 31.6444 24.9164C31.615 24.1629 31.7348 23.4111 31.9969 22.7041C32.259 21.9971 32.6581 21.3489 33.1715 20.7966C33.6658 20.3091 34.2527 19.9256 34.8977 19.6688C35.5427 19.412 36.2326 19.2871 36.9267 19.3015C37.5864 19.2796 38.2436 19.3913 38.859 19.6297C39.4744 19.8682 40.0353 20.2286 40.508 20.6892C40.9592 21.1642 41.3116 21.7242 41.5445 22.3366C41.7775 22.949 41.8864 23.6016 41.865 24.2564C41.8559 24.7444 41.8037 25.2306 41.709 25.7094H34.572C34.6999 27.3363 35.6068 28.3071 37.0022 28.3071C37.5117 28.3267 38.0107 28.158 38.4037 27.8331C38.7968 27.5082 39.0564 27.05 39.133 26.5459L41.7397 27.9771C41.2464 28.7846 40.5475 29.4466 39.7144 29.8953C38.8813 30.3441 37.944 30.5636 36.9983 30.5313H36.9996ZM36.9318 21.4374C36.3366 21.4566 35.7699 21.6967 35.3421 22.111C34.9144 22.5253 34.6562 23.084 34.6181 23.6783H38.9668C38.98 23.3739 38.9322 23.07 38.8261 22.7844C38.72 22.4989 38.5577 22.2374 38.349 22.0156C38.1631 21.8295 37.9418 21.6825 37.6982 21.5832C37.4546 21.4839 37.1949 21.4343 36.9318 21.4374ZM47.2241 30.4661C46.8047 30.5045 46.3817 30.4579 45.9807 30.3292C45.5796 30.2004 45.2086 29.992 44.8899 29.7166C44.3502 29.03 44.0906 28.1644 44.1634 27.2941V14.9413H47.2689V26.8528C47.2315 27.2204 47.3107 27.5905 47.4953 27.9106C47.5763 28.0238 47.687 28.1123 47.8152 28.1665C47.9435 28.2207 48.0841 28.2383 48.2218 28.2175C48.4418 28.2271 48.6623 28.2125 48.8792 28.1741C49.1044 28.1405 49.3249 28.0813 49.5366 27.9975L49.2655 30.0235C48.9715 30.1743 48.6588 30.2852 48.3356 30.3535C47.9687 30.4239 47.5964 30.4615 47.2229 30.4661H47.2241ZM84.7443 30.2691H81.6606V14.853H84.7443V21.9657C84.737 22.8482 84.684 23.7298 84.5857 24.6069H84.6535L84.6675 24.5838C84.8978 24.218 85.4874 23.2907 85.9913 22.6039L88.3486 19.5432H91.9746L88.2565 23.7934L92.3135 30.2653H88.9356L86.219 25.9729L84.7456 27.7788V30.2678L84.7443 30.2691ZM71.8441 30.2691H68.7603V19.5445H71.8428L71.6855 21.3057H71.7532C72.0519 20.6858 72.5227 20.1651 73.1095 19.8058C73.6963 19.4465 74.3742 19.2639 75.0621 19.2797C75.5364 19.2588 76.0096 19.3431 76.4476 19.5264C76.8856 19.7097 77.2777 19.9875 77.5958 20.34C78.2615 21.2157 78.593 22.3 78.5308 23.3982L78.509 30.2678H75.4036V23.9916C75.4036 22.5041 74.8779 21.8173 73.7485 21.8173C73.4815 21.8148 73.217 21.8687 72.9722 21.9755C72.7274 22.0822 72.5079 22.2394 72.3281 22.4368C72.1482 22.6342 72.012 22.8673 71.9284 23.1209C71.8448 23.3745 71.8156 23.6429 71.8428 23.9085V30.2729L71.8441 30.2691ZM19.8607 30.2691H16.6401V15.536H19.8594V21.3492H25.9118V15.5143H29.1324V30.2665H25.9118V24.1682H19.8594V30.2678L19.8607 30.2691ZM96.941 30.2691H93.8343V19.5445H96.9398V30.2665L96.941 30.2691ZM65.5423 30.2691H62.4292V19.5445H65.5346V30.2665L65.5423 30.2691ZM95.3985 18.2655C95.1698 18.2781 94.941 18.2443 94.7257 18.1661C94.5104 18.0879 94.3132 17.967 94.1459 17.8105C93.9786 17.6541 93.8447 17.4654 93.7522 17.2559C93.6598 17.0463 93.6107 16.8202 93.6079 16.5912C93.6107 16.3622 93.6598 16.1361 93.7522 15.9266C93.8447 15.717 93.9786 15.5283 94.1459 15.3719C94.3132 15.2155 94.5104 15.0945 94.7257 15.0163C94.941 14.9382 95.1698 14.9044 95.3985 14.917H95.4868C95.71 14.91 95.9323 14.9484 96.1403 15.0298C96.3483 15.1112 96.5376 15.2339 96.6968 15.3905C96.8561 15.5471 96.9819 15.7344 97.0667 15.9409C97.1516 16.1475 97.1937 16.3692 97.1905 16.5925C97.1875 16.8215 97.1383 17.0476 97.0457 17.2571C96.9531 17.4666 96.819 17.6552 96.6516 17.8115C96.4842 17.9678 96.2868 18.0886 96.0715 18.1666C95.8561 18.2446 95.6272 18.2783 95.3985 18.2655ZM63.9998 18.2655C63.7711 18.2781 63.5422 18.2443 63.3269 18.1661C63.1117 18.0879 62.9144 17.967 62.7471 17.8105C62.5798 17.6541 62.4459 17.4654 62.3535 17.2559C62.261 17.0463 62.2119 16.8202 62.2092 16.5912C62.2119 16.3622 62.261 16.1361 62.3535 15.9266C62.4459 15.717 62.5798 15.5283 62.7471 15.3719C62.9144 15.2155 63.1117 15.0945 63.3269 15.0163C63.5422 14.9382 63.7711 14.9044 63.9998 14.917H64.0893C64.3131 14.9076 64.5363 14.9443 64.7453 15.0249C64.9542 15.1054 65.1443 15.2281 65.3038 15.3852C65.4634 15.5423 65.5889 15.7306 65.6726 15.9383C65.7563 16.146 65.7964 16.3687 65.7904 16.5925C65.7875 16.8214 65.7383 17.0474 65.6458 17.2568C65.5532 17.4662 65.4193 17.6547 65.252 17.811C65.0847 17.9673 64.8876 18.0881 64.6724 18.1662C64.4572 18.2443 64.2284 18.2781 63.9998 18.2655Z" fill="black" />
            </svg>
            <h1 className='logo-text'>OsTu</h1>
          </div>

          <div className="nav-links">
            <div className='navListItem'>
              <p
                className='NavText'
                onClick={() => handleNavigationLinkClick("/")}
              >
                Etusivu
              </p>
            </div>

            {currentUser && currentUser.role === 'teacher' && (
              navigationLinkData.map(({ to, label }) => (
                <div
                  key={label}
                  className='navListItem'
                  onClick={() => handleNavigationLinkClick(to)}
                >
                  <p className='NavText'>{label}</p>
                </div>
              ))
            )}

            <div className='navListItem'>
              <p
                className='NavText'
                onClick={() => handleNavigationLinkClick("/profile")}
              >
                Profiili
              </p>
            </div>
          </div>

          <Grid container alignItems='flex-start' justifyContent='flex-end'>
            <Grid item>
              <Button
                onClick={LogOut}
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
    </>
  );
};

export default UserNav;
