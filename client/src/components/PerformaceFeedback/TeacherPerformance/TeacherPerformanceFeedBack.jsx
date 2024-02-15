import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';

const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
}) => {
  const [selectedRadio, setSelectedRadio] = useState({
    //Itsearvionti: answer === 1 ? 'Osaa ohjatusti' : (answer === 2 ? 'Osaa itsenäisesti' : '')
  });
  const auth = useContext(AuthContext);
  const user = auth.user;

  if(user.role !== 'teacher'){
    return null;
  }

  const getAssessmentValue=(assessment)=>{
    if(user.role === 'teacher'){
      return (assessment.answer && assessment.answer && assessment.answerTeacher);
    } else {
      return null;
    }
  };

  /* const updateSelectedValues = useCallback(
    (selectedValue)=>{
    if(selectedRadio['Osaamistaito'] === selectedValue){
      setSelectedValues(0);
    } else {
      setSelectedValues(selectedValue === 'Osaa ohjatusti' ? 1:2);
    }
  },[selectedRadio, setSelectedValues]);
 */
  const handleRadioChange = (e, unit, info, assessmentIndex) => {
    console.log('Clicked unit1', unit, 'info', info, 'unit._id', unit._id, 'assessmentIndex', assessmentIndex);

    if(!unit || !unit._id){
      console.error('Unit or unit._id is undefined');
      return;
    }

    const selectedValue = e.target.value;
    setSelectedUnitId(unit._id);

    setSelectedRadio((prevValues)=>({
      ...prevValues,
      [`${info}-${assessmentIndex}`]: prevValues[`${info}-${assessmentIndex}`] === selectedValue ? '':selectedValue,
    }));

    //updateSelectedValues(selectedValue);

    console.log('Clicked unit', unit, 'info:', info, 'value', selectedValue, 'unit._id', unit._id);
    console.log('Selected radio :', selectedRadio);
  };

  const getBackgroundColor = () => {
    if (
      selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (user?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return '#F2F2F2';
    };

  const radioItem = unit.assessments.map((assessment, index)=>{
    const roleSpecificInfo =
      user.role === 'customer' ? 'Osaamistaito'
        : user.role === 'supervisor'
        ? 'TPO havainto'
        : user.role === 'teacher'
        ? 'Opettajan merkintä'
        : ''
    return {
      info: roleSpecificInfo,
      disabled: true,
      units_id :unit._id,
      assessmentIndex: index,
      answer: getAssessmentValue(assessment),
    };
  });

  return (
    <main
      className='feedback__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div
        className='first-div-style'
        style={{ width: '60%', marginLeft: '38%' }}
      >
        <p style={{ padding: '2px' }}>Osaa ohjatusti</p>
        <p style={{ padding: '4px' }}>Osaa itsenäisesti</p>
      </div>
      <div>
        {/*<p>answer: {answer}</p>
        <p>supervisor: {answerSupervisor}</p>
        <p>teacher: {answerTeacher}</p>*/}
        {radioItem.map((item) => (
          <div key={item.assessmentIndex} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name={`${item.info}-${item.assessmentIndex}`}
                  value={selectedRadio[`${item.info}-${item.assessmentIndex}`] || ''}
                  unit={unit}
                  id={`radioGroup-${item.info}-${item.assessmentIndex}`}
                  onChange={(e) => handleRadioChange(e,unit,item.info, item.assessmentIndex)}
                >
                  <FormControlLabel
                    type="radio"
                    name={`${item.info}-${item.assessmentIndex}`}
                    id={`radio-${item.info}-${item.assessmentIndex}-1`}
                    value={1}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    control={<Radio />}
                    checked={item.answer === 1 || item.answerSupervisor === 1 || item.answerTeacher ===1 }
                    label="Osaa ohjatusti"
                   />
                  <FormControlLabel
                    type="radio"
                    name={`${item.info}-${item.assessmentIndex}`}
                    id={`radio-${item.info}-${item.assessmentIndex}-2`}
                    value={2}
                    //label={item.assessmentValue}
                    label='Osaa itsenäisesti'
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    control={<Radio />}
                    checked={item.answer === 2 || item.answerSupervisor === 2 || item.answerTeacher === 2}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;
