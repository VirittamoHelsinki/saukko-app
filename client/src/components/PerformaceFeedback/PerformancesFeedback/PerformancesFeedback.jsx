
import React, { useState, useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';
 
const PerformancesFeedback = ({
  setSelectedValues,
  unit,
  //unitId,
  setSelectedUnitId,
  setHasUnsavedChanges
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const auth = useContext(AuthContext);
  const user = auth.user;
  const { evaluation } = useContext(InternalApiContext);

  


  const data = evaluation.units.flatMap((unit)=>{
    return unit.assessments.flatMap((assessment)=>[
      {
        answer: assessment.answer,
        unitId: unit._id, 
      },
      {
        answerSupervisor: assessment.answerSupervisor,
        unitId:unit._id,
      },
    ]);
  });

    // Uncheck the radio button
    const handleRadioUncheck = (event) => {
      if (selectedRadio === event.target.value) {
        setSelectedRadio('');
        setSelectedValues(0);
        setSelectedUnitId(null);
        setHasChanged(false);
        setHasUnsavedChanges(false);
      }
    };

  const handleRadioChange = (event, unit) => {
    console.log('event1: ', event.target.value);
    setSelectedRadio(event.target.value);
    setSelectedUnitId(unit._id); // This is the unit id
    setHasChanged(true);
    setHasUnsavedChanges(true);
    if (event.target.value === 'Osaa ohjatusti') {
      setSelectedValues(1);
    } else if (event.target.value === 'Osaa itsenäisesti') {
      setSelectedValues(2);
    }
    console.log('event2: ', event.target.value);
    console.log('selected radio1 :', selectedRadio);
  };
 
  /* const handleRadioChange = (event, unit) => {
    //setSelectedRadio(event.target.value);
    const selectedValue = event.target.value;
    setSelectedRadio(selectedValue, ()=>{

      setSelectedUnitId(unit._id); // This is the unit id
      
      if (event.target.value === 'Osaa ohjatusti') {
        setSelectedValues(1);
      } else if (event.target.value === 'Osaa itsenäisesti') {
        setSelectedValues(2);
      }
    })
  }; */
 
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
    console.log('Component rendered.');
    console.log('selectedRadio2 :', selectedRadio);
    console.log('user', user.role);
    if (
      selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
  };
  /* const getBackgroundColor = () => {
    if (
      selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
  }; */
  
  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className='feedback' style={{ backgroundColor: getBackgroundColor() }}>
        {user?.role === 'customer' ? (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name='position'
              value={selectedRadio}
              //unit={unit}
              //unitId={unit._id}
              // onClick={(event)=>handleRadioChange(event, unit)}
            >
              <p>unit id : {unit._id}</p>
              <FormControlLabel
                value='Osaa ohjatusti'
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)}
                    onChange={(event) => handleRadioChange(event, unit)}
                  />
                }
                checked={
                  selectedRadio === 'Osaa ohjatusti' ||
                  data.some(
                    (item) => item.answer === 1 && item.unitId === unit._id
                  )
                }
                label='Osaa ohjatusti'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Osaa itsenäisesti'
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)}
                    onChange={(event) => handleRadioChange(event, unit)}
                  />
                }
                checked={
                  selectedRadio === 'Osaa itsenäisesti' ||
                  data.some(
                    (item) => item.answer === 2 && item.unitId === unit._id
                  )
                }
                label='Osaa itsenäisesti'
                labelPlacement='top'
              />
            </RadioGroup>
          </FormControl>
        ) : (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name='position'
              value={selectedRadio}
              //unit={unit}
              //unitId={unit._id}
            >
              <FormControlLabel
                value='Osaa ohjatusti'
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)}
                    onChange={(event) => handleRadioChange(event, unit)}
                  />
                }
                checked={
                  selectedRadio === 'Osaa ohjatusti' ||
                  data.some(
                    (item) =>
                      item.answerSupervisor === 1 && item.unitId === unit._id
                  )
                }
                label='Osaa ohjatusti'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Osaa itsenäisesti'
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)}
                    onChange={(event) => handleRadioChange(event, unit)}
                  />
                }
                checked={
                  selectedRadio === 'Osaa itsenäisesti' ||
                  data.some(
                    (item) =>
                      item.answerSupervisor === 2 && item.unitId === unit._id
                  )
                }
                label='Osaa itsenäisesti'
                labelPlacement='top'
              />
            </RadioGroup>
          </FormControl>
        )}
      </div>
    </main>
  );
};
 
export default PerformancesFeedback;
 