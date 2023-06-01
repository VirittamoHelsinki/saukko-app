// // Importing react packages
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Importing components
// import { Icon } from '@iconify/react';
// import WavesHeader from '../Header/WavesHeader';

// const Notification = ({ navigatePage, heading, icon, paragraph }) => {
//   const navigate = useNavigate();

//   // Redirects after 3 seconds to the specified navigate page
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       navigate(navigatePage);
//     }, 3000);

//     return () => clearTimeout(timeout);
//   }, [navigate, navigatePage]);

//   return (
//     <main className='notification__wrapper'>
//       <WavesHeader title='Saukko' fill='#9fc9eb' disabled='true' />
//       <section className='notification__container'>
//         <h2>{heading}</h2>
//         {icon && <Icon icon={icon} className='notification__container--icon' />}
//         {paragraph && <p>{paragraph}</p>}
//       </section>
//     </main>
//   );
// };

// export default Notification;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import WavesHeader from '../Header/WavesHeader';

const Notification = ({ navigatePage, heading, icon, paragraph }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(navigatePage);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, navigatePage]);

  return (
    <main className='notification__wrapper'>
      <WavesHeader
        title='Saukko'
        fill='#9fc9eb'
        disabled='true'
        titleStyle={{ fontSize: '40px' }}
      />
      <section className='notification__container'>
        <h2>{heading}</h2>
        {icon && <Icon icon={icon} className='notification__container--icon' />}
        {paragraph && <p>{paragraph}</p>}
      </section>
    </main>
  );
};

export default Notification;
