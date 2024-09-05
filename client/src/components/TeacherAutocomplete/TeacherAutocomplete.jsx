import { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchAllTeachers } from '../../api/user'; // Adjust import path as needed
import useEvaluationFormStore from '../../store/zustand/evaluationFormStore';

const TeacherAutocomplete = () => {
  const [fetchedTeachers, setFetchedTeachers] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { setSelectedTeacherId } = useEvaluationFormStore(); // Make sure the setter is available

  // Fetch teachers when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetchAllTeachers();
        console.log('response.data:', response.data.filter((user) => user.permissions === 'admin'))
        const adminTeachers = response.data.filter((user) => user.permissions === 'admin')
        setFetchedTeachers(adminTeachers); // Assuming response.data contains the array of teachers
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle selecting a teacher from the dropdown
  const handleTeacherChange = (event, newValue) => {
    // Find the teacher object from the fetchedTeachers array
    const selectedTeacher = fetchedTeachers.find(
      (teacher) => `${teacher.firstName} ${teacher.lastName}` === newValue
    );

    // If found, pass the teacher ID to the parent component
    if (selectedTeacher) {
      setSelectedTeacherId(selectedTeacher._id); // Assuming teacher object has an 'id' field
    }
  };

  return (
    <Autocomplete
      disablePortal
      options={fetchedTeachers.map(
        (teacher) => `${teacher.firstName} ${teacher.lastName}`
      )}
      onChange={handleTeacherChange} // Handle selecting a teacher
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
          placeholder="Etsi tai kirjoita opettajan nimi" // Updated placeholder
          InputLabelProps={{
            shrink: false, // Prevent label from moving
          }}
        />
      )}
    />
  );
};

export default TeacherAutocomplete;
