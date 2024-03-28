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
  setSelectedUnitId,
  setHasUnsavedChanges,
  assessment,
  setSelectedAssessmentId,
}) => {
  console.log('🚀 ~ assessment:', assessment._id);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [hasChanged, setHasChanged] = useState(false);
  const auth = useContext(AuthContext);
  const user = auth.user;
  const { evaluation } = useContext(InternalApiContext);

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

  const handleRadioChange = (e, unit, info, value) => {
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [info]: prevValues[info] === value ? '' : value,
    }));
    setHasChanged(true);
    if (unit._id) {
      setSelectedUnitId(unit._id); // This is the unit id
      setSelectedAssessmentId(assessment._id);
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
    if (e.target) {
      if (selectedRadio === e.target.value) {
        e.target.checked = false;
        setSelectedRadio('');
        setSelectedValues(0);
        setHasChanged(false);
        setHasUnsavedChanges(false);
      } else {
        setSelectedRadio(e.target.value);
        if (e.target.value === 'Osaa ohjatusti') {
          setSelectedValues(1);
        } else if (e.target.value === 'Osaa itsenäisesti') {
          setSelectedValues(2);
        }
      }
      console.log(e.target.value);
      console.log('selectedRadio',selectedRadio);
    }
  };

  // const getBackgroundColor = () => {
  //   if (
  //     selectedRadio === 'Osaa ohjatusti' ||
  //     selectedRadio === 'Osaa itsenäisesti'
  //   ) {
  //     if (user?.role === 'supervisor') {
  //       return '#F6E2E6';
  //     } else if (user?.role === 'customer') {
  //       return '#E2F5F3'; 
  //     }
  //   }
  //   return '#F2F2F2';
  // };

  const getBackgroundColor = () => {
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
    // check the answer and set the background color
    if(user?.role === 'supervisor' && assessment.answerSupervisor !== 0) {
      return '#F6E2E6';
    }else if(user?.role === 'customer' && assessment.answer !== 0) {
      return '#E2F5F3';
    }
    return '#F2F2F2';
  };

  const infodata = evaluation.units.flatMap((unit) => {
    return unit.assessments.flatMap((assessment) => [
      {
        info: user.role === 'customer' ? 'Itsearviointi' : 'TPO havainto',
        disabled: false,
        unitId: unit._id,
        assessmentId: assessment._id,
        answer: assessment.answer,
        answerSupervisor: assessment.answerSupervisor,
      },
    ]);
  });

  const infodataForSelectedAssessment = infodata.filter(
    (data) => data.assessmentId === assessment._id
  );


  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className='feedback'>
        {infodataForSelectedAssessment.map((item, index) => (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              //name='position'
              name={item.info}
              value={selectedRadio[item.info] || ''}
              unit={unit}
              //onClick={(event) => handleRadioChange(item.info, event, unit)}
            >
              <FormControlLabel
                value='Osaa ohjatusti'
                //value={user?.role ==='supervisor'? assessment.answerSupervisor : assessment.answer}
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)} 
                    onChange={(event) => handleRadioChange(event, unit)}
                    checked={
                      (selectedRadio === 'Osaa ohjatusti') ||
                      (user.role === 'supervisor' && item.answerSupervisor === 1) ||
                      (user.role === 'customer' && item.answer === 1)
                    }
                  />
                }
                label='Osaa ohjatusti'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Osaa itsenäisesti'
                //value={user?.role ==='supervisor'? assessment.answerSupervisor : assessment.answer}
                control={
                  <Radio
                    onClick={(event) => handleRadioUncheck(event)}
                    onChange={(event) => handleRadioChange(event, unit)}
                    checked={
                      (selectedRadio === 'Osaa itsenäisesti') ||
                      (user.role === 'supervisor' && item.answerSupervisor === 2) ||
                      (user.role === 'customer' && item.answer === 2)
                    }
                  />
                }
                label='Osaa itsenäisesti'
                labelPlacement='top'
              />
            </RadioGroup>
          </FormControl>
        ))}
      </div>
    </main>
  );
};

export default PerformancesFeedback;
