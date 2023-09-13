// Import react packages & dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Zustand store
import useUnitsStore from '../../../store/unitsStore';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import Button from '../../../components/Button/Button';

import DegreeContext from '../../../utils/context/DegreeContext';
import ContentEditable from 'react-contenteditable';

function ConfirmSelection() {
  const navigate = useNavigate();

  // Set path & get degree units from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  // Get checked units from unitsStore
  const { checkedUnits, setUnitAtIndex } = useUnitsStore();

  // Text for stepper's labels
  const labelStepper = [
    'Tutkintotiedot',
    'Valitse tutkinnonosat',
    'Määritä tehtävät',
    'Yhteenveto',
  ];

  // Toggle text editable mode
  const handleEditToggle = () => {
    setIsEditable((prevState) => !prevState);
  };

  // Handle text changes
  const handleUnitChange = (index, event) => {
    const updatedValue = event.target.value;

    setUnitAtIndex(index, {
      ...checkedUnits[index],
      name: { fi: updatedValue },
    });
  };

  // Edit button styling
  const buttonStyleSave = {
      background: '#0000bf',
      color: '#fff',
      border: 'red',
      padding: '1rem',
      marginTop: '20px',
      width: '90%',
    },
    buttonStyleEdit = {
      background: '#fff',
      color: '#0000bf',
      border: 'solid 2px #0000bf',
      padding: '0 1rem',
      marginTop: '20px',
      width: '90%',
    };

  return (
    <main className='confirmSelection__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='confirmSelection__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          label={labelStepper}
          url={`/degrees/${degree._id}`}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={handleEditToggle}
            type='submit'
            style={isEditable ? buttonStyleSave : buttonStyleEdit}
            text={isEditable ? 'Lopeta muokkaus' : 'Muokkaa tietoja'}
            icon={'mingcute:pencil-line'}
          />
        </div>
        <div className='confirmSelection__container--units'>
          {checkedUnits?.map((unit, index) => {
            console.log('unit.name.fi:', unit?.name?.fi);

            return (
              <div key={index}>
                <ContentEditable
                  html={unit?.name?.fi ?? ''}
                  onChange={(event) => handleUnitChange(index, event)}
                  tagName='p'
                  disabled={!isEditable}
                  className={
                    isEditable
                      ? 'confirmSelection__container--border-input '
                      : 'confirmSelection__container--selected-units '
                  }
                />
              </div>
            );
          })}
        </div>
        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${degree._id}/units`)}
          handleForward={() => navigate(`/degrees/${degree._id}/units/tasks`)}
          forwardButtonText={'Vahvista valinnat'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default ConfirmSelection;
