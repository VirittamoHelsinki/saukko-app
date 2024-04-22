import { useLocation, useNavigate, useNavigationType, Outlet } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuthContext } from '../../store/context/authContextProvider';
import styles from './pageLayout.module.scss';
import { useHeadingContext } from '../../store/context/headingContectProvider';
import UserNav from '../UserNav/UserNav';
import { useEffect, useState } from 'react';

const Waves = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      width='100%'
      height='35'
      fill={props.fill}
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
  const [headinIsDisabled, setHeadingIsDisabled] = useState(false);

  const headerColor = getHeaderColor(currentUser?.role);
  const wrapperStyle = {
    backgroundColor: headerColor,
  };

  const logoColor = currentUser?.role ? '#000' : '#fff';

  const showBackButton = navigationType !== 'POP' && location.key !== 'default';

  const renderHeader = currentUser && currentUser.role;

  
  useEffect(() => {
    const wavesHeadingDisabledPaths = ["verify-email"]
    setHeadingIsDisabled(wavesHeadingDisabledPaths.some(path => {
      console.log(window.location.pathname, path);
      return window.location.pathname.includes(path)
    }))
  }, [])

  useEffect(() => {
    document.title = siteTitle ? `${siteTitle} | OsTu App` : "OsTu App";
  }, [siteTitle]);

  return (
    <>
      <div className={styles.container}>
        {renderHeader && !headinIsDisabled && <header style={wrapperStyle}>
          {showBackButton  && <button onClick={() => navigate(-1)}>
            <Icon icon="typcn:arrow-left" style={{ color: logoColor }} />
          </button>}
          <button onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <Icon icon={menuIsOpen ? 'material-symbols:close' : 'ci:menu-alt-05'} />
          </button>
          {heading && <h1>{heading}</h1>}
          {subHeading && <p>{subHeading}</p>}
          <Waves fill="#fff" />
        </header>}
        <main>
          <Outlet />
        </main>
      </div>
      <UserNav setMenuIsOpen={setMenuIsOpen} menuIsOpen={menuIsOpen} />
    </>
  )
}

export default PageLayout;
