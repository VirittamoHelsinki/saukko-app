import { useEffect } from 'react';

import { useHeadingContext } from '../../../store/context/headingContectProvider';

const Notification = () => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  useEffect(() => {
    setHeading('Ilmoitukset');
    setSiteTitle('Ilmoitukset');
    setSubHeading('Ilmoitukset');
  }, [
    setHeading,
    setSiteTitle,
    setSubHeading,
  ]);

  return (
    <div className='notification__wrapper'>
      <p>Ilmoitukset :P</p>
    </div>
  );
};

export default Notification;
