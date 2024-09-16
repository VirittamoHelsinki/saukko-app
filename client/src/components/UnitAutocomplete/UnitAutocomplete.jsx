import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchAllUnits } from '../../api/user';
import useEvaluationFormStore from '../../store/zustand/evaluationFormStore';

const UnitAutocomplete = () => {
  const [fetchedUnits, setFetchedUnits] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { setSelectedUnit } = useEvaluationFormStore(); // Make sure the setter is available

  // Fetch Units when the component mounts
  useEffect(() => {
    const fetchUnits = async () => {
      try {
  
        setFetchedUnits(adminUnits); // Assuming response.data contains the array of Units
      } catch (error) {
        console.error('Error fetching Units:', error);
      }
    };

    fetchUnits();
  }, []);

  // Handle selecting a unit from the dropdown
  const handleUnitChange = (event, newValue) => {
    // Find the unit object from the fetchedUnits array
    const selectedUnit = fetchedUnits.find(
      (unit) => `${unit.name.fi}` === newValue
    );

    // If found, pass the unit ID to the parent component
    if (selectedUnit) {
      setSelectedUnit(selectedUnit)
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={fetchedUnits.map(
        (unit) => `${unit.name.fi}`
      )}
      onChange={handleUnitChange} // Handle selecting a unit
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue); // Update input value on change
      }}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '0px',
          boxSizing: 'border-box',
          border: '2px solid black',
          backgroundColor: 'white',
          overflow: 'hidden',
        },
        '& .MuiInputBase-input': {
          padding: '0px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="" // Empty label to remove floating effect
          placeholder="Etsi tai kirjoita yksikön nimi" // Updated placeholder
          InputLabelProps={{
            shrink: false, // Prevent label from moving
          }}
        />
      )}
    />
  );
};

export default UnitAutocomplete;
