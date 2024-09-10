import { useEffect } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { fetchUserById } from '../../api/user';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


function ClientPage() {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { id } = useParams()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserById(id),
  });

  useEffect(() => {
    setSiteTitle("Asiakas sivu")
    setSubHeading("")
    setHeading("Asiakas sivu")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);


  return (
    <div className='clientPage__wrapper' id='main-wrapper'>
      <section className='clientPage__container'>
        <p>{ JSON.stringify(user) }</p>

      </section>
    </div>
  );

}

export default ClientPage;
