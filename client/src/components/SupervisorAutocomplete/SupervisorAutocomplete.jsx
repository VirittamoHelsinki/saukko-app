import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SupervisorAutocomplete = ({ workplace, setValue, value  }) => {
  const [inputValue, setInputValue] = useState('');

  console.log("🚀 ~ SupervisorAutocomplete ~ workplace:", workplace);
  console.log("🚀 ~ SupervisorAutocomplete ~ value:", value);
  
  // Handle selecting a supervisor from the dropdown
  const handleSupervisorChange = (_event, newValue) => {
    setValue(newValue)
  };

  console.log("🚀 ~ SupervisorAutocomplete - inputValue", inputValue);
  

  return (
    <Autocomplete
      disabled={workplace ? false : true}
      disablePortal
      options={workplace.supervisors}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      onChange={handleSupervisorChange} // Handle selecting a supervisor
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
          placeholder="Etsi tai kirjoita ohjaajan nimi" // Updated placeholder
          InputLabelProps={{
            shrink: false, // Prevent label from moving
          }}
        />
      )}
    />
  );
};

export default SupervisorAutocomplete;
