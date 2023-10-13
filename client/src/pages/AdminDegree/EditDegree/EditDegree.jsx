import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import { Icon } from '@iconify/react';

function EditDegree() {
  const navigate = useNavigate();
  const params = useParams();

  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { degreeName } = useStore();
  const { checkedUnits, setCheckedUnits } = useUnitsStore();
  
  const [editMode, setEditMode] = useState(false)
  const [editedUnits, setEditedUnits] = useState(checkedUnits);

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: 'Muokkaa tutkinnonosia',
      url: `/degrees/${params.degreeId}/units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/units/confirm-selection`
    },
  ];

  const handleInputChange = (unitId, e) => {
    e.preventDefault();
    const inputValue = e.target.value;
  
    // Check if the input value is empty
    if (inputValue.trim() === "") {
      // Filter the editedUnits array to remove the unit with the specified unitId
      setEditedUnits((prevEditedUnits) => prevEditedUnits.filter((unit) => unit._id !== unitId));
    } else {
      const editedUnit = { name: { fi: inputValue }, _id: unitId };
  
      setEditedUnits((prevEditedUnits) => {
        const index = prevEditedUnits.findIndex((unit) => unit._id === unitId);
        const newEditedUnits = [...prevEditedUnits];
  
        if (index === -1) {
          newEditedUnits.push(editedUnit);
        } else {
          newEditedUnits[index] = editedUnit;
        }
  
        return newEditedUnits;
      });
    }
  };

  const handleAddUnit = () => {
    // Generate a random _id for the new unit
    const randomId = Math.floor(1000000 + Math.random() * 9000000);
    
    // Create a new unit object with an empty name and the random _id
    const newUnit = { name: { fi: "" }, _id: randomId };

    // Add the new unit to the editedUnits array
    setEditedUnits((prevEditedUnits) => [...prevEditedUnits, newUnit]);
  };
  
  const handleSubmit = () => {
    setCheckedUnits(editedUnits);
    navigate(`/degrees/${params.degreeId}/units/tasks`)
  };
 

  return (
    <main className='editDegree__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
      <section className='editDegree__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          data={stepperData}
        />
        <h1>{degreeFound ? degree.name.fi : degreeName}</h1>

        <button 
          className={`edit-button ${editMode ? 'button-editable' : 'button-not-editable'}`} 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Lopeta muokkaus' : 'Muokkaa tietoja'}
          <Icon icon="lucide:pen" />
        </button>

        {/* Not editable units */}
        {!editMode && checkedUnits.length > 0 && (
          <div className='units-not-editable'>
            {editedUnits.map((unit, index) => (
              <p key={index}>{index+1}. {unit.name.fi}</p>
            ))}
          </div>
        )}

        {/* Editable units */}
        {editMode && (
          <div className='units-editable'>
            {checkedUnits.length > 0 ? 
              editedUnits.map(unit => (
                <input 
                  key={unit._id} 
                  defaultValue={unit.name.fi}
                  onChange={(e) => handleInputChange(unit._id, e)}
                />
              ))
              : <input />
            }
            <button className='add-unit-button' onClick={handleAddUnit}>+ Lisää tutkinnonosa</button>
          </div>
        )}

        <PageNavigationButtons
          handleBack={() => navigate(`/degrees/${params.degreeId}/units`)}
          handleForward={handleSubmit}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default EditDegree;
