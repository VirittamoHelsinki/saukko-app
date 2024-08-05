/* Usage:

import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';

<PageNavigationButtons 
  handleBack={() => navigate('/example')} 
  handleForward={handlePopupOpen} 
  forwardButtonText={'Next page'} // Default value is "Seuraava"
/>

*/

import Button from '../../components/Button/Button';

function PageNavigationButtons(props) {
  return (
    <section className='page-nav' id='pageNavigationButtonsContainer'>
      {
        !props.hideBackButton && (
          <Button
            className="page-nav__button button--back"
            text='Takaisin'
            onClick={props.handleBack}
            icon={'formkit:arrowleft'}
          />
        )
      }

      {
        props.showForwardButton && (
          <Button
            className="page-nav__button button--forward"
            text={props.forwardButtonText || 'Seuraava'}
            onClick={props.handleForward}
            icon={props.icon || 'formkit:arrowright'}
            style={props.style}
            disabled={props.disabled}
          />
        )
      }
    </section>
  );
}

export default PageNavigationButtons;
