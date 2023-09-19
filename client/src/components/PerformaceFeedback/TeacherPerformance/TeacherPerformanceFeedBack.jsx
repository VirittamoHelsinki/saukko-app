import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import { Icon } from '@iconify/react';


const TeacherPerformanceFeedBack = ({ columnTitle }) => {
  const [selectedRadio, setSelectedRadio] = useState();
  const auth = useContext(AuthContext);
  const user = auth.user;

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.value);
  };

  const getBackgroundColor = () => {
    if (selectedRadio === 'top' || selectedRadio === 'start') {
      if (user?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return '#F2F2F2';
  };



  const infodata = [
    {
      info: 'Osaamistaso',
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
    <main className='feedback__wrapper' style={{ backgroundColor: getBackgroundColor() }}>
      <div className='first-div-style' style={{ width: '60%', marginLeft: '38%' }}>
        <p style={{ padding: '4px' }}>Osaa itsenäisesti</p>
        <p style={{ padding: '2px' }}>Osaa ohjatusti</p>
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
                  name='position'
                >
                  <FormControlLabel
                    value='top'
                    control={<Radio />}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    onChange={handleRadioChange}
                    disabled={item.disabled}
                    checked={item.disabled || selectedRadio === 'top'}


                  />
                  <FormControlLabel
                    value='start'
                    control={<Radio />}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    onChange={handleRadioChange}
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




