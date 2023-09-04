/* 
  Example usage:

  // Set state for opening pop-up
  const [openPasswordPopUp, setOpenPasswordPopUp] = useState(false);
  const handleOpenPasswordPopUp = () => setOpenPasswordPopUp(true);

  <PopUpDialog 
    title='Vaihda salasana' 
    description='Syötä alle uusi salasanasi'
    buttonText='Vahvista'
    open={open}
  />

*/

import React from 'react';
import { Icon } from '@iconify/react';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';

function PopUpForm({ open, handleClose, handleSubmit, title, description, buttonText }) {

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('change-password__popup')) {
      handleClose();
    }
  };
  
  return(
    <form onSubmit={handleSubmit}>
      {open && (
        <div className='change-password__popup' onClick={handleOverlayClick}>
          <div className='change-password__popup-content'>
            <Icon icon='ph:x-bold' onClick={handleClose}/>
            <div className='change-password__popup-title'>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div className='change-password__popup-form'>
              <PasswordInput value='old-password' label='Vanha salasana *' />
              <PasswordInput value='new-password' label='Uusi salasana *' />
              <PasswordInput value='confirm-password' label='Vahvista salasana *' />
            </div>
            <Button
              className='change-password__popup-submit'
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
