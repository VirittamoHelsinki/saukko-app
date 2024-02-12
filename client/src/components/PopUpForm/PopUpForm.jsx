
import React from 'react';
import { Icon } from '@iconify/react';
import Button from '../Button/Button';

function PopUpForm({ open, handleClose, handleSubmit, title, description, content, buttonText }) {

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      handleClose();
    }
  };
  
  return(
    <form onSubmit={handleSubmit}>
      {open && (
        <div className='popup' onClick={handleOverlayClick}>
          <div className='popup-content'>
            <Icon icon='ph:x-bold' onClick={handleClose}/>
            <div className='popup-title'>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            {content}
            <Button
              className='popup-submit'
              text={buttonText}
              type='submit'
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default PopUpForm;
