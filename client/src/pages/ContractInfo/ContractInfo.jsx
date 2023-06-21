// Import ract packages & dependencies
import React from 'react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import InfoList from '../../components/InfoList/InfoList';

const ContractInfo = () => {
  const data = [
    // {
    //   title: 'Asiakkaan nimi',
    //   content: 'Alex Tenerio',
    // },
    // {
    //   title: 'Koulutus',
    //   content: 'Tieto- ja viestintätekniikan perustutkinto',
    // },
    // {
    //   title: 'Työpaikka',
    //   content: 'Lorem ipsum OY',
    // },
    // {
    //   title: 'Opettaja',
    //   content: 'Sanna Virtanen',
    // },
    // {
    //   title: 'Ohjaaja',
    //   content: 'Jonna Koskinen',
    // },
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
      </div>
    </main>
  );
};

export default ContractInfo;
