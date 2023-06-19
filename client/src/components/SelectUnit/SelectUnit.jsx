import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

function SelectUnit({ unit, allUnits }) {
  const navigate = useNavigate();

  // Checkbox logic
  const [checkedUnits, setCheckedUnits] = useState([]);

  const handleCheckboxChange = (unitId) => {
    if (checkedUnits.includes(unitId)) {
      setCheckedUnits(checkedUnits.filter((id) => id !== unitId));
    } else {
      setCheckedUnits([...checkedUnits, unitId]);
    }
  };

  // Number units
  const getUnitNumber = (id) => {
    const foundUnit = allUnits.find(unit => unit._id === id);
    if (foundUnit) {
      return allUnits.indexOf(foundUnit) + 1;
    }
  };
  
  return (
    <div
      key={unit._id}
      className={`degreeUnits__container--units-unit ${
        checkedUnits.includes(unit._id) && 'checked'
      }`}
    >
      <div
        className={`degreeUnits__container--units-unit-checkbox ${
          checkedUnits.includes(unit._id) && 'checked'
        }`}
        onClick={() => handleCheckboxChange(unit._id)}
      >
        {checkedUnits.includes(unit._id) && <Icon icon="mdi:tick" color="white" />}
        {console.log(checkedUnits)}
      </div>
      <p key={unit._id}>
        <b>{getUnitNumber(unit._id)}.</b> {unit.name.fi}
      </p>
      <Icon 
        icon="iconamoon:arrow-right-2-light" 
        className="degreeUnits__container--units-unit-arrow" 
        onClick={() => navigate('/unit-info')} // later navigate to unit-info/:id
      />
    </div>
  )
}

export default SelectUnit;

