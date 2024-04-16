import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import WavesHeader from '../Header/WavesHeader';

const Notification = ({
  headerColor,
  bodyColor,
  heading,
  headingColor,
  icon,
  iconColor,
  paragraph,
  navigatePage,
}) => {
  const navigate = useNavigate();

  // Redirects after 5 seconds to logged user page
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(navigatePage);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate, navigatePage]);

  return (
    <main className='notification__wrapper'>
      <WavesHeader
        title='Saukko'
        fill={headerColor}
        header={headerColor}

        disabled='true'
      />
      <section
        className='notification__container'
        style={{ background: bodyColor }}
      >
        <h2 style={{ color: headingColor }}>{heading}</h2>
        {icon && (
          <Icon
            icon={icon}
            style={{ color: iconColor }}
            className='notification__container--icon'
          />
        )}
        {paragraph && <p>{paragraph}</p>}
      </section>
    </main>
  );
};

export default Notification;
