// Importing react packages
import React from 'react';

// Importing components
import Notification from '../../components/Notification/Notification';

const NotificationSupervisor = () => {
  const color = '#f5a3c7';

  return (
    <div>
      <Notification
        headerColor={color}
        bodyColor={color}
        heading='Lomake on lähetetty!'
        icon='gg:check-o'
        navigatePage={'/logged-user'}
      />
    </div>
  );
};

export default NotificationSupervisor;
