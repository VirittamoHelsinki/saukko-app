import React, { useState, useContext, useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

const PerformancesFeedback = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
  }) => {
  //const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState({ 
    //Osaamistaito: prevAnswerValue === 1 ? 'Osaa ohjatusti' : 'Osaa itsenäisesti'
    //Itseaeviointi: prevAnswerValue === 1 ? 'Osaa ohajatusti' : (prevAnswerValue === 2 ? 'Osaa itsenäisesti' : '')
  });

  const {evaluation} = useContext(InternalApiContext);

  const auth = useContext(AuthContext);
  const user = auth.user;

  if(!user){
    user.role = null;
  }

  const getAssessmentValue = (assessment)=>{
    switch (user.role){
      case 'customer':
        return assessment.answer;
      case 'supervisor':
        return assessment.answerSupervisor;
      default:
        return null;
    }
  }

  const updateSelectedValues = useCallback((selectedValue)=>{
    if(selectedRadio['Osaamistaito'] === selectedValue){
      setSelectedValues(0);
    } else {
      setSelectedValues(selectedValue === 'Osaa ohjatusti' ? 1: 2);
    }
  }, [selectedRadio, setSelectedValues]);


  const handleRadioChange = (e, unit, info, assessmentIndex) => {
    console.log('Clicked unit1', unit, 'info', info, 'unit._id', unit._id);

    if (!unit || !unit._id) {
      console.error('Unit or unit._id is undefined');
      return;
    }

    const selectedValue = e.target.value;
    setSelectedUnitId(unit._id);
  
    setSelectedRadio((prevValues)=>({
      ...prevValues,
      [`${info}-${assessmentIndex}`]: prevValues[`${info}-${assessmentIndex}`] === selectedValue ? '': selectedValue,
    }));
    updateSelectedValues(selectedValue);

    console.log('Clicked unit:', unit, 'Info:', info, 'Value:',selectedValue, 'unit._id', unit._id);
    console.log('Selected radio :',selectedRadio);
    };

  /* const handleFileChange = (event) => {
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
  }; */

  const getBackgroundColor = () => {
    if (
      selectedRadio['Osaamistaito'] === 'Osaa ohjatusti' ||
      selectedRadio['Osaamistaito'] === 'Osaa itsenäisesti'
    ) {
      if (user&&user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user&&user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
    };


  const radioItem = unit.assessments.map((assessment, index)=>{
    return {
        info: user.role === 'customer' ? 'Osaamistaito': 'TPO:n havainto',
        disabled: true,
        units_id: unit._id,
        assessmentIndex: index,
        answer: getAssessmentValue(assessment),
      };
      /* {
        info: 'TOPO:n havainto',
        disabled: true,
        units_id: unit._id,
        answer: assessment.answerSupervisor,
      },
      {
        info: 'Opettajan merkintä',
        disabled: true,
        units_id: unit._id,
        answer: assessment.answerTeacher,
      } */
  });

  //const answerToShow = user&&user.role === 'supervisor' ? prevAnswerSupervisorValue : prevAnswerValue;
  /* const radioItemData = radioItem.filter(
    (dataItem)=>dataItem.units_id === unit._id
  ); */

  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {radioItem.map((item)=>(
        <div key={item.assessmentIndex} className='first-div-style'>
          <p  style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-form-control-label-placement'
                name={`${item.info}-${item.assessmentIndex}`}
                value={selectedRadio[`${item.info}-${item.assessmentIndex}`] || ''}
                unit={unit}
                onChange={(e)=>handleRadioChange(e, unit, item.info, item.assessmentIndex)}
                id={`radioGroup-${item.info}-${item.assessmentIndex}`}
              >
                <FormControlLabel
                  type="radio"
                  name={`${item.info}-${item.assessmentIndex}`}
                  id={`radio-${item.info}-${item.assessmentIndex}-1`}
                  value={1}
                  label={item.assessmentValue}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      marginRight: '70px',
                    },
                  }}
                  control={<Radio />}
                  checked={item.answer === 1 || item.answerSupervisor === 1}
                 />
                <FormControlLabel
                  type="radio"
                  name={`${item.info}-${item.assessmentIndex}`}
                  id={`radio-${item.info}-${item.assessmentIndex}-2`}
                  value={2}
                  label={item.assessmentValue}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      marginRight: '8%',
                    },
                  }}
                  control={<Radio />}
                  checked={item.answer === 2 || item.answerSupervisor === 2}
                 />
              </RadioGroup>
            </FormControl>
        </div>
      ))}
    </main>
   );
};

export default PerformancesFeedback;