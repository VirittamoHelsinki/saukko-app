import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stepper from '../../../components/Stepper/Stepper';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import ExternalApiContext from '../../../store/context/ExternalApiContext';
import useStore from '../../../store/zustand/formStore';
import useUnitsStore from '../../../store/zustand/unitsStore';
import { Icon } from '@iconify/react';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

function EditUnits() {
  const navigate = useNavigate();
  const params = useParams();

  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { degreeName } = useStore();
  const { checkedUnits, setCheckedUnits } = useUnitsStore();
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();
  
  const [editMode, setEditMode] = useState(false)
  const [editedUnits, setEditedUnits] = useState(checkedUnits);

  // Labels and urls for stepper
  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${params.degreeId}`
    },
    {
      label: degree.units ? 'Valitse tutkinnonosat' : 'Lisää tutkinnonosat',
      url: degree.units ? `/degrees/${params.degreeId}/units` : `/degrees/${params.degreeId}/edit-units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${params.degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${params.degreeId}/summary`
    },
  ];

  // If no checkedUnits go straight into edit mode
  useEffect(() => {
    setSiteTitle("Suoritusten hallinnointi"), setSubHeading("Lisää uusi tutkinto"), setHeading("Tutkintojen hallinta")
    if (checkedUnits.length === 0) {
      setEditMode(true)
      handleAddUnit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (unitId, e) => {
    e.preventDefault();
    const inputValue = e.target.value;
  
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
    // Filter out units with an empty 'name.fi'
    const filteredUnits = editedUnits.filter(unit => unit.name.fi !== "");
    setCheckedUnits(filteredUnits);
    navigate(`/degrees/${params.degreeId}/units/tasks`)
  };
 

  return (
    <div className='editDegree__wrapper'>
      <section className='editDegree__container'>
        <Stepper
          activePage={2}
          totalPages={4}
          data={stepperData}
        />
        <h1>{degreeFound ? degree.name.fi : degreeName}</h1>

        <button 
          id='finishEditButton'
          className={`edit-button ${editMode ? 'button-editable' : 'button-not-editable'}`} 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Lopeta muokkaus' : 'Muokkaa tietoja'}
          <Icon icon="lucide:pen" />
        </button>

        {/* Non-edit mode */}
        {!editMode && editedUnits.length > 0 && (
          <div id='unitsNotEditable' className='units-not-editable'>
            {editedUnits.map((unit, index) => (
              <p key={index}>{index+1}. {unit.name.fi}</p>
            ))}
          </div>
        )}

        {/* Edit mode */}
        {editMode && (
          <div id='unitsEditable' className='units-editable'>
            {editedUnits.length > 0 &&
              editedUnits.map(unit => (
                <input 
                  key={unit._id} 
                  defaultValue={unit.name.fi}
                  onChange={(e) => handleInputChange(unit._id, e)}
                />
              ))
            }
            <button id='addUnitButton' className='add-unit-button' onClick={handleAddUnit}>+ Lisää tutkinnonosa</button>
          </div>
        )}

        <PageNavigationButtons
          handleBack={degree.units ? 
            () => navigate(`/degrees/${params.degreeId}/units`) : 
            () => navigate(`/degrees/${params.degreeId}`)
          }
          handleForward={handleSubmit}
          showForwardButton={true}

        />
      </section>
    </div>
  );
}

export default EditUnits;
