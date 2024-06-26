import { useEffect, useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const PerformancesFeedback = ({
  evaluation,
  assessment,
  unit,
  selectedRadio,
  handleRadioChange,
  currentUser

}) => {

  const valueMapping = {
    1: 'Osaa ohjatusti',
    2: 'Osaa itsenäisesti',
    'Osaa ohjatusti': 1,
    'Osaa itsenäisesti': 2,
  };

  const getBackgroundColor = () => {
    if (
      selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (currentUser?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (currentUser?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    // check the answer and set the background color
    if (currentUser?.role === 'supervisor' && assessment.answerSupervisor !== 0) {
      return '#F6E2E6';
    } else if (currentUser?.role === 'customer' && assessment.answer !== 0) {
      return '#E2F5F3';
    }
    return '#F2F2F2';
  };

  const infodata = useMemo(() => {
    return evaluation ? evaluation.units.flatMap((unit) => {
      return unit.assessments.flatMap((assessment) => [
        {
          info: currentUser.role === 'customer' ? 'Itsearviointi' : 'TPO havainto',
          disabled: false,
          unitId: unit._id,
          assessmentId: assessment._id,
          answer: assessment.answer,
          answerSupervisor: assessment.answerSupervisor,
        },
      ]);
    }) : [{
      info: currentUser.role === 'customer' ? 'Itsearviointi' : 'TPO havainto',
      disabled: false,
    }]
  }, [evaluation, currentUser.role])

  const infodataForSelectedAssessment = useMemo(() => {
    return infodata.filter(
      (data) => data.assessmentId === assessment._id
    )
  }, [infodata, assessment._id]);

  useEffect(() => {
    // Initialize selectedRadio state based on radioAnswers or with default empty values
    infodataForSelectedAssessment.reduce((acc, item) => {
      if (item.info === 'Itsearviointi') {
        acc[item.info] = item.answer || '';
        handleRadioChange([item.info], acc[item.info], assessment._id)
      }
      if (item.info === 'TPO havainto') {
        acc[item.info] = item.answerSupervisor || ''
        handleRadioChange([item.info], acc[item.info], assessment._id)
      }
      return acc;
    }, {});

  }, [assessment._id, handleRadioChange, infodataForSelectedAssessment]);

  return (
    <div
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className='feedback'>
        {infodataForSelectedAssessment.map((item, index) => (
          <FormControl key={index}>
            <RadioGroup
              row
              aria-labelledby='demo-form-control-label-placement'
              name={item.info}
              value={selectedRadio[item.info] || ''}
              unit={unit}
              onChange={(e) => handleRadioChange(item.info,
                valueMapping[e.target.value], assessment._id)}
            >
              <FormControlLabel
                value='Osaa ohjatusti'
                control={
                  <Radio />
                }
                checked={selectedRadio[item.info] === 1}
                label='Osaa ohjatusti'
                labelPlacement='top'
              />
              <FormControlLabel
                value='Osaa itsenäisesti'
                control={
                  <Radio />
                }
                checked={selectedRadio[item.info] === 2}
                label='Osaa itsenäisesti'
                labelPlacement='top'
              />
            </RadioGroup>
          </FormControl>
        ))}
      </div>
    </div>
  );
};

export default PerformancesFeedback;
