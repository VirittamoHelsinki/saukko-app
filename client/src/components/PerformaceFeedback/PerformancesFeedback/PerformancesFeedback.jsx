import React, { useState, useRef, useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import img from '../../../assets/photo.png';
import Button from '../../Button/Button';
import AuthContext from '../../../store/context/AuthContext';

const PerformancesFeedback = ({ header }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState();
  const fileInputRef = useRef(null);

  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (event) => {
    // console.log("Selected Radio Value:", event.target.value);
    setSelectedRadio(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type and size
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size <= 2 * 1024 * 1024) {
          setSelectedFiles([...selectedFiles, file]);
        } else {
          alert('File size exceeds the limit (Max 2 MB)');
        }
      }
    }
  };

  // Defining the background color based on the user role

  const getBackgroundColor = () => {
    if (selectedRadio === 'top' || selectedRadio === 'end') {
      if (user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
  };

  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className='feedback'>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby='demo-form-control-label-placement'
            name='position'
            value={selectedRadio}
          >
            <FormControlLabel
              value='top'
              control={<Radio />}
              label='Osaa ohjatusti'
              labelPlacement='top'
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value='end'
              control={<Radio />}
              label='Osaa itsenäisesti'
              labelPlacement='top'
              onChange={handleRadioChange}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </main>
  );
};

export default PerformancesFeedback;
