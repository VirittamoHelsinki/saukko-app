import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchAllInternalWorkplaces } from '../../api/workplace';

const UnitAutocomplete = ({ setValue, value }) => {
  const [ fetchedUnits, setFetchedUnits ] = useState([]);
  const [ inputValue, setInputValue ] = useState('');

  // Fetch Units when the component mounts
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const workplaces = await fetchAllInternalWorkplaces();
        setFetchedUnits(workplaces);
        
        console.log("🚀 ~ UnitAutocomplete ~ workplaces:", workplaces);
        
        
      } catch (error) {
        console.error('Error fetching Units:', error);
      }
    };

    fetchUnits();
  }, []);

  // Handle selecting a unit from the dropdown
  const handleUnitChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Autocomplete
      disablePortal
      options={fetchedUnits}
      getOptionLabel={option => option.name}
      onChange={handleUnitChange} // Handle selecting a unit
      inputValue={inputValue}
      value={value}
      onInputChange={(_event, newInputValue) => {
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
