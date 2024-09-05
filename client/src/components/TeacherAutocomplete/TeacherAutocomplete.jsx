import { useState, useEffect } from 'react';
import { Autocomplete, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { fetchAllTeachers } from '../../api/user';

const TeacherAutocomplete = () => {
  const [fetchedTeachers, setFetchedTeachers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  // Fetch teachers when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetchAllTeachers();
        setFetchedTeachers(response.data); // Assuming response.data contains the array of teachers
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle selecting a teacher from the dropdown
  const handleTeacherChange = (event, newValue) => {
    if (newValue && !selectedTeachers.includes(newValue)) {
      setSelectedTeachers((prev) => [...prev, newValue]);
    }
  };

  // Remove a selected teacher from the list
  const handleRemoveTeacher = (teacher) => {
    setSelectedTeachers((prev) => prev.filter((t) => t !== teacher));
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={fetchedTeachers.map(
          (teacher) => `${teacher.firstName} ${teacher.lastName}`
        )} // Combine first and last names for display
        onChange={handleTeacherChange} // Handle selecting a teacher
        value={null} // Do not control the selected option (clear input after selection)
        inputValue={inputValue} // Control the input field value
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

      {/* Display selected teachers as a list */}
      <List>
        {selectedTeachers.map((teacher, index) => (
          <ListItem
            key={index}
            sx={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '0px',
              boxSizing: 'border-box',
              border: '2px solid black',
              backgroundColor: 'white',
              marginBottom: '8px',
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveTeacher(teacher)}>
                <Icon
                  icon='material-symbols:delete-outline'
                  color='#B01038'
                  height='18'
                  preserveAspectRatio='xMinYMid meet'
                />
              </IconButton>
            }
          >
            <ListItemText primary={teacher} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TeacherAutocomplete;
