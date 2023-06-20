// Import react packages & dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Button from '../../../components/Button/Button';
import { units } from '../DegreeUnits/unitsTempData';
import useUnitsStore from '../../../unitsStore';

function ConfirmSelection() {
  const navigate = useNavigate();

  // Temp data
  const degree = {
    name: "Autoalan perustutkinto"
  }

  // Get checked units from unitsStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);

  return (
    <main className='confirmSelection__wrapper'>
        <WavesHeader title='Saukko' secondTitle={degree.name} />
        <section className='confirmSelection__container'>
          <PageNumbers activePage={3}/>
          <h1 className='confirmSelection__container--title'>Vahvista pyyntö</h1>
          <p className='confirmSelection__container--desc'>{`Olet hakemassa ${degree.name} osien suoria näyttöjä`} </p>
          <h1 className='confirmSelection__container--secondtitle'>Valitsemasi tutkinnonosat</h1>
          <div className='confirmSelection__container--units'>
            {console.log(console.log('checked units confirm selection page: ', checkedUnits))}
            {checkedUnits.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={units}/>
            ))}
          </div>
        </section>
        <UserNav />
    </main>
  );
}

export default ConfirmSelection;
