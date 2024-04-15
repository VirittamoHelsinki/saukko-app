// Import react packages & dependencies
import React from 'react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import InfoList from '../../components/InfoList/InfoList';
import Hyperlink from '../../components/Hyperlink/Hyperlink';
import UserNav from '../../components/UserNav/UserNav';

const ContractInfo = () => {
  const data = [
    {
      title: 'Asiakkaan nimi',
      content: 'Alex Tenerio',
    },
    {
      title: 'Koulutus',
      content: 'Tieto- ja viestintätekniikan perustutkinto',
    },
    {
      title: 'Työpaikka',
      content: 'Lorem ipsum OY',
    },
    {
      title: 'Opettaja',
      content: 'Sanna Virtanen',
    },
    {
      title: 'Ohjaaja',
      content: 'Jonna Koskinen',
    },
  ];
  return (
    <main className='contractInfo__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle={'Alex Tenerio'}
        disabled={false}
      />
      <div className='contractInfo__container'>
        <section>
          <InfoList title='tiedot' data={data} />
        </section>
        <section className='contractInfo__container--description'>
          <h3>Tutkinnon suorittaneen osaaminen</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            adipisci delectus soluta velit ducimus qui nihil nam reprehenderit.
            Libero nam reprehenderit dolorem officia reiciendis aperiam,
            accusamus possimus doloribus? Voluptate, porro? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Nemo vel saepe odio
            recusandae tempore soluta voluptatibus iste excepturi laboriosam,
            commodi, fugit doloribus atque sed ipsum quaerat enim et quibusdam
            tenetur.
          </p>
          <Hyperlink
            linkText={'Lue lisää tästä linkistä'}
            linkSource={
              'https://eperusteet.opintopolku.fi/#/fi/ammatillinenperustutkinto/3397336/tiedot'
            }
          />
        </section>
      </div>
      <UserNav />
    </main>
  );
};

export default ContractInfo;
