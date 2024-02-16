import React, { useState, useContext, useCallback, useEffect } from 'react';
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
  const [selectedRadio, setSelectedRadio] = useState('');

  const {evaluation} = useContext(InternalApiContext);

  const auth = useContext(AuthContext);
  const user = auth.user;

  if(!user){
    user.role = null;
  }

  useEffect(()=>{
    console.log('Updated selectedRadio: ', selectedRadio)

  },[selectedRadio])

  const getAssessmentValue = (assessment)=>{
    switch (user.role){
      case 'customer':
        return assessment.answer;
      case 'supervisor':
        return assessment.answerSupervisor;
      default:
        return null;
    }
  };

  const updateSelectedValues = ((selectedValue, info, assessmentIndex)=>{
      setSelectedValues(selectedValue === 'Osaa ohjatusti' ? 1:2, info);
  });
  //}, [selectedRadio, setSelectedValues]);

  const handleRadioChange = (e, unit,info, assessmentIndex) => {
    console.log('Clicked unit1', unit, 'unit._id', unit._id);

    if (!unit || !unit._id) {
      console.error('Unit or unit._id is undefined');
      return;
    }

    if(!evaluation){
      console.error('evaluation is undefined');
      return;
    }

    const evaluationId = evaluation._id || '';
    if(!evaluationId){
      console.error('Evaluation ID is undefined');
      return;
    }

    const selectedValue = e.target.value;
    setSelectedUnitId(unit._id);

    //const info = user.role === 'customer' ? 'Osaamistaito' : 'Tpo:n havainto';
  
    setSelectedRadio((prevValues)=>({
      ...prevValues,
      [`${info}-${assessmentIndex}`]: prevValues[`${info}-${assessmentIndex}`] === selectedValue ? '': selectedValue,
     //[`Osaamistaito-${unit._id}`]:prevValues[`Osaamistaito-${unit._id}`] === selectedValue ? '': selectedValue,
    }));
    updateSelectedValues(selectedValue, info, assessmentIndex);

    //console.log('Selected radio:', updatedValues);
    
    console.log('Clicked unit:', unit, 'Info:', info, 'selectedValue:',selectedValue, 'unit._id', unit._id);
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
    if (selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (user&&user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user&&user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
    };  
     /* const getBackgroundColor=(assessment)=>{
      const answer = assessment.answer || 0;
      const answerSupervisor = assessment.answerSupervisor ||0;

      if(answer === 1 || answer === 2 || answerSupervisor === 1 ||answerSupervisor === 2){
        if(user&& user.role === 'customer'){
          return '#E2F5F3';
        }else if (user&&user.role === 'supervisor'){
          return '#F6E2E6'
        }
      }
      return '#F2F2F2';
    };  */

    const radioItem = unit.assessments.map((assessment, index)=>{
    const assessmentInfo = user.role === 'customer' ? 'Osaamistaito': 'TPO:n havainto'
    return {
      info: assessmentInfo,
      disabled: true,
      units_id: unit._id,
      assessmentIndex: index,
      answer: getAssessmentValue(assessment),
      assessmentValue: 
        user.role === 'customer' ? assessment.answer : assessment.answerSupervisor,
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
      <div className='first-div-style'>
        {radioItem.map((item)=>(
          <div key={item.assessmentIndex}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-raw-controlled-form-label-placement'
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
                  //label={item.assessmentValue}
                  label='Osaa ohjatusti'
                  labelPlacement="top"
                  sx={{
                    '& .MuiSvgIcon-root': {
                    marginRight: '70px',
                    },
                  }}
                  control={<Radio />}
                  checked={selectedRadio === '1' || item.answer === 1 || item.answerSupervisor === 1}
                  onClick={()=>handleRadioChange({target: {value: '1'}}, unit, item.info, item.assessmentIndex)}
                  />
                <FormControlLabel
                  type="radio"
                  name={`${item.info}-${item.assessmentIndex}`}
                  id={`radio-${item.info}-${item.assessmentIndex}-2`}
                  value={2}
                  //label={item.assessmentValue}
                  label='Osaa itsenäisesti'
                  labelPlacement="top"
                  sx={{
                    '& .MuiSvgIcon-root': {
                    marginRight: '8%',
                    },
                  }}
                  control={<Radio />}
                  checked={ selectedRadio === '2' || item.answer === 2 || item.answerSupervisor === 2}
                  onClick={()=>handleRadioChange({target: {value: '2'}}, unit, item.info, item.assessmentIndex)}
                />
              </RadioGroup>
            </FormControl>
          </div>
        ))}
      </div>
    </main>
   );
};

export default PerformancesFeedback;