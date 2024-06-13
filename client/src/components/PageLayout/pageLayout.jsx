import { useLocation, useNavigate, useNavigationType, Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuthContext } from '../../store/context/authContextProvider';
import styles from './pageLayout.module.scss';
import { useHeadingContext } from '../../store/context/headingContectProvider';
import UserNav from '../UserNav/UserNav';
import {useEffect, useState, useRef } from 'react';
import { DialogActions } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const Waves = ({ fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      width='100%'
      height='35'
      fill={fill}
    >
      <defs>
        <pattern
          id='korosBasic'
          x='0'
          y='0'
          width='106'
          height='85'
          patternUnits='userSpaceOnUse'
        >
          <path
            transform='scale(5.3)'
            d='M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z'
          />
        </pattern>
      </defs>
      <rect fill='url(#korosBasic)' width='100%' height='35' />
    </svg>
  );
};

const getHeaderColor = (role) => {
  // Define color based on role
  switch (role) {
    case 'customer':
      return '#9fc9eb';
    case 'teacher':
      return '#FFC61E';
    case 'supervisor':
      return '#f5a3c7';
    default:
      return '#00005E';
  }
};

const PageLayout = () => {
  const { currentUser } = useAuthContext();
  const { heading, subHeading, siteTitle } = useHeadingContext();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [headingIsDisabled, setHeadingIsDisabled] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const headerColor = getHeaderColor(currentUser?.role);
  const wrapperStyle = {
    backgroundColor: headerColor,
    marginBottom: '-1rem',
  };

  // close hamburgermenu when user click outside, except Box componet
  const menuRef = useRef(null);
  const userNavRef = useRef(null);

  const logoColor = currentUser?.role ? '#000' : '#fff';

  const showBackButton = navigationType !== 'POP' && location.key !== 'default';

  const renderHeader = currentUser && currentUser.role;

  const regex = /^\/degrees\/(?!add\b)[a-zA-Z0-9]+(\/(units|edit-units|units\/tasks|summary))?$/;

  useEffect(() => {
    // Add pages in array below, where the waves header should not render
    const wavesHeadingDisabledPaths = ["verify-email",]
    setHeadingIsDisabled(wavesHeadingDisabledPaths.some(path => {
      console.log(window.location.pathname, path);
      return window.location.pathname.includes(path)
    }))
  }, [])

  useEffect(() => {
    document.title = siteTitle ? `${siteTitle} | OsTu App` : "OsTu App";
  }, [siteTitle]);

  // Close menu when user click outside of hamburgermenu
  useEffect(()=>{
    function handleClickOutside(event){
      if(menuRef.current && !menuRef.current.contains(event.target) && userNavRef.current !== event.target){
        setMenuIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  },[menuRef])

  const handleMenuToggle = () => {
    console.log('path: ', location.pathname)
    if (!menuIsOpen && regex.test(location.pathname)) {
      setShowWarning(true);
    } else {
      setMenuIsOpen(!menuIsOpen);
    }
  };

  const handleWarningClose = () => {
    setShowWarning(false);
  };

  const handleProceed = () => {
    setShowWarning(false);
    setMenuIsOpen(true);
  };


  return (
    <>
      <UserNav setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
      <div className={styles.container}>
        {renderHeader && !headingIsDisabled && (
          <header>
            {showBackButton && (
              <button onClick={() => navigate(-1)}>
                <Icon icon="typcn:arrow-left" style={{ color: logoColor }} />
              </button>
            )}
            <div className={styles.buttonContainer} ref={menuRef}>
              <button onClick={() => handleMenuToggle()} style={{marginBottom: '0.3rem'}}>
                <Icon icon={menuIsOpen ? 'material-symbols:close' : 'ci:hamburger-md'} />
              </button>
            </div>
            {!menuIsOpen && <div className={styles.headerBox} style={wrapperStyle}>
              {<h1>{heading}</h1>}
              {<p>{subHeading}</p>}
            </div>}
            <Waves fill={headerColor} />
          </header>
        )}
        <main className={styles.main}>
          <Outlet />
        </main>
        <Dialog
          open={showWarning}
          onClose={handleWarningClose}
          aria-labelledby="warning-dialog-title"
          aria-describedby="warning-dialog-description"
        >
          <DialogTitle id="warning-dialog-title">Varoitus</DialogTitle>
          <DialogContent>
            <p id="warning-dialog-description">
              Jos poistut tutkinnon luonnista, valitut tutkinnon osat eivät tallennu. Haluatko jatkaa?
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleWarningClose} color="primary">
              Peruuta
            </Button>
            <Button onClick={handleProceed} color="primary" autoFocus>
              Jatka
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default PageLayout;
