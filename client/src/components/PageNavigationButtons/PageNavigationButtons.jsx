/* Usage:

import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

<PageNavigationButtons 
  handleBack={() => navigate('/example')} 
  handleForward={handlePopupOpen} 
  forwardButtonText={'Next page'} // Default value is "Seuraava"
/>

*/

import React, { useState } from 'react';
import Button from '../../components/Button/Button';


function PageNavigationButtons(props) {
  
  const [editMode, setEditMode ] = useState(false);
  return (
    <section className='buttons__container' id="pageNavigationButtonsContainer">
      <div className='buttons__container-back'>
        <Button
          text='Takaisin'
          onClick={props.handleBack}
          icon={'formkit:arrowleft'}
        />
      </div>
      <div className='buttons__container-forward'>
        <Button
          text={props.forwardButtonText || 'Seuraava'}
          onClick={props.handleForward}
          icon={'formkit:arrowright'}
        />
      </div>
      {/* <div className='buttons__container-forward'>
        <Button
          text={props.forwardButtonText || 'Vahvista valinnat'}
          onClick={props.handleForward}
          icon={'formkit:arrowright'}
        />
      </div> */}
    </section>
  );
}

export default PageNavigationButtons;
