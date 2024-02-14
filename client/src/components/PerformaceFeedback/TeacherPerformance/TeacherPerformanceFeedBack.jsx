import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';
import useEvaluationStore from '../../../store/zustand/evaluationStore';

const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
}) => {
  const [selectedRadio, setSelectedRadio] = useState({});

  const {evaluation} = useContext(InternalApiContext);
  
  const auth = useContext(AuthContext);
  const user = auth.user;

  if(user&&user.role !=='teacher'){
    return null;
  }
  
  const handleRadioChange = (e, unit, info) => {
    console.log('🚀 ~ handleRadioChange ~ unit:', unit);
    setSelectedUnitId(unit._id); // This is the unit id
    console.log('🚀 ~ handleRadioChange ~ unit._id:', unit._id);

    if(!unit || !unit._id){
      console.log('Unit or unit._id is undefined');
      return;
    }

    const value = e.target.value;
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [info]: prevValues[info] === value ? '' : value,
    }));
    if (value === 'Osaa ohjatusti') {
      setSelectedValues(1);
    } else if (value === 'Osaa itsenäisesti'){
      setSelectedValues(2);
    } else {
      setSelectedValues(0);
    }

    console.log('value', value);
    console.log('selectedRadio', selectedRadio);
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

  // Mock data
  /* const infodata = [
    {
      info: 'Itsearviointi',
      disabled: true,
    },
    {
      info: 'TPO:n havainto',
      disabled: true,
    },
    {
      info: 'Opettajan merkintä',
      disabled: false,
    },
  ];
 */

  const infodata = evaluation.units.flatMap((unit) => {
    return unit.assessments.flatMap((assessment) => [
      {
        info: 'Osaamistaito',
        disabled: true,
        units__id: unit._id,
        answer: assessment.answer,
      },
      {
        info: 'TPO:n havainto',
        disabled: true,
        units__id: unit._id,
        answerSupervisor: assessment.answerSupervisor,
      },
      {
        info: 'Opettajan merkintä',
        disabled: false,
        units__id: unit._id,
        answerTeacher: assessment.answerTeacher,
      }
    ]);
  });

  const buttonData = infodata.filter(
    (it) => it.units__id === unit._id
  );
 

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
      {/* <div>
        {infodata.map((item, index) => (
          <div key={index} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name={item.info}
                  // value={selectedRadio}
                  value={selectedRadio[item.info] || ''}
                  unit={unit}
                  onClick={(e) => handleRadioChange(item.info, e, unit)}
                >
                  <FormControlLabel
                    value='Osaa ohjatusti'
                    // control={<Radio />}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    onChange={handleRadioChange}
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
                    value='Osaa itsenäisesti'
                    // control={<Radio />}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    // onChange={handleRadioChange}
                    // disabled={item.disabled}
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
      </div> */}
      <div>
        {buttonData.map((item, index) => (
          <div key={index} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name='position'
                  //name={`position-${unit._id}`}
                  onChange={(e) => handleRadioChange(e, unit, item.info)}
                >
                  <FormControlLabel
                    value='Osaa ohjatusti'
                    control={
                      <Radio />
                    }
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    onChange={handleRadioChange}
                    disabled={item.disabled}
                    checked={
                      item.answer === 1 ||
                      item.answerSupervisor === 1 ||
                      item.answerTeacher === 1
                    }
                  />
                  <FormControlLabel
                    value='Osaa itsenäisesti'
                    control={
                      <Radio />
                    }
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    onChange={handleRadioChange}
                    disabled={item.disabled}
                    checked={
                      item.answer === 2 ||
                      item.answerSupervisor === 2 ||
                      item.answerTeacher === 2
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
