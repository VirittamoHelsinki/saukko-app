// import necessary react components
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

// import helsinki logo
import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';

// waves SVG
const Waves = (props) => {
  return (
    <svg
      className='karos-waves'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      width='100%'
      height='85'
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
      <rect fill={'url(#korosBasic)'} width='100%' height='85' />
    </svg>
  );
};

const WavesHeader = (props) => {
  const [inIndex, setInIndex] = useState();

  let location = useLocation();
  const navigate = useNavigate();

  // check current page return setIndex true or false
  useEffect(() => {
    setInIndex(location.pathname === '/home');
  }, [location.pathname]);
  return (
    <main style={props.style} className='wavesHeader__wrapper'>
      {/* do not render backwards arrow on specific pages */}

      {!props.disabled && (
        <button id='backArrowSVG' onClick={() => navigate(-1)}>
          <Icon icon='typcn:arrow-left' />
        </button>
      )}
      <img src={HelsinkiLogo} alt='' />
      <h1>{props.title}</h1>
      <h2>{props.secondTitle}</h2>
      <Waves fill={props.fill} />
    </main>
  );
};

WavesHeader.defaultProps = {
  secondTitle: '',
};

export default WavesHeader;
