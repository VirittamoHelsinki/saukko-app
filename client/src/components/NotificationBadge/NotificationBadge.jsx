import icone from '../../assets/Internallink.svg'
import React from 'react';
import { Link } from 'react-router-dom';

const NotificationBadge = (props) => {
  const {number1,number2, backgroundColor1, backgroundColor2}= props

  const badgeStyle1 ={
    backgroundColor: backgroundColor1,
    width:'180px',
    height:'116px'
  
  }

  const badgeStyle2 = {
    backgroundColor: backgroundColor2,
    width:'180px',
    height:'116px'
  }

 
  return (
    <div className='notificationbadge-container'>
      <div className='badge' style={badgeStyle1}>
        <span className='numberstyle'>{number1}</span>
        <div className='bottom-container'>
          <span className='text'>Uutta ilmoitusta</span>
          <span className='icone-style'><Link to='/ilmoitusta'> <img src={icone} alt="" /></Link></span>
        </div>
      </div>
      <div className='badge' style={badgeStyle2}>
        <span className='numberstyle'>{number2}</span>
        <div className='bottom-container'>
          <span className='text'>Uutta viestiä</span>
          <span className='icone-style'><Link to='/viestia'><img src={icone} alt="" /></Link> </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationBadge;
















