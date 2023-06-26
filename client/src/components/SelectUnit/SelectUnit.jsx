import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import useUnitsStore from '../../unitsStore';

function SelectUnit({ unit, allUnits }) {
  const navigate = useNavigate();
  
  // Check / uncheck unit using toggleUnit function from UnitsStore
  const toggleUnit = useUnitsStore((state) => state.toggleUnit);
  const handleCheckboxChange = () => {
    toggleUnit(unit);
  };

  // Get all checked units from store
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);
  console.log('Checked units:', checkedUnits);

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
      className={`selectUnit__container--units-unit ${
        checkedUnits.includes(unit) && 'checked'
      }`}
    >
      <div
        className={`selectUnit__container--units-unit-checkbox ${
          checkedUnits.includes(unit) && 'checked'
        }`}
        onClick={handleCheckboxChange}
      >
        {checkedUnits.includes(unit) && <Icon icon="mdi:tick" color="white" />}
      </div>
      <p>
        <b>{getUnitNumber(unit._id)}.</b> {unit.name.fi}
      </p>
      <Icon 
        icon="iconamoon:arrow-right-2-light" 
        className="selectUnit__container--units-unit-arrow" 
        onClick={() => navigate(`/unit-info/${unit._id}`)}
      />
    </div>
  )
}

export default SelectUnit;

