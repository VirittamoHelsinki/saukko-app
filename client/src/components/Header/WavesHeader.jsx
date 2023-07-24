// Import necessary react components
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';

// Import helsinki logo
import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';
import HelsinkiWhiteLogo from '../../assets/Helsinki_white_logo.png'
import AuthContext from '../../utils/context/AuthContext';

const Waves = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      width='100%'
      height='85'
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
      <rect fill='url(#korosBasic)' width='100%' height='85' />
    </svg>
  );
};

const WavesHeader = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth.user;
  const role = user?.role;

  // Determine which logo to use based on the role
  const logoToUse = role ? HelsinkiLogo : HelsinkiWhiteLogo;
  const logoColor = role ? 'black' : 'white'

  const getHeaderColor = () => {
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

  const headerColor = getHeaderColor();

  const wrapperStyle = {
    backgroundColor: headerColor,
  };

  return (
    <main className='wavesHeader__wrapper' style={wrapperStyle}>
      {!props.disabled && (
        <button id='backArrowSVG' onClick={() => navigate(-1)}>
          <Icon icon='typcn:arrow-left' style={{ color: logoColor }} />
        </button>
      )}
      <img src={logoToUse} alt='' />
      <h1>{props.title}</h1>
      <h2>{props.secondTitle}</h2>
      <Waves fill={headerColor} />

    </main>
  );
};

WavesHeader.defaultProps = {
  secondTitle: '',
};

export default WavesHeader;













