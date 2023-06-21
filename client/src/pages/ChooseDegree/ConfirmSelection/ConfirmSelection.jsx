// Import react packages & dependencies
import React, { useState } from 'react';
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

  // Pop-up logic
  const [isOpen, setIsOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsOpen(true);
  };

  const handlePopupClose = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    const popupContainer = document.querySelector('.popup__container');
    const clickedElement = event.target;
  
    if (popupContainer && !popupContainer.contains(clickedElement)) {
      handlePopupClose();
    }
  };

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
            {checkedUnits?.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={units}/>
            ))}
          </div>
          <div className="confirmSelection__container--buttons">
            <div className="confirmSelection__container--buttons-back">
              <Button
                text="Takaisin"
                icon={"formkit:arrowleft"}
                onClick={() => navigate('/degree-units')} // later fix to degree-units/:id
              />
            </div>
            <div className="confirmSelection__container--buttons-forward">
              <Button
                text="Valitse tutkinnonosat"
                icon={"formkit:arrowright"}
                onClick={handlePopupOpen}
              />
            </div>
          </div>
        </section>
        <UserNav />

      {/* Pop-up confirmation component */}
      <>
        {isOpen && (
          <div className="popup__wrapper" onClick={handleOutsideClick}>
            <div className="popup__container">
              <h2 className="popup__container--title">Haluan suorittaa {degree.name} -osien suoria näyttöjä</h2>
              <p className="popup__container--text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              </p>
              <div className="popup__container--buttons">
                <div className="popup__container--buttons-confirm">
                  <Button text="Vahvista"/>
                </div>
                <div className="popup__container--buttons-cancel" onClick={handlePopupClose}>
                  <Button text="Peruuta"/>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </main>
  );
}

export default ConfirmSelection;
