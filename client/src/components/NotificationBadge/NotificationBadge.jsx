import { useState, useEffect } from 'react';
import icone from '../../assets/Internallink.svg';
import { useAuthContext } from '../../store/context/authContextProvider';
import classNames from 'classnames';
import { fetchUnseenNotificationCount } from '../../api/notification';

import Link from "../NavButton/NavButton"

const NotificationBadge = () => {
  const { currentUser } = useAuthContext();
  const role = currentUser?.role;
  const [newNotificationsCount, setNewNotificationsCount] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          const unseenNotifications = await fetchUnseenNotificationCount(currentUser.id);
          setNewNotificationsCount(unseenNotifications);
        } catch (error) {
          console.error('Error fetching unseen notifications:', error);
        }
      }
    };

    fetchNotifications();
  }, [currentUser])

  const badgeClasses = classNames(
    "badge", { [role]: true },
  )

  return (
    <div className='notificationbadge-container'>
      <Link to="/notifications" style={{ color: "black", textDecoration: "none" }}>
        <div className={badgeClasses}>
          <span className='numberstyle'>{newNotificationsCount}</span>
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
