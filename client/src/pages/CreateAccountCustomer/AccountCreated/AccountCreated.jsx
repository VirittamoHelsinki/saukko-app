// Importing react packages
import React from 'react';

// Importing components
import Notification from '../../../components/Notification/Notification';

const AccountCreated = () => {
  const color = '#9fc9eb';
  return (
    <div>
      <Notification
        headerColor={color}
        bodyColor={color}
        heading='Tili on luotu!'
        icon='gg:check-o'
        navigatePage={'/logged-user'}
      />
    </div>
  );
};

export default AccountCreated;
