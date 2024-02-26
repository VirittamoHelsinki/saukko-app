import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';
 
const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
  setHasUnsavedChanges,
}) => {
  const [selectedRadio, setSelectedRadio] = useState({});
  const [hasChanged, setHasChanged] = useState(false);
 
  const auth = useContext(AuthContext);
  const user = auth.user;
 
  //Fetch evaluation and units from store
  const { evaluation } = useContext(InternalApiContext);
 

  const handleRadioChange = (e, unit, info, value) => {
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [info]: prevValues[info] === value ? '' : value,
    }));
    setHasChanged(true);
    if (unit._id) {
      setSelectedUnitId(unit._id); // This is the unit id
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
 
  // Mock data
  // const infodata = [
  //   {
  //     info: 'Itsearviointi',
  //     disabled: true,
  //   },
  //   {
  //     info: 'TPO:n havainto',
  //     disabled: true,
  //   },
  //   {
  //     info: 'Opettajan merkintä',
  //     disabled: false,
  //   },
  // ];
 
  // Real data from db
  const infodata = evaluation.units.flatMap((unit) => {
    return unit.assessments.flatMap((assessment) => [
      {
        info: 'Itsearviointi',
        disabled: true,
        units__id: unit._id, // Assuming unit._id should be used instead of chosenUnitId
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
      },
    ]);
  });
 
  const infodataForSelectedUnit = infodata.filter(
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
      <div>
        {infodataForSelectedUnit.map((item, index) => (
          <div key={index} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name={item.info}
                  value={selectedRadio[item.info] || ''}
                  unit={unit}
                  onClick={(e) => handleRadioChange(item.info, e, unit)}
                >
                  <FormControlLabel
                    value='Osaa ohjatusti'
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    control={
                      <Radio
                        disabled={item.info !== 'Opettajan merkintä'}
                        onChange={(e) => handleRadioChange(e, unit, item.info)}
                        checked={
                          (item.info === 'Opettajan merkintä' &&
                            selectedRadio === 'Osaa ohjatusti') ||
                          item.answer === 1 ||
                          item.answerSupervisor === 1 ||
                          item.answerTeacher === 1
                        }
                      />
                    }
                  />
                  <FormControlLabel
                    value='Osaa itsenäisesti'
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
                          (item.info === 'Opettajan merkintä' &&
                            selectedRadio === 'Osaa itsenäisesti') ||
                          item.answer === 2 ||
                          item.answerSupervisor === 2 ||
                          item.answerTeacher === 2
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
