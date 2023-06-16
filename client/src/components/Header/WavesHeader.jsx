// Import necessary react components
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { Icon } from '@iconify/react';

// Import helsinki logo
import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';
import AuthContext from '../../utils/context/AuthContext';

// Waves SVG
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
  const auth = useContext(AuthContext)
  const user = auth.user
  const navigate = useNavigate();

  // Define a CSS class and color based on the role props
  let roleClass = '';
  let roleColor = '';

  if (user?.role==='teacher'){
   
    roleColor ='#ffe977';
  }else if (user?.role === 'supervisor'){
    
    roleColor = '#f5a3c7';
  }else if (user?.role ==='customer'){
   
    roleColor = '#9fc9eb';
  } 
  
  // Apply the role color as inline style
  const roleStyle = {color:roleColor}


  return (
    <main className='wavesHeader__wrapper'>
      {!props.disabled && (
        <button id='backArrowSVG' onClick={() => navigate(-1)}>
          <Icon icon='typcn:arrow-left' />
        </button>
      )}
      <img src={HelsinkiLogo} alt='' />
      <h1>{props.title}</h1>
      {/* <h2>{name}</h2> */}
      {/* <Waves fill={roleStyle} /> */}
    </main>
  );
};

WavesHeader.defaultProps = {
  secondTitle: '',
};

export default WavesHeader;


