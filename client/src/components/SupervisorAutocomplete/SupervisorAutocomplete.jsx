import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchAllSupervisors } from '../../api/user';
import useEvaluationFormStore from '../../store/zustand/evaluationFormStore';

const SupervisorAutocomplete = () => {
  const [fetchedSupervisors, setFetchedSupervisors] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { setSelectedSupervisor } = useEvaluationFormStore(); // Make sure the setter is available

  // Fetch Supervisors when the component mounts
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const fetchedSupervisors = await fetchAllSupervisors();

        setFetchedSupervisors(fetchedSupervisors);
      } catch (error) {
        console.error('Error fetching Supervisors:', error);
      }
    };

    fetchSupervisors();
  }, []);

  // Handle selecting a supervisor from the dropdown
  const handleSupervisorChange = (event, newValue) => {
    // Find the supervisor object from the fetchedSupervisors array
    const selectedSupervisor = fetchedSupervisors.find(
      (supervisor) => `${supervisor.firstName} ${supervisor.lastName}` === newValue
    );

    // If found, pass the supervisor ID to the parent component
    if (selectedSupervisor) {
      setSelectedSupervisor(selectedSupervisor)
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={fetchedSupervisors.map(
        (supervisor) => `${supervisor.firstName} ${supervisor.lastName}`
      )}
      onChange={handleSupervisorChange} // Handle selecting a supervisor
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
