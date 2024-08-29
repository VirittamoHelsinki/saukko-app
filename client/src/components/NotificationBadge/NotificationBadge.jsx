import { useState, useEffect } from 'react';
import icone from '../../assets/Internallink.svg';
import { useAuthContext } from '../../store/context/authContextProvider';
import classNames from 'classnames';
import { fetchUnseenNotificationCount } from '../../api/notification';

import Link from "../NavButton/NavButton"

const NotificationBadge = (props) => {
  const { currentUser } = useAuthContext();
  const role = currentUser?.role;
  // eslint-disable-next-line no-unused-vars
  const { number1, number2 } = props;
  const [newNotificationsCount, setNewNotificationsCount] = useState(null)

  useEffect(async () => {
    const unseenNotifications = await fetchUnseenNotificationCount();
    setNewNotificationsCount(unseenNotifications)
  }, [])

  const badgeClasses = classNames(
    "badge", { [role]: true },
  )

  return (
    <div className='notificationbadge-container'>
      <Link to="/notifications" style={{ color: "black", textDecoration: "none" }}>
        <div className={badgeClasses}>
          <span className='numberstyle'>{number1}</span>
          <span className='text'>uutta ilmoitusta</span>
          <span className='icon'>
            <img src={icone} alt='' />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default NotificationBadge;
