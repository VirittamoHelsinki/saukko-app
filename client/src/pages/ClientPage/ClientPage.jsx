import { useEffect } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';


function ClientList() {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();


  useEffect(() => {
    setSiteTitle("Asiakas sivu")
    setSubHeading("")
    setHeading("Asiakas sivu")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);


  return (
    <div className='clientList__wrapper' id='main-wrapper'>
      <section className='clientList__container'>
        <p>actual client page</p>

      </section>
    </div>
  );

}

export default ClientList;
