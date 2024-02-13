import React, { useContext, useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';

const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
  radioItems,
  answer,
  answerSupervisor,
  answerTeacher
}) => {
  const [selectedRadio, setSelectedRadio] = useState({
    Itsearvionti: answer === 1 ? 'Osaa ohjatusti' : (answer === 2 ? 'Osaa itsenäisesti' : '')
  });
  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (e, unit, info, value) => {
    console.log('🚀 ~ handleRadioChange ~ unit:', unit);
    console.log('Clicked unit1', unit, 'info', info,'value', value);
    setSelectedUnitId(unit._id); // This is the unit id
    console.log('🚀 ~ handleRadioChange ~ unit._id:', unit._id);
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [info]: prevValues[info] === value ? '' : value,
    }));
    if (e.target) {
      if (selectedRadio === e.target.value) {
        e.target.checked = false;
        setSelectedRadio('');
        setSelectedValues(0);
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

  /* const [ answer, setAnswer ] = useState('');
  const [ answerSupervisor, setAnswerSupervisor ] = useState('');
  const [ answerTeacher, setAnswerTeacher ] = useState(''); */

  /* const userRole = auth.user;

  let selectedState;
  switch (userRole) {
    case 'customer': 
    selectedState = answer;
    break;

    case 'supervisor':
      selectedState = answerSupervisor;
      break;

    case 'teacher':
      selectedState = answerTeacher;
      break;

    default:
      selectedState = "";
  }
 */
  // Mock data
  /* const infodata = [
    {
      info: 'Itsearviointi',
      disabled: true,
      value: 0 || 1 || 2,
    },
    {
      info: 'TPO:n havainto',
      disabled: true,
      value: 0 || 1 || 2,
    },
    {
      info: 'Opettajan merkintä',
      disabled: false,
      value: 0 || 1 || 2,
    },
  ];
 */
  /* const radioItems = [
    {
      info: 'Itsearviointi',
      disabled: true,
      value: [0, 1, 2]
    },
    {
      info: 'TPO:n havainto',
      disabled: true,
      value: [0, 1, 2],
    },
    {
      info: 'Opettajan merkintä',
      disabled: false,
      value: [0, 1, 2],
    },
  ]
 */
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
        <p>answer: {answer}</p>
        <p>supervisor: {answerSupervisor}</p>
        <p>teacher: {answerTeacher}</p>
        {radioItems.map((item, index) => (
          <div key={index} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name={item.info}
                  //name="answer"
                  value={selectedRadio[item.info] || ''}
                  //value={selectedRadio[item.info] || 0}
                  //value={selectedState}
                  unit={unit}
                  id={item}
                  onClick={(e) => handleRadioChange(item.info, e, unit)}
                >
                  <FormControlLabel
                    type="radio"
                    name="Osaa ohjatusti"
                    id="Osaa ohjatusti"
                    value={1}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    onChange={(e)=>handleRadioChange(e, unit, item.info)}
                    // disabled={item.disabled}
                    control={
                      <Radio
                        disabled={item.info !== 'Opettajan merkintä'}
                        onChange={(e) => handleRadioChange(e, unit, item.info)}
                      />
                    }
                    checked={index < 2 || selectedRadio === 'Osaa ohjatusti'}
                  />
                  <FormControlLabel
                    type="radio"
                    name="Osaa itsenäisesti"
                    id="Osaa itsenäisesti"
                    value={2}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    control={
                      <Radio
                        disabled={item.info !== 'Opettajan merkintä'}
                        onChange={(e) => handleRadioChange(e, unit, item.info)}
                        checked={
                          item.info === 'Opettajan merkintä' &&
                          selectedRadio === 'Osaa itsenäisesti'
                        }
                      />
                    }
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
