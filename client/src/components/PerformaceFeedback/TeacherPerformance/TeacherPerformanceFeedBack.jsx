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
  const [selectedRadio, setSelectedRadio] = useState({});
  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (e, unit, info, value) => {
    console.log('🚀 ~ handleRadioChange ~ unit:', unit);
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
  const infodata = [
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
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;
