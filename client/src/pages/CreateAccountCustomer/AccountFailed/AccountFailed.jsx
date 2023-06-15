// Importing react packages
import React from 'react';

// Importing components
import Notification from '../../../components/Notification/Notification';

const AccountFailed = () => {
  const header = '#9fc9eb';
  const body = '#fff';
  return (
    <div>
      <Notification
        headerColor={header}
        bodyColor={body}
        heading='Jotain meni vikaan'
        icon='zondicons:exclamation-solid'
        iconColor={'#a31621'}
        paragraph={'Rekisteröinti epäonnistui. Yritä myöhemmin uudelleen.'}
        navigatePage={'/choose-role'}
      />
    </div>
  );
};

export default AccountFailed;
