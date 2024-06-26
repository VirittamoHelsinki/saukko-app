import icone from '../../assets/Internallink.svg';
import { useAuthContext } from '../../store/context/authContextProvider';

const NotificationBadge = (props) => {
  const { currentUser } = useAuthContext();
  const role = currentUser?.role;
  // eslint-disable-next-line no-unused-vars
  const { number1, number2 } = props;
  let badgeStyle1 = {};
  let badgeStyle2 = {};

  if (role === 'teacher') {
    badgeStyle1 = {
      backgroundColor: '#FFC61E',
      width: '100%',
      height: '50%',
    };
    badgeStyle2 = {
      backgroundColor: '#FFE49C',
      width: '180px',
      height: '116px',
    };
  } else if (role === 'supervisor') {
    badgeStyle1 = {
      backgroundColor: '#f5a3c7',
      width: '100%',
      height: '50%',
    };
    badgeStyle2 = {
      backgroundColor: '#ffdbeb',
      width: '180px',
      height: '116px',
    };
  } else if (role === 'customer') {
    badgeStyle1 = {
      backgroundColor: '#9FC9EB',
      width: '100%',
      height: '50%',
    };
    // eslint-disable-next-line no-unused-vars
    badgeStyle2 = {
      backgroundColor: '#D0E6F7',
      width: '180px',
      height: '116px',
    };
  }

  return (
    <div className='notificationbadge-container'>
      <div className='badge' style={badgeStyle1}>
        {/* <span className='numberstyle'>{number1}</span> */}
        <div className='bottom-container'>
          <div>
            <span className='numberstyle'>{number1}</span>
            <span className='text'>uutta ilmoitusta</span>
          </div>
          <span className='icone-style'>
            <img src={icone} alt='' />
          </span>
        </div>
      </div>
      {/* <div className='badge' style={badgeStyle2}>
        <span className='numberstyle'>{number2}</span>
        <div className='bottom-container'>
          <span className='text'>Uutta viestiä</span>
          <span className='icone-style'><img src={icone} alt="" /></span>
        </div>
      </div> */}
    </div>
  );
};

export default NotificationBadge;
